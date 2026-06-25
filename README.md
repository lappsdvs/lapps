# LAPPS KPMVDGBKSM

Gerbang Digital Ahli Veterinar LAPPS / KPMVDGBKSM untuk paparan portal, pendaftaran, dan semakan status ahli menggunakan No. MyKad.

Projek ini menggunakan dua lapisan:

- **GitHub Pages** sebagai landing page dan PWA shell.
- **Google Apps Script (GAS)** sebagai backend semakan ahli yang membaca Google Spreadsheet.

Public URL GitHub Pages:

```text
https://lappsdvs.github.io/lapps/
```

Official URLs:

- GitHub Pages: https://lappsdvs.github.io/lapps/
- GAS Semakan URL: https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=semakan
- GAS Admin Health URL: https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=admin
- Spreadsheet URL: https://docs.google.com/spreadsheets/d/1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo/edit

## Project Overview

Fungsi utama:

- Papar landing page LAPPS di GitHub Pages.
- Sediakan button **Pendaftaran Baru** ke Google Apps Script deployment sedia ada.
- Sediakan button **Semakan Status** ke Google Apps Script semakan page.
- Cari rekod ahli berdasarkan input MyKad.
- Papar keputusan ahli tanpa memaparkan MyKad pada public result page.
- Papar keputusan ahli tanpa memaparkan alamat rumah / residential address.
- `Alamat Pejabat` kekal dipaparkan.
- Papar numeric fields dengan subtle count-up animation / number animation.
- Sokong basic PWA installable experience.

## Completed Features

- README.md created.
- SPREADSHEETS.md created.
- Spreadsheet dependency documented.
- Semakan link fixed for GitHub Pages.
- MyKad hidden from public result page.
- Residential/home address hidden from public result page.
- `Alamat Pejabat` remains displayed.
- Member result mapping updated menggunakan named fields seperti `noAhli`, `namaAhli`, `jawatanSemasa`.
- Number animation on result untuk numeric fields.
- Number animation improved: duration `1800ms`, bigger animated numbers, dan yuran animation lebih jelas.
- GAS semakan URL updated to latest deployment.
- Basic PWA installable setup.
- PWA app icons `192x192` dan `512x512`.
- Offline fallback page.
- PWA service worker cache updated to `lapps-v2`.
- PWA uses network-first for navigation dan `index.html` untuk kurangkan isu old cache.
- Spreadsheet health check function: `healthCheckDataSemakan()`.
- Admin Health Page completed.
- Admin PIN protection completed menggunakan Script Properties key `ADMIN_PIN`.

## File Structure

```text
LAPPSDVS/
├── Code.js                  # Backend Google Apps Script
├── index.html               # GitHub Pages landing page / PWA shell
├── Semakan.html             # Google Apps Script semakan page
├── manifest.webmanifest     # PWA manifest
├── service-worker.js        # PWA service worker untuk static files sahaja
├── offline.html             # Offline fallback page
├── icons/
│   ├── icon.svg             # Source icon
│   ├── icon-192.png         # PWA icon 192x192
│   └── icon-512.png         # PWA icon 512x512
├── README.md
├── SPREADSHEETS.md
└── TODO.md
```

## Main Functions

| Function / Fail | Tujuan |
|---|---|
| `doGet(e)` dalam `Code.js` | Route Google Apps Script page: `index` atau `semakan`. |
| `testAuth()` dalam `Code.js` | Test akses Apps Script kepada spreadsheet. |
| `searchMember(inputMyKad)` dalam `Code.js` | Cari ahli berdasarkan MyKad dan return named fields ke frontend. |
| `healthCheckDataSemakan()` dalam `Code.js` | Admin/manual diagnostic untuk semak kesihatan `DataSemakan`. |
| `runAdminHealthCheck(pin)` dalam `Code.js` | PIN-protected wrapper yang baca `ADMIN_PIN` dan jalankan health check jika authorized. |
| `check()` dalam `Semakan.html` | Panggil `google.script.run.searchMember(mykad)` dan render result. |
| `animateNumbers()` dalam `Semakan.html` | Count-up animation untuk numeric result values. |

## Admin Health Page

Admin Health Page:

```text
https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=admin
```

Security:

- PIN protected menggunakan Script Properties key `ADMIN_PIN`.
- Frontend memanggil `google.script.run.runAdminHealthCheck(pin)`.
- `runAdminHealthCheck(pin)` hanya menjalankan `healthCheckDataSemakan()` jika PIN betul.

Paparan:

- Health check summary.
- First 20 issues.
- Table columns: row, column, noAhli, memberName, type, severity, message.
- Tidak memaparkan nilai MyKad.
- Tidak memaparkan residential/home address.

## PWA Notes

PWA setup berada di GitHub Pages layer sahaja.

- `manifest.webmanifest` menjadikan app installable.
- `icons/icon-192.png` dan `icons/icon-512.png` digunakan sebagai app icons.
- `service-worker.js` cache static GitHub Pages files sahaja.
- Cache version semasa: `lapps-v2`.
- Navigation dan `/lapps/index.html` guna network-first strategy supaya user lebih cepat dapat versi latest.
- `offline.html` dipaparkan sebagai fallback jika user offline.
- Semakan ahli kekal online-only kerana ia bergantung kepada `google.script.run`, Google Apps Script, dan Google Spreadsheet.

Service worker tidak cache Google Apps Script semakan page atau result data.

## Google Apps Script Deployment Steps

1. Buka Google Apps Script project.
2. Pastikan fail berikut disalin ke Apps Script:
   - `Code.js`
   - `index.html`
   - `Semakan.html`
3. Deploy sebagai **Web app**.
4. Pastikan account owner Apps Script ada access kepada spreadsheet.
5. Test URL semakan:

```text
https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=semakan
```

6. Jalankan `healthCheckDataSemakan()` secara manual dari Apps Script editor untuk semak spreadsheet.

## Spreadsheet Dependency

Kod semakan menggunakan spreadsheet:

```text
1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo
```

Sheet utama:

```text
DataSemakan
```

Rujuk [SPREADSHEETS.md](./SPREADSHEETS.md) untuk mapping column dan nota IMPORTRANGE.

## Security Notes

- MyKad digunakan untuk search input dan matching sahaja.
- MyKad tidak dipaparkan dalam public result page.
- Alamat rumah / residential address tidak dihantar ke frontend dan tidak dipaparkan.
- `Alamat Pejabat` masih dipaparkan kerana diperlukan untuk rujukan kerja.
- Jangan cache Google Apps Script semakan result.
- Jangan jadikan Google Spreadsheet public.
- Hadkan edit access spreadsheet kepada admin yang sah.
- Pertimbangkan privacy notice dan masking policy untuk sensitive fields.
- Semakan ahli perlu kekal online-only supaya data tidak tersimpan dalam PWA cache.
