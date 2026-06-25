# LAPPS KPMVDGBKSM

Gerbang Digital Ahli Veterinar LAPPS / KPMVDGBKSM untuk paparan portal, pendaftaran, dan semakan status ahli menggunakan No. MyKad.

Projek ini menggunakan dua lapisan:

- **GitHub Pages** sebagai landing page dan PWA shell.
- **Google Apps Script (GAS)** sebagai backend semakan ahli yang membaca Google Spreadsheet.

Public URL GitHub Pages:

```text
https://lappsdvs.github.io/lapps/
```

## Project Overview

Fungsi utama:

- Papar landing page LAPPS di GitHub Pages.
- Sediakan button **Pendaftaran Baru** ke Google Apps Script deployment sedia ada.
- Sediakan button **Semakan Status** ke Google Apps Script semakan page.
- Cari rekod ahli berdasarkan input MyKad.
- Papar keputusan ahli tanpa memaparkan MyKad pada public result page.
- Papar numeric fields dengan subtle count-up animation / number animation.
- Sokong basic PWA installable experience.

## Completed Features

- README.md created.
- SPREADSHEETS.md created.
- Spreadsheet dependency documented.
- Semakan link fixed for GitHub Pages.
- MyKad hidden from public result page.
- Member result mapping updated menggunakan named fields seperti `noAhli`, `namaAhli`, `jawatanSemasa`.
- Number animation on result untuk numeric fields.
- Basic PWA installable setup.
- PWA app icons `192x192` dan `512x512`.
- Offline fallback page.
- Spreadsheet health check function: `healthCheckDataSemakan()`.

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
| `check()` dalam `Semakan.html` | Panggil `google.script.run.searchMember(mykad)` dan render result. |
| `animateNumbers()` dalam `Semakan.html` | Count-up animation untuk numeric result values. |

## PWA Notes

PWA setup berada di GitHub Pages layer sahaja.

- `manifest.webmanifest` menjadikan app installable.
- `icons/icon-192.png` dan `icons/icon-512.png` digunakan sebagai app icons.
- `service-worker.js` cache static GitHub Pages files sahaja.
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
https://script.google.com/macros/s/[DEPLOY_ID]/exec?page=semakan
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
- Jangan cache Google Apps Script semakan result.
- Jangan jadikan Google Spreadsheet public.
- Hadkan edit access spreadsheet kepada admin yang sah.
- Pertimbangkan privacy notice dan masking policy untuk sensitive fields.
- Semakan ahli perlu kekal online-only supaya data tidak tersimpan dalam PWA cache.
