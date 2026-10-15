# Dokumentasi Spreadsheet LAPPS

Dokumen ini menerangkan data semakan ahli, pencalonan dan snapshot barisan AJK LAPPS.

Official URLs:

- GitHub Pages: https://lappsdvs.github.io/lapps/
- GAS Semakan URL: https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=semakan
- GAS Admin Health URL: https://lappsdvs.github.io/lapps/Admin.html
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

## Pencalonan dan AJKSesi (14 Oktober 2026)

Spreadsheet pencalonan dan rekod AJK:
https://docs.google.com/spreadsheets/d/1r25kF1RzY8CFnBpo2H4OEFq5ai6f0zZm4q61R0woIA4/edit

Spreadsheet keahlian dan mapping DataSemakan di atas kekal berasingan.
Borang sumber: https://forms.gle/Na4HHtyBs7KYPJUq8

### Form Responses 1

| Kolum | Header / kegunaan |
|---|---|
| A | Timestamp; menentukan baris response yang dikira |
| B | Email Address pencadang |
| C | NAMA PENUH pencadang; bukan pencalonan |
| D | JAWATAN pencadang |
| E | ORGANISASI pencadang |
| F | YANG DIPERTUA |
| G | NAIB YANG DIPERTUA |
| H | SETIAUSAHA |
| I | NAIB SETIAUSAHA |
| J | BENDAHARI |
| K-P | 1. hingga 6. MAJLIS JAWATANKUASA KERJA |

Backend mencari header berdasarkan nama, dengan normalisasi ruang dan case.
K-P digabungkan dalam satu ranking MJK; F-J dikira berasingan.
Kolum A-E tidak menyumbang pencalonan.

Nama calon hanya digabungkan jika sama selepas normalisasi ruang dan case.
Metadata/organisasi atau ejaan berlainan perlu semakan manusia.
Nama berulang dalam response MJK masih dikira setiap kali dan barisnya ditandakan.
Jumlah yang sama menerima kedudukan sama. Shortlist tidak dipilih automatik.

Form Responses 1 dibaca sahaja oleh modul analisis/AJK.
Kod modul ini tidak mengubah respons pencalonan.

### AJKSesi

Tab dicipta automatik pada simpan pertama.
Setiap simpan menambah satu baris snapshot; tidak menggantikan sejarah sebelumnya.

| Kolum | Header | Kandungan |
|---|---|---|
| A | sesi | Contoh 2026/2028 |
| B | versi | Nombor versi meningkat bagi sesi yang sama |
| C | status | DRAF atau DITERBITKAN |
| D | dikemas_kini | ISO timestamp |
| E | data_json | Array 19 rekod pemegang jawatan; snapshot lama boleh mempunyai 11 |

Setiap objek dalam data_json:

| Field | Kandungan |
|---|---|
| role | YDP, NYDP, SU, NSU, BENDAHARI, MJK1-6, DAERAH1-6, AUDIT1-2 |
| nama | Nama pemegang jawatan |
| organisasi | Organisasi; diperlukan untuk penerbitan |
| undi | Integer >= 0 atau null; input manual pilihan |
| foto | URL HTTPS atau string kosong |
| profil | Profil ringkas atau string kosong |

Sesi mesti mempunyai tempoh dua tahun.
Draf boleh tidak lengkap; penerbitan baharu memerlukan semua 19 nama dan organisasi.
Nama berulang ditolak berdasarkan normalisasi ruang/case dalam kumpulan sama:
teras (11), daerah (6) dan audit (2). Nama boleh sama antara kumpulan berlainan.
Gambar dan profil tidak diwajibkan.
Semua fungsi helper dalaman Ajk.js berakhir dengan underscore.

Admin membaca snapshot terkini bagi sesi yang dipilih.
Simpan menggunakan expectedVersion dan Script Lock.
Jika rekod telah berubah, simpan ditolak dan admin perlu muat semula.
Header AJKSesi mesti sepadan; kod tidak menulis pada tab berstruktur lain.

GET action=publishedAjk membaca snapshot DITERBITKAN terakhir yang ditambah.
Draf tidak dihantar melalui endpoint itu; undi juga tidak dimasukkan.
Draf yang disimpan selepas penerbitan tidak menggantikan barisan awam.
Pemilihan arkib dan nyahterbit belum tersedia.

Had payload POST: 32768 aksara.
Had data_json yang disimpan oleh modul: 20000 aksara.
Jangan edit JSON atau header secara manual ketika admin sedang menyimpan.

### Carta organisasi 19 ruangan (15 Oktober 2026, belum deploy)

AJK Daerah dan Juruaudit Dalaman diisi manual berdasarkan pengesahan urusetia.
Semua menggunakan field sedia ada; tiada penentuan pemenang atau pelantikan automatik.
Tiada tab atau kolum baharu diperlukan. Snapshot lama tidak diubah.
Draf payload lama dengan 11 peranan teras diterima dan dilengkapkan dengan lapan ruangan kosong.
Publish payload 11 ditolak supaya frontend lama tidak menggugurkan peranan tambahan.
Borang baharu memuat snapshot 11 ke 19 ruangan dan memerlukan kelengkapan sebelum publish.
Carta rasmi membaca GET publishedAjk; jumlah undi kekal tidak dihantar kepada awam.
PNG draf dijana daripada input semasa, bukan bukti rekod telah disimpan atau diterbitkan.

### Status ujian dan akses

- Backend live versi 28; muat sesi AJK berjaya pada GitHub Pages.
- Simpan draf/readback dan penerbitan awam masih memerlukan QA live jelas.
- Ujian backend dengan mocks lulus untuk PIN, draf, konflik versi,
  nama berulang, kelengkapan dan pemisahan data awam.
- PIN berada dalam Script Properties ADMIN_PIN; jangan tulis nilainya dalam dokumentasi.
- POST admin memerlukan PIN. GET publishedAjk menyediakan data yang diterbitkan sahaja.
- Jangan jadikan keseluruhan spreadsheet awam untuk membolehkan paparan AJK.
- Angka pencalonan ialah data semasa, bukan keputusan undi AGM.
