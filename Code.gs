const ADMIN_PASSWORD = "Sepadu2026!";
const SHEET_NAME = "Aduan";

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(["Waktu","Token","Nama","Kategori","Judul","Isi Aduan","Status","Jawaban","Waktu Jawaban"]);
  return sh;
}

function doPost(e) {
  const p = e.parameter || {};
  if (p.action === "submit") {
    sheet_().appendRow([new Date(), p.token || "", p.nama || "", p.kategori || "", p.judul || "", p.isi_aduan || "", "Belum dijawab", "", ""]);
    return json_({ok:true, token:p.token});
  }
  if (p.action === "answer") {
    if (p.password !== ADMIN_PASSWORD) return json_({ok:false,error:"Unauthorized"});
    const sh = sheet_(), values = sh.getDataRange().getValues();
    for (let i=1;i<values.length;i++) if (String(values[i][1]).toUpperCase() === String(p.token).toUpperCase()) { sh.getRange(i+1,7).setValue("Sudah dijawab"); sh.getRange(i+1,8).setValue(p.jawaban || ""); sh.getRange(i+1,9).setValue(new Date()); return json_({ok:true}); }
    return json_({ok:false,error:"Token tidak ditemukan"});
  }
  return json_({ok:false});
}

function doGet(e) {
  const p=e.parameter||{}, sh=sheet_(), values=sh.getDataRange().getValues();
  if (p.action === "check") {
    for (let i=1;i<values.length;i++) if (String(values[i][1]).toUpperCase()===String(p.token||"").toUpperCase()) return json_({found:true,token:values[i][1],nama:values[i][2],kategori:values[i][3],judul:values[i][4],isi_aduan:values[i][5],status:values[i][6],jawaban:values[i][7]});
    return json_({found:false});
  }
  if (p.action === "list" && p.password === ADMIN_PASSWORD) {
    return json_(values.slice(1).map(r=>({waktu:r[0],token:r[1],nama:r[2],kategori:r[3],judul:r[4],isi_aduan:r[5],status:r[6],jawaban:r[7],waktu_jawaban:r[8]})).reverse());
  }
  return json_({ok:true,service:"Desa Sepadu Aduan"});
}

function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
