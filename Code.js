function doGet(e) {
  var page = e.parameter.page;
  if (!page || page == 'index') {
    return HtmlService.createTemplateFromFile('index').evaluate()
                       .setTitle('LAPPS KPMVDGBKSM')
                       .addMetaTag('viewport', 'width=device-width, initial-scale=1')
                       .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } else if (page == 'semakan') {
    return HtmlService.createTemplateFromFile('Semakan').evaluate()
                       .setTitle('Semakan Ahli - LAPPS')
                       .addMetaTag('viewport', 'width=device-width, initial-scale=1')
                       .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function testAuth() {
  const ss = SpreadsheetApp.openById("1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo");
  Logger.log("Pagar dibuka untuk: " + ss.getName());
}

function searchMember(inputMyKad) {
  try {
    const ssId = "1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo";
    const ss = SpreadsheetApp.openById(ssId);
    const sheet = ss.getSheetByName("DataSemakan");
    
    if (!sheet) throw new Error("Tab 'DataSemakan' tidak dijumpai!");

    const data = sheet.getDataRange().getValues();
    const searchStr = inputMyKad.toString().replace(/-/g, "").trim();
    let results = [];

    // Mapping column DataSemakan. Update index ini jika susunan column spreadsheet berubah.
    const COL = {
      noAhli: 0,          // Column A: No. Ahli
      namaAhli: 1,        // Column B: Nama Ahli
      mykad: 2,           // Column C: MyKad - untuk search/matching sahaja, tidak dipaparkan
      jawatanSemasa: 3,   // Column D: Jawatan Semasa
      bangsa: 4,          // Column E: Bangsa
      jantina: 5,         // Column F: Jantina
      alamat: 6,          // Column G: Alamat
      statusKeahlian: 7,  // Column H: Status Keahlian
      alamatPejabat: 8,   // Column I: Alamat Pejabat
      umurSemasa: 9,      // Column J: Umur Semasa
      opsyenPencen: 10,   // Column K: Opsyen Pencen
      bakiKhidmat: 11,    // Column L: Baki Khidmat
      yuranPerluBayar: 12 // Column M: Yuran Perlu Bayar
    };

    for (let i = 1; i < data.length; i++) {
      let mykadSheet = String(data[i][COL.mykad]).replace(/-/g, "").trim();
      
      if (searchStr !== "" && mykadSheet === searchStr) {
        results.push({
          noAhli: data[i][COL.noAhli],
          namaAhli: data[i][COL.namaAhli],
          jawatanSemasa: data[i][COL.jawatanSemasa],
          bangsa: data[i][COL.bangsa],
          jantina: data[i][COL.jantina],
          alamat: data[i][COL.alamat],
          statusKeahlian: data[i][COL.statusKeahlian],
          alamatPejabat: data[i][COL.alamatPejabat],
          umurSemasa: data[i][COL.umurSemasa],
          opsyenPencen: data[i][COL.opsyenPencen],
          bakiKhidmat: data[i][COL.bakiKhidmat],
          yuranPerluBayar: data[i][COL.yuranPerluBayar]
        });
      }
    }
    return results.length > 0 ? { found: true, data: results } : { found: false };
  } catch (e) {
    return { found: false, error: e.toString() };
  }
}
