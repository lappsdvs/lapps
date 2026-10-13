# LAPPS DVS / KPMVDGBKSM

Portal ahli LAPPS DVS untuk pendaftaran, semakan keahlian, pengumuman AGM,
analisis pencalonan dan pengurusan barisan AJK.

Dikemas kini: 14 Oktober 2026, waktu Malaysia.

## Seni bina dan URL

| Bahagian | Platform / URL |
|---|---|
| Laman utama dan PWA | https://lappsdvs.github.io/lapps/ |
| Dashboard admin | https://lappsdvs.github.io/lapps/Admin.html |
| Semakan ahli | https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec?page=semakan |
| Backend | https://script.google.com/macros/s/AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw/exec |
| Borang pencalonan | https://forms.gle/Na4HHtyBs7KYPJUq8 |
| Repository | https://github.com/lappsdvs/lapps |

GitHub Pages menyediakan paparan utama dan admin.
Apps Script membaca spreadsheet, menyemak PIN dan menyimpan rekod AJK.
Semakan ahli masih menggunakan halaman GAS dan `google.script.run`.
Admin GitHub Pages menggunakan POST JSON dengan Content-Type
`text/plain;charset=UTF-8`, kemudian membaca respons JSON backend.

`/exec?page=admin` masih tersedia sebagai route GAS.
Pintu masuk utama admin ialah GitHub Pages, melalui ADMIN ACCESS di footer.
Link kembali Admin dan Semakan menggunakan URL penuh laman utama GitHub Pages.

## Status live dan titik sambung

| Perkara | Status |
|---|---|
| Deployment backend | Versi 28 |
| Commit modul AJK | `6b4eb6c` |
| Commit carta | `abf5966` |
| Commit pembetulan link kembali | `e74dcb9` |
| Carta GitHub Pages | Pengguna mengesahkan carta sudah muncul |
| Analisis pencalonan | Ranking dan kiraan berjaya dipaparkan |
| PIN salah untuk analisis | Pengguna mengesahkan data tidak keluar sebelum migrasi admin ke GitHub Pages |
| Muatkan sesi AJK 2026/2028 | Berjaya; screenshot menunjukkan borang dan status belum disimpan |
| Simpan draf dan muat semula | Perlu pengesahan hasil ujian live yang jelas |
| Terbitkan dan paparan awam | Belum disahkan melalui ujian live |
| Status Git selepas commit AJK | Push berjaya; semakan akhir `git status -sb` masih perlu dibuat |

Langkah sambung: uji simpan draf kosong sesi 2026/2028, muat semula,
dan sahkan rekod boleh dibaca. Jangan terbitkan data ujian sebagai barisan rasmi.

## Fungsi sedia ada

- Pendaftaran baharu melalui deployment GAS berasingan.
- Semakan ahli berdasarkan MyKad; MyKad dan alamat rumah tidak dihantar
  dalam hasil semakan awam. Alamat pejabat masih dipaparkan.
- Animasi nombor hasil semakan, termasuk yuran.
- PWA, ikon dan offline fallback.
- Pengumuman AGM, banner `assets/agm_2026.png` dan butang borang pencalonan.
- Health check DataSemakan melalui PIN admin.
- Analisis pencalonan dengan ranking, tanda SERI, jumlah responses,
  masa kemas kini, ruangan kosong dan semakan nama MJK berulang.
- Carta bar mendatar bagi setiap kumpulan jawatan.
- Borang Urus AJK dengan pilihan nama calon atau input manual.
- Simpan draf, pratonton, pengesahan dan penerbitan barisan AJK.
- Paparan kad barisan AJK diterbitkan pada laman utama.

AGM: 27 Oktober 2026, Institut Penyelidikan Veterinar, Ipoh.
Hari terakhir pencalonan: 14 Oktober 2026.
Borang dijadualkan tutup pada 15 Oktober 2026, 00:00 GMT+8.

## Kaedah analisis pencalonan

- Ranking berasingan: YDP, NYDP, SU, Naib SU dan Bendahari.
- MJK 1 hingga MJK 6 digabungkan menjadi satu ranking.
- Kolum NAMA PENUH ialah pencadang dan tidak dikira sebagai pencalonan.
- Nama digabungkan hanya apabila beza huruf besar/kecil atau ruang.
  Ejaan, singkatan atau organisasi berlainan masih boleh menghasilkan
  rekod calon berasingan; perlu semakan urusetia.
- Nama MJK berulang dalam response sama masih dikira bagi setiap ruangan.
  Baris berkaitan ditandakan; kaedah pembetulan belum dimuktamadkan.
- Jumlah sama mendapat kedudukan sama dan tanda SERI.
  Susunan abjad tidak menentukan pemenang atau pemutus seri.
- Carta memaparkan semua calon; skala setiap jawatan bermula pada sifar
  hingga jumlah pencalonan tertinggi dalam jawatan itu.
- Ranking pencalonan bukan keputusan undi dan bukan shortlist rasmi.

Cadangan YDP: lima calon bagi YDP, NYDP, SU dan Bendahari;
20 calon daripada ranking gabungan MJK. Ahli kemudian memilih enam
orang MJK berlainan. Kaedah shortlist Naib SU, seri dan penggantian
calon yang menang jawatan utama perlu disahkan urusetia.

Undi AGM bermula dari kosong; jumlah pencalonan tidak ditambah kepada undi AGM.
Sistem pengundian dan pengiraan semua keputusan calon belum dibina.

## Urus AJK Sesi Baharu

1. Masukkan PIN dan buka Urus AJK Sesi Baharu.
2. Masukkan sesi, contohnya 2026/2028, dan klik Muatkan Sesi.
3. Isi YDP, NYDP, SU, Naib SU, Bendahari serta enam ahli MJK.
4. Semak nama dan organisasi dalam pratonton.
5. Simpan Draf untuk rekod yang belum hendak dipaparkan.
6. Selepas keputusan rasmi disahkan, tandakan pengesahan dan Terbitkan.

Draf boleh tidak lengkap. Penerbitan memerlukan 11 nama dan organisasi,
tanpa nama berulang berdasarkan normalisasi ruang dan huruf besar/kecil.
Jumlah undi sah adalah input manual dan pilihan; gambar serta profil juga pilihan.
Foto menggunakan URL HTTPS, bukan muat naik fail.
Organisasi daripada cadangan nama mungkin singkatan; admin perlu menyemaknya.

Setiap simpan menambah snapshot versi baharu dalam AJKSesi.
Versi rekod disemak dan Script Lock digunakan untuk mengelakkan
penulisan bertindih. Jika permintaan tamat masa, muatkan semula sesi
untuk semak status sebelum mencuba simpan lagi.

Draf baharu tidak menggantikan snapshot diterbitkan.
Paparan awam membaca snapshot DITERBITKAN terakhir yang ditambah,
bukan memilih sesi mengikut tahun.
UI pemilihan arkib dan fungsi nyahterbit belum dibina.

## Fail utama

| Fail | Tujuan |
|---|---|
| `Code.js` | Route GAS, semakan ahli, health check, ranking dan dispatcher POST |
| `Ajk.js` | Validasi, akses PIN, snapshot AJK dan bacaan awam |
| `Admin.html` | Admin GitHub Pages, carta dan borang AJK |
| `index.html` | Portal, AGM, ADMIN ACCESS dan kad AJK diterbitkan |
| `Semakan.html` | Semakan ahli melalui GAS |
| `appsscript.json` | Manifest Apps Script |
| `.clasp.json` | Sasaran projek Apps Script |
| `.claspignore` | Pengecualian fail untuk clasp |
| `manifest.webmanifest` | Manifest PWA |
| `service-worker.js` | Cache dan offline fallback |
| `offline.html` | Paparan offline |
| `assets/agm_2026.png` | Banner AGM |
| `icons/` | Ikon PWA |
| `SPREADSHEETS.md` | Mapping dan struktur data |
| `TODO.md` | Kerja seterusnya serta QA |

## Endpoint backend

| Kaedah / action | Tujuan | Akses |
|---|---|---|
| POST `healthCheck` | Diagnostik DataSemakan | PIN |
| POST `nominationAnalysis` | Ranking pencalonan | PIN |
| POST `getAjk` | Rekod sesi dan cadangan calon | PIN |
| POST `saveAjkDraft` | Simpan snapshot draf | PIN |
| POST `publishAjk` | Simpan snapshot diterbitkan | PIN dan pengesahan |
| GET `publishedAjk` | Nama, jawatan, organisasi, foto dan profil diterbitkan | Awam |

PIN disimpan dalam Script Properties `ADMIN_PIN`, bukan dalam Git.
PIN dihantar dalam badan POST, bukan URL.
Pengesahan akaun Google tidak digunakan untuk akses admin.
Sesiapa yang mengetahui PIN boleh menggunakan fungsi admin.
Respons AJK awam tidak mengandungi jumlah undi atau rekod draf.

## Deployment dan penyelenggaraan

Workspace: `C:\Users\burnk\OneDrive\Documents-assets\LAPPSDVS`.

Jalankan satu command pada satu masa:

1. Semak syntax JS, script HTML dan `git diff --check`.
2. `clasp show-authorized-user` jika ada masalah akses.
3. `clasp status`; pastikan fail backend yang betul disenaraikan.
4. `clasp push`.
5. `clasp version "Penerangan perubahan"`; gunakan versi yang benar-benar keluar.
6. Kemas kini deployment sedia ada dengan versi tersebut.
7. Stage fail khusus, commit dan push GitHub.
8. Uji laman live serta semak `git status -sb`.

Deployment ID:
`AKfycbwF-x9eezUErBoAL73rqp8k9tMgdISMXwk0wBOGtRfiG15jhAUiNbyJ6Kd8jyoUQgzpHw`

Akaun clasp yang berjaya digunakan: `lapps.dvs@gmail.com`.
Push GitHub menggunakan `git -c credential.username=lappsdvs push origin main`.
Login clasp dan GitHub ialah dua sistem berasingan.

Perubahan frontend GitHub Pages sahaja tidak memerlukan versi backend baharu.
Jika fail yang sama turut perlu dikemas kini pada route GAS, push dan deploy GAS.
Dokumentasi sahaja tidak memerlukan deployment backend.

Jika paparan lama muncul, cuba Ctrl+F5 atau query versi commit pada URL admin.
Semak deployment Pages dan service worker jika masalah berterusan.

## PWA dan nota data

Konfigurasi terdahulu mendokumenkan cache `lapps-v2` dan network-first
untuk navigation/index. Cache itu belum diaudit semula dalam sesi ini.
Semakan, analisis dan borang AJK memerlukan sambungan internet.
Jangan cache respons admin, PIN, MyKad atau keputusan semakan.
Semak privacy notice, perkongsian spreadsheet dan akses editor mengikut TODO.

Rujuk SPREADSHEETS.md untuk kedua-dua spreadsheet dan struktur AJKSesi.
