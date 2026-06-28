function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Ép kiểu dữ liệu nhận được thành chuỗi văn bản thuần túy và cắt khoảng trắng
    var rawPhone = data.phone ? String(data.phone).replace(/\D/g, '').trim() : "";
    var lastFourDigits = rawPhone.length >= 4 ? rawPhone.slice(-4) : "0000";
    
    // Cấu trúc tên thư mục mới
    var folderName = data.stt + " - " + data.name + " - " + data.room + " - " + lastFourDigits;
    
    var parentFolderId = "1OhF7lDYfy3sIdm9g0qMfBgxjtA6OHkAr"; 
    var parentFolder = DriveApp.getFolderById(parentFolderId);
    var newFolder = parentFolder.createFolder(folderName);
    
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
