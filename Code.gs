/****************************************************
 * ADUAN MASYARAKAT - DESA SEPADU
 * Terhubung ke Google Sheets
 ****************************************************/

const NAMA_SHEET = "aduan";
const PASSWORD_ADMIN = "Sepadu2026!";

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  const sheet = dapatkanSheet();
  const kolom = siapkanKolom(sheet);

  if (p.action === "check") {
    const token = String(p.token || "").trim().toUpperCase();
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][kolom.token - 1] || "").trim().toUpperCase() === token) {
        return json({
          found: true,
          token: values[i][kolom.token - 1],
          nama: values[i][kolom.nama - 1],
          kategori: values[i][kolom.kategori - 1],
          judul: values[i][kolom.judul - 1],
          isi_aduan: values[i][kolom.isi_aduan - 1],
          status: values[i][kolom.status - 1] || "Belum dijawab",
          jawaban: values[i][kolom.jawaban - 1] || ""
        });
      }
    }
    return json({ found: false });
  }

  if (p.action === "list") {
    if (String(p.password || "") !== PASSWORD_ADMIN) return json({ ok:false, error:"Unauthorized" });
    return json(ambilSemuaAduan(sheet, kolom));
  }

  return json({ ok:true, service:"Desa Sepadu Aduan" });
}

function doPost(e) {
  try {
    const p = e && e.parameter ? e.parameter : {};

    if (p.action === "submit") return kirimAduan(p);

    if (p.action === "answer") {
      if (String(p.password || "") !== PASSWORD_ADMIN) return json({ ok:false, error:"Unauthorized" });
      return jawabAduan(p.token, p.jawaban);
    }

    return json({ ok:false, error:"Action tidak dikenal" });
  } catch (err) {
    return json({ ok:false, error:String(err.message || err) });
  }
}

function kirimAduan(p) {
  const sheet = dapatkanSheet();
  const kolom = siapkanKolom(sheet);
  const token = String(p.token || buatToken()).trim().toUpperCase();
  const row = new Array(sheet.getLastColumn()).fill("");

  row[kolom.tanggal - 1] = new Date();
  row[kolom.token - 1] = token;
  row[kolom.nama - 1] = p.nama || "";
  row[kolom.kontak - 1] = p.kontak || "";
  row[kolom.kategori - 1] = p.kategori || "";
  row[kolom.judul - 1] = p.judul || "";
  row[kolom.isi_aduan - 1] = p.isi_aduan || "";
  row[kolom.status - 1] = "Belum dijawab";
  row[kolom.jawaban - 1] = "";
  row[kolom.waktu_jawaban - 1] = "";

  sheet.appendRow(row);
  return json({ ok:true, token });
}

function jawabAduan(token, jawaban) {
  token = String(token || "").trim().toUpperCase();
  jawaban = String(jawaban || "").trim();
  if (!token || !jawaban) return json({ ok:false, error:"Token dan jawaban wajib diisi" });

  const sheet = dapatkanSheet();
  const kolom = siapkanKolom(sheet);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][kolom.token - 1] || "").trim().toUpperCase() === token) {
      sheet.getRange(i + 1, kolom.status).setValue("Sudah dijawab");
      sheet.getRange(i + 1, kolom.jawaban).setValue(jawaban);
      sheet.getRange(i + 1, kolom.waktu_jawaban).setValue(new Date());
      return json({ ok:true });
    }
  }
  return json({ ok:false, error:"Token tidak ditemukan" });
}

function ambilSemuaAduan(sheet, kolom) {
  const values = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < values.length; i++) {
    if (!values[i][kolom.token - 1]) continue;
    result.push({
      waktu: formatTanggal(values[i][kolom.tanggal - 1]),
      token: values[i][kolom.token - 1],
      nama: values[i][kolom.nama - 1],
      kontak: values[i][kolom.kontak - 1],
      kategori: values[i][kolom.kategori - 1],
      judul: values[i][kolom.judul - 1],
      isi_aduan: values[i][kolom.isi_aduan - 1],
      status: values[i][kolom.status - 1] || "Belum dijawab",
      jawaban: values[i][kolom.jawaban - 1] || "",
      waktu_jawaban: formatTanggal(values[i][kolom.waktu_jawaban - 1])
    });
  }
  return result.reverse();
}

function dapatkanSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NAMA_SHEET);
  if (!sheet) sheet = ss.insertSheet(NAMA_SHEET);
  return sheet;
}

function siapkanKolom(sheet) {
  const wajib = ["tanggal","token","nama","kontak","kategori","judul","isi_aduan","status","jawaban","waktu_jawaban"];
  let lastCol = Math.max(sheet.getLastColumn(), 1);
  let header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  if (header.length === 1 && !String(header[0]).trim()) {
    header = [];
  }

  let normal = header.map(h => String(h).trim().toLowerCase().replace(/\s+/g, "_"));

  wajib.forEach(nama => {
    if (normal.indexOf(nama) === -1) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(nama);
      normal.push(nama);
    }
  });

  return {
    tanggal: normal.indexOf("tanggal") + 1,
    token: normal.indexOf("token") + 1,
    nama: normal.indexOf("nama") + 1,
    kontak: normal.indexOf("kontak") + 1,
    kategori: normal.indexOf("kategori") + 1,
    judul: normal.indexOf("judul") + 1,
    isi_aduan: normal.indexOf("isi_aduan") + 1,
    status: normal.indexOf("status") + 1,
    jawaban: normal.indexOf("jawaban") + 1,
    waktu_jawaban: normal.indexOf("waktu_jawaban") + 1
  };
}

function buatToken() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "DSP-";
  for (let i = 0; i < 8; i++) token += chars.charAt(Math.floor(Math.random() * chars.length));
  return token;
}

function formatTanggal(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  }
  return String(value);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
