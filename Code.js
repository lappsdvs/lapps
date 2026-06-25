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

    for (let i = 1; i < data.length; i++) {
      // MASTER: MyKad sekarang di Kolum C (Index 2) ikut spreadsheet baru
      let mykadSheet = String(data[i][2]).replace(/-/g, "").trim();
      
      if (searchStr !== "" && mykadSheet === searchStr) {
        results.push({
          colA: data[i][0],  // NO AHLI
          colB: data[i][1],  // NAMA AHLI
          colC: data[i][2],  // MYKAD
          colD: data[i][3],  // JAWATAN SEMASA
          colE: data[i][4],  // BANGSA
          colF: data[i][5],  // JANTINA
          colG: data[i][6],  // ALAMAT
          colH: data[i][7],  // STATUS KEAHLIAN
          colI: data[i][8],  // ALAMAT PEJABAT
          colJ: data[i][9],  // UMUR SEMASA
          colK: data[i][10], // OPSYEN PENCEN
          colL: data[i][11], // BAKI PERKHIDMATAN
          colM: data[i][12]  // AHLI PERLU BAYAR (YURAN)
        });
      }
    }
    return results.length > 0 ? { found: true, data: results } : { found: false };
  } catch (e) {
    return { found: false, error: e.toString() };
  }
}
