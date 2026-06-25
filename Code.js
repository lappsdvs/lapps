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
  } else if (page == 'admin') {
    return HtmlService.createTemplateFromFile('Admin').evaluate()
                       .setTitle('Admin Health Check - LAPPS')
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

// Admin diagnostic wrapper sahaja.
// PIN disimpan dalam Script Properties key ADMIN_PIN.
// Public page tidak memanggil healthCheckDataSemakan() secara terus.
function runAdminHealthCheck(pin) {
  const adminPin = PropertiesService.getScriptProperties().getProperty("ADMIN_PIN");

  if (!adminPin) {
    return { ok: false, error: "ADMIN_PIN not set" };
  }

  if (String(pin || "") !== adminPin) {
    return { ok: false, error: "Unauthorized" };
  }

  return healthCheckDataSemakan();
}

// Admin/manual diagnostic sahaja.
// Jalankan function ini dari Apps Script editor untuk semak kesihatan sheet DataSemakan.
// Function ini tidak didedahkan kepada public page.
function healthCheckDataSemakan() {
  const ssId = "1xTOCPcSXsrmWqM1zACkDxazh1Ki3ZVjDjBEodt9MSRo";
  const sheetName = "DataSemakan";
  const expectedHeaders = [
    "NO AHLI",
    "NAMA AHLI",
    "MYKAD AHLI",
    "JAWATAN SEMASA",
    "BANGSA",
    "JANTINA",
    "ALAMAT",
    "STATUS KEAHLIAN",
    "ALAMAT PEJABAT",
    "UMUR SEMASA",
    "OPSYEN PENCEN PADA UMUR",
    "BAKI PERKHIDMATAN",
    "AHLI PERLU BAYAR"
  ];
  const formulaErrors = ["#REF!", "#N/A", "#VALUE!", "#ERROR!", "#DIV/0!"];
  const importantColumns = [
    { index: 0, column: "A", name: "No Ahli" },
    { index: 1, column: "B", name: "Nama Ahli" },
    { index: 2, column: "C", name: "MyKad" },
    { index: 7, column: "H", name: "Status Keahlian" },
    { index: 12, column: "M", name: "Yuran Perlu Bayar" }
  ];

  const report = {
    ok: true,
    checkedAt: new Date().toISOString(),
    spreadsheetName: "",
    sheetName: sheetName,
    totalRows: 0,
    totalIssues: 0,
    issues: []
  };

  function addIssue(type, severity, row, column, message, details) {
    const issue = { type: type, severity: severity, message: message };
    if (row !== null && row !== undefined) issue.row = row;
    if (column) issue.column = column;
    if (details) {
      if (details.noAhli !== undefined) issue.noAhli = details.noAhli;
      if (details.memberName !== undefined) issue.memberName = details.memberName;
    }
    report.issues.push(issue);
  }

  function isBlank(value) {
    return value === "" || value === null || value === undefined;
  }

  function normalizeMyKad(value) {
    return String(value || "").replace(/-/g, "").trim();
  }

  function normalizeHeader(value) {
    return String(value || "").replace(/\s+/g, " ").trim().toUpperCase();
  }

  function logSummary() {
    const summary = {
      ok: report.ok,
      checkedAt: report.checkedAt,
      spreadsheetName: report.spreadsheetName,
      sheetName: report.sheetName,
      totalRows: report.totalRows,
      totalIssues: report.totalIssues,
      first20Issues: report.issues.slice(0, 20)
    };
    Logger.log(JSON.stringify(summary, null, 2));
  }

  try {
    const ss = SpreadsheetApp.openById(ssId);
    report.spreadsheetName = ss.getName();

    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      addIssue("missing_sheet", "critical", null, null, "Tab DataSemakan tidak dijumpai.");
      report.ok = false;
      report.totalIssues = report.issues.length;
      logSummary();
      return report;
    }

    const range = sheet.getDataRange();
    const data = range.getValues();
    const displayData = range.getDisplayValues();
    report.totalRows = data.length;

    if (data.length === 0) {
      addIssue("missing_header", "critical", 1, null, "Sheet kosong. Header row tidak wujud.");
    } else {
      const headers = data[0];
      const hasAnyHeader = headers.slice(0, expectedHeaders.length).some(value => !isBlank(value));

      if (!hasAnyHeader) {
        addIssue("missing_header", "critical", 1, null, "Header row wujud tetapi kosong.");
      }

      expectedHeaders.forEach((expected, index) => {
        const actual = String(headers[index] || "").trim();
        const normalizedActual = normalizeHeader(actual);
        const normalizedExpected = normalizeHeader(expected);
        const column = String.fromCharCode(65 + index);
        const headerMatches = index === 12
          ? normalizedActual.indexOf(normalizedExpected) !== -1
          : normalizedActual === normalizedExpected;

        if (!headerMatches) {
          addIssue(
            "header_mismatch",
            "warning",
            1,
            column,
            "Header column " + column + " dijangka '" + expected + "' tetapi nilai semasa ialah '" + actual + "'."
          );
        }
      });
    }

    const seenMyKad = {};

    for (let r = 1; r < data.length; r++) {
      const rowNumber = r + 1;
      const row = data[r];
      const displayRow = displayData[r];

      displayRow.forEach((value, c) => {
        const text = String(value || "").trim();
        if (formulaErrors.indexOf(text) !== -1) {
          addIssue(
            "formula_error",
            "critical",
            rowNumber,
            String.fromCharCode(65 + c),
            "Formula error dijumpai: " + text
          );
        }
      });

      const statusKeahlian = normalizeHeader(row[7]);
      const isActiveMember = statusKeahlian.indexOf("AHLI AKTIF") !== -1;

      if (isActiveMember) {
        importantColumns.forEach(field => {
          if (isBlank(row[field.index])) {
            const details = field.index === 2 ? {
              noAhli: row[0],
              memberName: row[1]
            } : null;

            addIssue(
              "blank_important_field",
              "warning",
              rowNumber,
              field.column,
              field.name + " kosong untuk row AHLI AKTIF.",
              details
            );
          }
        });
      }

      const mykad = normalizeMyKad(row[2]);
      if (mykad !== "") {
        if (!/^\d{12}$/.test(mykad)) {
          addIssue(
            "invalid_mykad",
            "warning",
            rowNumber,
            "C",
            "MyKad tidak dalam format 12 digit."
          );
        }

        if (/^\d{12}$/.test(mykad) && seenMyKad[mykad]) {
          addIssue(
            "duplicate_mykad",
            "critical",
            rowNumber,
            "C",
            "MyKad duplicate dengan row " + seenMyKad[mykad] + "."
          );
        } else if (/^\d{12}$/.test(mykad)) {
          seenMyKad[mykad] = rowNumber;
        }
      }
    }
  } catch (e) {
    addIssue("spreadsheet_open_failed", "critical", null, null, "Spreadsheet tidak boleh dibuka: " + e.toString());
  }

  report.totalIssues = report.issues.length;
  report.ok = report.issues.filter(issue => issue.severity === "critical").length === 0;
  logSummary();
  return report;
}
