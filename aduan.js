/* =====================================================
   SISTEM ADUAN DESA SEPADU
   Terhubung ke Google Apps Script
===================================================== */

const ADUAN_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd0QoKtKUalUxUg7uIoKCjoiIgQref7khPk0RsajnvT6elws32OZEl_12Xi70ZoNgf/exec";

function buatToken() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "DSP-";
    for (let i = 0; i < 8; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

async function postAduan(data) {
    const body = new URLSearchParams(data);
    await fetch(ADUAN_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body
    });
}

const aduanForm = document.getElementById("aduanForm");
const aduanResult = document.getElementById("aduanResult");

if (aduanForm) {
    aduanForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const button = aduanForm.querySelector("button[type='submit']");
        const formData = new FormData(aduanForm);
        const token = buatToken();

        button.disabled = true;
        button.textContent = "Mengirim...";

        try {
            await postAduan({
                action: "submit",
                token,
                nama: formData.get("nama") || "",
                kontak: formData.get("kontak") || "",
                kategori: formData.get("kategori") || "",
                judul: formData.get("judul") || "",
                isi_aduan: formData.get("aduan") || ""
            });

            aduanResult.innerHTML =
                `Aduan berhasil dikirim. Token Anda: <strong>${token}</strong><br>` +
                `<small>Simpan token ini untuk mengecek status dan jawaban admin.</small>`;
            aduanResult.style.color = "#315b45";
            aduanForm.reset();

        } catch (error) {
            console.error(error);
            aduanResult.textContent = "Aduan gagal dikirim. Silakan coba lagi.";
            aduanResult.style.color = "#b33a3a";
        } finally {
            button.disabled = false;
            button.textContent = "Kirim Aduan →";
        }
    });
}

const cekAduanForm = document.getElementById("cekAduanForm");
const statusAduan = document.getElementById("statusAduan");

if (cekAduanForm) {
    cekAduanForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = document.getElementById("tokenCek").value.trim().toUpperCase();
        const button = cekAduanForm.querySelector("button[type='submit']");

        button.disabled = true;
        button.textContent = "Mengecek...";
        statusAduan.innerHTML = "";

        try {
            const response = await fetch(
                `${ADUAN_SCRIPT_URL}?action=check&token=${encodeURIComponent(token)}`
            );
            const result = await response.json();

            if (!result.found) {
                statusAduan.innerHTML = `<p style="color:#b33a3a">Token tidak ditemukan.</p>`;
                return;
            }

            const status = result.status || "Belum dijawab";
            const jawaban = result.jawaban || "Aduan Anda masih menunggu jawaban dari admin.";

            statusAduan.innerHTML = `
                <div style="padding:18px;border-radius:14px;background:#f5f5f5;line-height:1.7">
                    <strong>Token:</strong> ${escapeAduan(result.token)}<br>
                    <strong>Status:</strong> ${escapeAduan(status)}<br><br>
                    <strong>Judul:</strong> ${escapeAduan(result.judul)}<br>
                    <strong>Jawaban Admin:</strong><br>
                    ${escapeAduan(jawaban).replace(/\n/g, "<br>")}
                </div>`;

        } catch (error) {
            console.error(error);
            statusAduan.innerHTML =
                `<p style="color:#b33a3a">Gagal mengecek data. Pastikan Apps Script sudah di-deploy sebagai Web App dan aksesnya "Siapa saja".</p>`;
        } finally {
            button.disabled = false;
            button.textContent = "Cek Status →";
        }
    });
}

function escapeAduan(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}
