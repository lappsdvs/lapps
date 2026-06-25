# Dokumentasi Spreadsheet

Dokumen ini menyenaraikan Google Spreadsheet, sheet/tab name, function yang menggunakannya, column mapping, dan nota privacy/security untuk projek LAPPS.

Semakan dibuat berdasarkan kod aktif:

- `lapps/Code.js`
- `lapps/index.html`
- `lapps/Semakan.html`

## Spreadsheet ID

| Bil | Spreadsheet ID | Kegunaan | Digunakan Oleh |
|---:|---|---|---|
| 1 | `1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo` | Database semakan ahli LAPPS | `testAuth()`, `searchMember(inputMyKad)` |

Setakat scan kod aktif, hanya 1 Spreadsheet ID digunakan untuk data semakan ahli.

## Sheet / Tab Name

| Spreadsheet ID | Sheet / Tab Name | Function Yang Guna | Tujuan |
|---|---|---|---|
| `1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo` | `DataSemakan` | `searchMember(inputMyKad)` | Menyimpan rekod ahli dan digunakan untuk carian berdasarkan No. MyKad. |

Kod yang membuka sheet:

```js
const ssId = "1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo";
const ss = SpreadsheetApp.openById(ssId);
const sheet = ss.getSheetByName("DataSemakan");
```

## Function Yang Menggunakan Spreadsheet

| Function | Fail | Spreadsheet / Sheet | Operasi |
|---|---|---|---|
| `testAuth()` | `lapps/Code.js` | Spreadsheet ID sahaja | Buka spreadsheet dengan `SpreadsheetApp.openById()` dan log nama spreadsheet. |
| `searchMember(inputMyKad)` | `lapps/Code.js` | `DataSemakan` | Baca semua data dengan `getDataRange().getValues()`, cari MyKad di column C, return result ke frontend. |
| `check()` | `lapps/Semakan.html` | Tidak akses spreadsheet secara direct | Panggil backend melalui `google.script.run.searchMember(mykad)`. |

## Column Mapping: `DataSemakan`

Kod membaca semua row daripada `DataSemakan` dan mula loop dari row kedua, jadi row pertama dianggap header.

Carian MyKad dibuat pada column C:

```js
let mykadSheet = String(data[i][2]).replace(/-/g, "").trim();
```

| Array Index | Column | Field / Nama Data | Digunakan Untuk | Dipaparkan Di Frontend |
|---:|---|---|---|---|
| `data[i][0]` | A | No Ahli | Return sebagai `colA` | Ya |
| `data[i][1]` | B | Nama Ahli | Return sebagai `colB` | Ya |
| `data[i][2]` | C | MyKad | Search key dan return sebagai `colC` | Ya |
| `data[i][3]` | D | Jawatan Semasa | Return sebagai `colD` | Ya |
| `data[i][4]` | E | Bangsa | Return sebagai `colE` | Tidak dalam paparan semasa |
| `data[i][5]` | F | Jantina | Return sebagai `colF` | Tidak dalam paparan semasa |
| `data[i][6]` | G | Alamat | Return sebagai `colG` | Tidak dalam paparan semasa |
| `data[i][7]` | H | Status Keahlian | Return sebagai `colH` | Ya |
| `data[i][8]` | I | Alamat Pejabat | Return sebagai `colI` | Tidak dalam paparan semasa |
| `data[i][9]` | J | Umur Semasa | Return sebagai `colJ` | Tidak dalam paparan semasa |
| `data[i][10]` | K | Opsyen Pencen | Return sebagai `colK` | Tidak dalam paparan semasa |
| `data[i][11]` | L | Baki Perkhidmatan | Return sebagai `colL` | Ya |
| `data[i][12]` | M | Ahli Perlu Bayar / Yuran | Return sebagai `colM` | Ya, dipaparkan sebagai tunggakan yuran |

## Data Flow Ringkas

```text
User masukkan No. MyKad
        ↓
Semakan.html -> check()
        ↓
google.script.run.searchMember(mykad)
        ↓
Code.js -> searchMember(inputMyKad)
        ↓
SpreadsheetApp.openById(...)
        ↓
getSheetByName("DataSemakan")
        ↓
Cari padanan di column C
        ↓
Return object ke frontend
```

## Dependency Dan Risiko Struktur Data

Sistem boleh gagal atau return data salah jika:

- Spreadsheet ID berubah.
- Sheet name `DataSemakan` berubah.
- Column MyKad bukan lagi column C.
- Column A hingga M disusun semula tanpa ubah kod.
- Row pertama bukan header tetapi data sebenar.
- MyKad dalam spreadsheet disimpan dengan format tidak konsisten.
- Akaun Apps Script owner tiada permission kepada spreadsheet.

## Privacy / Security Notes

Data dalam spreadsheet mengandungi PII atau maklumat peribadi:

- No. MyKad.
- Nama penuh.
- Alamat rumah.
- Alamat pejabat.
- Status keahlian.
- Maklumat baki perkhidmatan.
- Maklumat yuran / tunggakan.

Cadangan kawalan:

- Jangan share spreadsheet sebagai public.
- Beri akses kepada admin yang perlu sahaja.
- Gunakan Google account organisasi untuk owner Apps Script.
- Pertimbangkan masking MyKad dalam paparan, contohnya hanya tunjuk 4 digit terakhir.
- Kurangkan data yang dihantar ke frontend jika tidak perlu. Kod semasa return column A hingga M untuk setiap result.
- Semak semula sama ada alamat, bangsa, jantina, umur, dan opsyen pencen perlu dihantar ke browser.
- Pastikan deployment web app tidak memberi akses edit spreadsheet kepada pengguna luar.
- Audit access Google Drive / Google Sheets secara berkala.

## Nota Untuk Maintenance

Jika struktur sheet berubah, update kedua-dua tempat ini:

1. Kod dalam `searchMember(inputMyKad)` di `lapps/Code.js`.
2. Dokumentasi column mapping dalam fail ini.

Jika spreadsheet baru digunakan, update:

- Spreadsheet ID dalam `testAuth()`.
- Spreadsheet ID dalam `searchMember(inputMyKad)`.
- Table `Spreadsheet ID` dalam fail ini.
