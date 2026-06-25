# Dokumentasi Spreadsheet LAPPS

Dokumen ini menerangkan spreadsheet dependency untuk sistem semakan ahli LAPPS.

Official URLs:

- GitHub Pages: https://lappsdvs.github.io/lapps/
- GAS Semakan URL: https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=semakan
- GAS Admin Health URL: https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=admin
- Spreadsheet URL: https://docs.google.com/spreadsheets/d/1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo/edit

## Spreadsheet ID

| Kegunaan | Spreadsheet ID | Sheet / Tab |
|---|---|---|
| Database semakan ahli LAPPS | `1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo` | `DataSemakan` |

## Functions Yang Menggunakan Spreadsheet

| Function | Fail | Tujuan |
|---|---|---|
| `testAuth()` | `Code.js` | Test akses kepada spreadsheet. |
| `searchMember(inputMyKad)` | `Code.js` | Cari ahli berdasarkan MyKad di column C. |
| `healthCheckDataSemakan()` | `Code.js` | Admin/manual diagnostic untuk semak kesihatan `DataSemakan`. |
| `runAdminHealthCheck(pin)` | `Code.js` | PIN-protected wrapper untuk Admin Health Page. |

## DataSemakan Dan IMPORTRANGE

`DataSemakan` bergantung kepada data yang dibawa masuk melalui `IMPORTRANGE`.

Risiko penting:

- Jika source spreadsheet berubah, `DataSemakan` boleh gagal.
- Jika source tab name berubah, `DataSemakan` mungkin menghasilkan `#REF!`.
- Jika permission `IMPORTRANGE` belum dibenarkan, data mungkin tidak keluar.
- Jika header source berubah, mapping semakan boleh lari.

Gunakan `healthCheckDataSemakan()` untuk detect:

- `#REF!`, `#N/A`, `#VALUE!`, `#ERROR!`, `#DIV/0!`.
- Header mismatch.
- Blank MyKad untuk row `AHLI AKTIF`.
- Blank important fields untuk row `AHLI AKTIF`.
- Duplicate MyKad.
- Invalid MyKad format.

Admin Health Page membantu kenal pasti active members dengan blank MyKad. Untuk isu MyKad kosong pada row `AHLI AKTIF`, admin table memaparkan `No Ahli` dan `Nama Ahli` supaya kerja cleanup data lebih mudah.

Admin Health Page:

- PIN protected menggunakan Script Properties key `ADMIN_PIN`.
- Menjalankan `runAdminHealthCheck(pin)`.
- Memaparkan health check summary.
- Memaparkan first 20 issues.
- Issue table columns: row, column, noAhli, memberName, type, severity, message.
- Tidak memaparkan nilai MyKad.
- Tidak memaparkan residential/home address.

## Expected Headers A-M

Health check membandingkan header dengan normalisasi:

- Ignore case.
- Ignore newline.
- Ignore extra spaces.
- Column M pass jika actual header mengandungi `AHLI PERLU BAYAR`.

| Column | Expected Header |
|---|---|
| A | `NO AHLI` |
| B | `NAMA AHLI` |
| C | `MYKAD AHLI` |
| D | `JAWATAN SEMASA` |
| E | `BANGSA` |
| F | `JANTINA` |
| G | `ALAMAT` |
| H | `STATUS KEAHLIAN` |
| I | `ALAMAT PEJABAT` |
| J | `UMUR SEMASA` |
| K | `OPSYEN PENCEN PADA UMUR` |
| L | `BAKI PERKHIDMATAN` |
| M | `AHLI PERLU BAYAR` |

## Column Mapping Dalam `searchMember(inputMyKad)`

| Named Field | Column | Kegunaan | Dipaparkan |
|---|---|---|---|
| `noAhli` | A | No. ahli | Ya |
| `namaAhli` | B | Nama ahli | Ya |
| `mykad` | C | Search/matching sahaja | Tidak |
| `jawatanSemasa` | D | Jawatan semasa | Ya |
| `bangsa` | E | Bangsa | Ya |
| `jantina` | F | Jantina | Ya |
| `alamat` | G | Alamat rumah / residential address | Tidak. Tidak dihantar ke frontend untuk public result. |
| `statusKeahlian` | H | Status keahlian | Ya |
| `alamatPejabat` | I | Alamat pejabat | Ya |
| `umurSemasa` | J | Umur semasa | Ya, animated jika numeric |
| `opsyenPencen` | K | Opsyen pencen | Ya, animated jika numeric |
| `bakiKhidmat` | L | Baki khidmat | Ya, animated jika numeric |
| `yuranPerluBayar` | M | Yuran perlu bayar | Ya, animated jika numeric |

Nota paparan semakan:

- MyKad tidak dipaparkan dalam public result page.
- Alamat rumah / residential address tidak dipaparkan.
- `Alamat Pejabat` kekal dipaparkan.
- Numeric result animation sudah ditingkatkan kepada `1800ms`, dengan font lebih besar dan yuran animation yang lebih jelas.

## Privacy / Security Notes

- MyKad ialah sensitive data dan tidak dipaparkan pada public result page.
- MyKad masih digunakan untuk search input dan matching dalam backend.
- Alamat rumah / residential address tidak dihantar ke frontend.
- `Alamat Pejabat` masih dipaparkan.
- Jangan share spreadsheet sebagai public.
- Jangan cache semakan result dalam service worker.
- Review semula field yang dihantar ke frontend jika polisi data berubah.

## Maintenance Notes

Jika struktur spreadsheet berubah:

1. Update mapping dalam `searchMember(inputMyKad)`.
2. Update expected headers dalam `healthCheckDataSemakan()`.
3. Update dokumen ini.
4. Jalankan `healthCheckDataSemakan()` dari Apps Script editor.
