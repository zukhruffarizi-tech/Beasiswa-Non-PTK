function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Kelengkapan Berkas Beasiswa Non-PTK') // Judul di tab browser
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getBeasiswaData() {
  try {
    var idSpreadsheet = '1lms6GUoS-cI0urSWixCkEx72q8RONhE9X7PkbqGBPZw';
    var sheet = SpreadsheetApp.openById(idSpreadsheet).getSheetByName('Sheet1');
    
    // Pastikan sheet ditemukan
    if (!sheet) {
       return { error: 'Sheet "Sheet1" tidak ditemukan. Pastikan nama sheet benar.' };
    }

    var startRow = 3; 
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    
    // Jika baris terakhir kurang dari 3, berarti data kosong
    if (lastRow < startRow) {
      return { data: [] }; 
    }
    
    var data = sheet.getRange(startRow, 1, lastRow - startRow + 1, lastColumn).getDisplayValues();
    return { data: data }; // Kirim kembali dalam bentuk Object
  } catch (e) {
    // Tangkap error jika terjadi masalah izin atau lainnya
    return { error: e.toString() };
  }
}
