# TODO LAPPSDVS / lapps

Dikemas kini: 14 Oktober 2026, waktu Malaysia.
Backend live: versi 28. Commit fungsi AJK: `6b4eb6c`.

## Titik sambung terdekat

- [x] Carta pencalonan muncul di GitHub Pages.
- [x] Backend dan borang Urus AJK dideploy.
- [x] Muatkan sesi 2026/2028 berjaya pada laman live.
- [ ] Sahkan mesej simpan draf kosong berjaya.
- [ ] Muat semula sesi dan sahkan status DRAF serta versi rekod.
- [ ] Sahkan tab AJKSesi dan snapshot disimpan dengan betul.
- [ ] Sahkan draf tidak muncul pada laman utama.
- [ ] Uji PIN salah untuk endpoint AJK pada GitHub Pages.
- [ ] Uji rekod berubah / expectedVersion yang sudah lama.
- [ ] Semak status Git akhir selepas push modul AJK.

Ujian backend dengan mocks lulus untuk PIN salah, draf kekal private,
konflik versi, kelengkapan penerbitan, nama berulang dan pengasingan
data undi daripada respons awam. Ini tidak menggantikan QA live.

## QA penerbitan AJK

- [ ] Uji penerbitan tidak lengkap ditolak.
- [ ] Uji nama berulang ditolak.
- [ ] Uji penerbitan tanpa pengesahan ditolak.
- [ ] Uji penerbitan dan paparan kad dalam persekitaran/data ujian berasingan.
- [ ] Uji draf baharu tidak mengubah barisan yang sudah diterbitkan.
- [ ] Uji gambar rosak menggunakan fallback inisial.
- [ ] Uji nama panjang dan paparan telefon.
- [ ] Semak hasil organisasi autofill; singkatan mungkin perlu dikembangkan.
- [ ] Uji privasi respons awam: tiada draf atau jumlah undi.
- [ ] Tambah pemilihan arkib sesi jika diperlukan.
- [ ] Tambah nyahterbit jika diperlukan.

Jangan terbitkan barisan rekaan sebagai AJK rasmi pada laman live.

## Pencalonan dan AGM

- [x] Pengumuman, banner AGM dan link borang responden.
- [x] Deadline laman selaras dengan borang: 15 Oktober 2026, 00:00 GMT+8.
- [x] Ranking setiap jawatan dan gabungan MJK 1-6.
- [x] Pencadang NAMA PENUH tidak masuk kiraan.
- [x] Normalisasi huruf besar/kecil dan ruang.
- [x] Tanda SERI dan baris MJK berulang.
- [x] Carta bar mendatar dengan semua calon.
- [ ] Semak nama calon yang berbeza ejaan/metadata.
- [ ] Sahkan kaedah nama berulang dalam satu response MJK.
- [ ] Sahkan kelayakan dan persetujuan calon.
- [ ] Sahkan kaedah pemutus seri pada tempat kelima dan ke-20.
- [ ] Sahkan kaedah shortlist Naib Setiausaha.
- [ ] Sahkan aturan penggantian MJK jika menang jawatan utama.
- [ ] Muktamadkan shortlist selepas pencalonan ditutup.
- [ ] Bina paparan calon untuk bentangan AGM.
- [ ] Kad profil/gambar calon dengan format seragam.
- [ ] Tab jawatan, kad ringkasan dan mode penuh skrin jika diperlukan.

Snapshot semakan 13 Oktober menunjukkan nama MJK berulang pada baris 19.
Baca semula data semasa sebelum membuat keputusan; nombor baris boleh berubah.

## Pengundian dan keputusan

- [ ] Tetapkan pengesahan ahli, satu rekod undi setiap ahli dan tempoh undi.
- [ ] Sahkan pilihan seorang bagi setiap jawatan utama.
- [ ] Tetapkan pilihan enam calon MJK berlainan daripada shortlist.
- [ ] Bina sistem undi atau modul key in keputusan semua calon.
- [ ] Kira jumlah undi sah setiap calon, berasingan daripada pencalonan.
- [ ] Tentukan pengendalian undi rosak/tidak lengkap dan seri.
- [ ] Paparan keputusan selepas disahkan urusetia.

Modul AJKSesi menyimpan barisan pemegang jawatan secara manual.
Ia belum menjalankan pengundian atau menentukan pemenang secara automatik.

## Semakan ahli dan spreadsheet

- [x] Mapping named fields dan semakan kewujudan DataSemakan.
- [x] Health check header, formula errors, MyKad kosong/berulang/tidak sah.
- [x] Summary row dan 20 isu pertama.
- [ ] Selesaikan isu DataSemakan yang dikenal pasti urusetia.
- [ ] Audit sumber dan permission IMPORTRANGE.
- [ ] Validasi kecukupan kolum A-M sebelum carian.
- [ ] Satukan mapping dalam config jika diperlukan.
- [ ] Uji MyKad dengan/tanpa dash dan format text/number bercampur.

## PWA, privasi dan penyelenggaraan

- [x] Manifest, ikon, service worker dan offline fallback.
- [x] MyKad dan alamat rumah tidak dipaparkan dalam hasil semakan awam.
- [x] Akses endpoint admin melalui PIN.
- [x] clasp sync dan deployment ID sedia ada digunakan.
- [x] Link kembali Admin/Semakan menuju laman utama GitHub Pages.
- [ ] Uji install PWA Android Chrome dan desktop Chrome/Edge.
- [ ] Audit cache Admin.html dan data sensitif.
- [ ] Privacy notice dan semakan field semakan yang dihantar ke frontend.
- [ ] Audit perkongsian spreadsheet serta editor yang dibenarkan.
- [ ] Semak loading, validasi MyKad dan result table pada telefon.
- [ ] Eksport laporan admin CSV jika diperlukan.
- [ ] Semak fungsi diagnostik yang boleh dipanggil terus dari GAS client.

## Dokumentasi

- [x] README menerangkan seni bina, endpoint dan status live.
- [x] SPREADSHEETS menerangkan pencalonan serta AJKSesi.
- [x] TODO membezakan fungsi siap daripada QA live yang pending.
- [ ] Kemas kini status selepas setiap ujian/deployment.
- [ ] Tambah screenshot panduan jika diperlukan.
