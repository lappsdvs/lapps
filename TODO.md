# TODO LAPPSDVS / lapps

Checklist ini fokus kepada kerja praktikal untuk projek Google Apps Script Web App LAPPS. Item bertanda selesai ialah kerja dokumentasi dan fix yang sudah dibuat dalam repo tempatan.

## PWA Roadmap

- [x] Create `manifest.webmanifest`.
- [x] Create `service-worker.js`.
- [x] Add PWA icons `192x192` dan `512x512`.
- [x] Register service worker dalam halaman utama.
- [x] Add offline fallback page untuk paparan apabila tiada internet.
- [x] Basic PWA setup done.
- [ ] Test PWA install on Android Chrome.
- [ ] Test PWA install on desktop Chrome / Edge.
- [x] Semak cache strategy supaya data ahli tidak disimpan secara tidak sengaja di browser.

## Security / Privacy

- [x] MyKad hidden from public result page.
- [ ] Add privacy notice pada halaman semakan.
- [ ] Add masking policy untuk sensitive fields seperti MyKad, alamat, yuran, dan status keahlian.
- [ ] Semak semula field yang dihantar dari `Code.js` ke frontend supaya hanya data perlu sahaja dihantar.
- [ ] Tetapkan polisi access Google Apps Script deployment, contohnya public link atau organization-only.
- [ ] Pastikan Google Spreadsheet tidak dikongsi sebagai public.
- [ ] Audit siapa yang ada edit access kepada Google Spreadsheet.

## Spreadsheet Reliability

- [x] Spreadsheet dependency documented.
- [x] Member result mapping updated.
- [x] Add spreadsheet health check function `healthCheckDataSemakan()`.
- [x] Add spreadsheet health check untuk detect `#REF!`.
- [x] Add spreadsheet health check untuk blank headers.
- [ ] Add spreadsheet health check untuk broken `IMPORTRANGE`.
- [ ] Add validation bahawa sheet `DataSemakan` wujud sebelum search.
- [ ] Add validation bahawa required columns masih cukup dari A sampai M.
- [ ] Simpan column mapping dalam satu config supaya senang update jika struktur spreadsheet berubah.
- [ ] Test search dengan MyKad tanpa dash dan dengan dash.
- [ ] Test search apabila data MyKad ada spacing atau format text/number bercampur.

## Google Apps Script Deployment

- [x] Semakan link fixed for GitHub Pages.
- [ ] Add deployment checklist untuk GitHub + GAS.
- [ ] Pastikan URL GitHub Pages untuk halaman utama berfungsi.
- [ ] Pastikan URL GAS `/exec?page=semakan` berfungsi.
- [ ] Pastikan `Code.js`, `index.html`, dan `Semakan.html` versi local sudah disalin ke Apps Script.
- [ ] Test authorization `SpreadsheetApp.openById()` selepas deploy.
- [ ] Rekod deployment URL semasa dalam README atau deployment notes.
- [ ] Semak sama ada back link dalam `Semakan.html` perlu guna URL penuh jika halaman dibuka luar GAS.

## UI / UX Improvements

- [ ] Add loading state yang jelas semasa carian sedang berjalan.
- [ ] Add message ringkas jika input MyKad bukan 12 digit.
- [ ] Add mobile test untuk table result supaya label dan value mudah dibaca.
- [ ] Pertimbangkan susunan field result mengikut kepentingan pengguna.
- [ ] Semak text Bahasa Malaysia supaya konsisten antara halaman utama dan semakan.
- [ ] Tambah fallback jika external image gagal load.

## Admin / Maintenance Tools

- [x] Add admin-only diagnostic function.
- [ ] Admin Health Page.
- [ ] Add function untuk test spreadsheet access dan return status yang mudah dibaca admin.
- [ ] Add function untuk kira jumlah row data dalam `DataSemakan`.
- [ ] Add function untuk check duplicate MyKad.
- [ ] Add function untuk list missing required fields.
- [ ] Add simple maintenance log untuk catat tarikh deployment dan perubahan penting.

## Documentation

- [x] README.md created.
- [x] SPREADSHEETS.md created.
- [x] Spreadsheet dependency documented.
- [ ] Add screenshot atau ringkas visual flow untuk user journey.
- [ ] Add deployment checklist untuk GitHub + GAS.
- [ ] Document semua external URLs dan tujuan setiap URL.
- [ ] Document polisi data: data apa dipaparkan, data apa disimpan, dan siapa boleh akses.
- [ ] Update `SPREADSHEETS.md` setiap kali column spreadsheet berubah.
