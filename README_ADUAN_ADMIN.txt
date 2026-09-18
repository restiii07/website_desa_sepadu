DESA SEPADU - FITUR ADUAN, TOKEN, DAN ADMIN

1. kontak.html tetap mempertahankan fitur kontak, lokasi Google Maps, alamat, telepon, email, dan sosial. Ditambahkan form Aduan Masyarakat serta Cek Status Aduan.
2. admin.html adalah halaman BARU dan TERPISAH untuk admin.
3. Code.gs adalah backend Google Apps Script untuk menyimpan aduan ke Google Sheets.
4. Sebelum dipakai online, buat Google Spreadsheet, buka Extensions > Apps Script, tempel isi Code.gs, lalu Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
5. Salin URL Web App /exec dan ganti nilai ADUAN_SCRIPT_URL di script.js.
6. Password admin diatur HANYA di Code.gs pada variabel ADMIN_PASSWORD. Default: Sepadu2026! (disarankan segera diganti).
7. Masyarakat mendapat token seperti DSP-AB12CD34 setelah mengirim aduan. Token dipakai di bagian Cek Status Aduan.
8. Admin login melalui admin.html, melihat aduan, lalu menulis jawaban. Jawaban akan terlihat saat token dicek masyarakat.
