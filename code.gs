function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('🌸 HY HY WORKSPACE 2026 🌸')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function initSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName("Lich_TienDo")) {
    var sheet1 = ss.insertSheet("Lich_TienDo");
    sheet1.appendRow(["NgayKey", "DuLieuJSON"]);
  }
  if (!ss.getSheetByName("Kho_TaiNguyen")) {
    var sheet2 = ss.insertSheet("Kho_TaiNguyen");
    sheet2.appendRow(["ID", "Link", "Platform", "Account", "Cre", "Checked"]);
  }
  if (!ss.getSheetByName("Bai_DaDang")) {
    var sheet3 = ss.insertSheet("Bai_DaDang");
    sheet3.appendRow(["ID", "Link", "Platform"]);
  }
}

function getAllDataFromSheets() {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetLich = ss.getSheetByName("Lich_TienDo");
  var rowsLich = sheetLich.getDataRange().getValues();
  var db = {};
  for (var i = 1; i < rowsLich.length; i++) {
    if (rowsLich[i][0]) {
      try { 
        db[rowsLich[i][0]] = JSON.parse(rowsLich[i][1]); 
      } catch(e) { 
        db[rowsLich[i][0]] = { tasks: {}, customs: {}, note: '' }; 
      }
    }
  }
  
  var sheetRes = ss.getSheetByName("Kho_TaiNguyen");
  var rowsRes = sheetRes.getDataRange().getValues();
  var resources = [];
  for (var j = 1; j < rowsRes.length; j++) {
    if (rowsRes[j][0]) {
      resources.push({ 
        id: rowsRes[j][0], 
        link: rowsRes[j][1], 
        platform: rowsRes[j][2], 
        account: rowsRes[j][3], 
        cre: rowsRes[j][4], 
        checked: rowsRes[j][5] === "TRUE" || rowsRes[j][5] === true || rowsRes[j][5] === "true"
      });
    }
  }

  var sheetPost = ss.getSheetByName("Bai_DaDang");
  var rowsPost = sheetPost.getDataRange().getValues();
  var posts = [];
  for (var k = 1; k < rowsPost.length; k++) {
    if (rowsPost[k][0]) {
      posts.push({ 
        id: rowsPost[k][0], 
        link: rowsPost[k][1], 
        platform: rowsPost[k][2] 
      });
    }
  }
  
  return { db: db, resources: resources, posts: posts };
}

function saveLichToSheet(dateKey, dayDataObj) {
  initSheets();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lich_TienDo");
  var data = sheet.getDataRange().getValues();
  var foundRow = -1;
  for (var i = 1; i < data.length; i++) { 
    if (data[i][0] == dateKey) { foundRow = i + 1; break; } 
  }
  if (foundRow !== -1) { 
    sheet.getRange(foundRow, 2).setValue(JSON.stringify(dayDataObj)); 
  } else { 
    sheet.appendRow([dateKey, JSON.stringify(dayDataObj)]); 
  }
}

function saveResourcesToSheet(resourcesArray) {
  initSheets();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Kho_TaiNguyen");
  sheet.clearContents(); 
  sheet.appendRow(["ID", "Link", "Platform", "Account", "Cre", "Checked"]);
  if (resourcesArray && resourcesArray.length > 0) {
    var rowsToAppend = [];
    for (var i = 0; i < resourcesArray.length; i++) { 
      var r = resourcesArray[i]; 
      rowsToAppend.push([r.id, r.link, r.platform, r.account, r.cre, r.checked]); 
    }
    sheet.getRange(2, 1, rowsToAppend.length, 6).setValues(rowsToAppend);
  }
}

function savePostsToSheet(postsArray) {
  initSheets();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bai_DaDang");
  sheet.clearContents(); 
  sheet.appendRow(["ID", "Link", "Platform"]);
  if (postsArray && postsArray.length > 0) {
    var rowsToAppend = [];
    for (var i = 0; i < postsArray.length; i++) { 
      var p = postsArray[i]; 
      rowsToAppend.push([p.id, p.link, p.platform]); 
    }
    sheet.getRange(2, 1, rowsToAppend.length, 3).setValues(rowsToAppend);
  }
}

function restoreAllSheetsData(db, resources, posts) {
  initSheets();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetLich = ss.getSheetByName("Lich_TienDo");
  sheetLich.clearContents();
  sheetLich.appendRow(["NgayKey", "DuLieuJSON"]);
  for (var key in db) {
    sheetLich.appendRow([key, JSON.stringify(db[key])]);
  }
  
  saveResourcesToSheet(resources);
  savePostsToSheet(posts);
}

function clearAllSheetsData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var names = ["Lich_TienDo", "Kho_TaiNguyen", "Bai_DaDang"];
  var headers = [["NgayKey", "DuLieuJSON"], ["ID", "Link", "Platform", "Account", "Cre", "Checked"], ["ID", "Link", "Platform"]];
  for (var i = 0; i < names.length; i++) {
    var s = ss.getSheetByName(names[i]);
    if (s) { s.clearContents(); s.appendRow(headers[i]); }
  }
}
