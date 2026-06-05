/**
 * FILE: custom.js
 * Tính năng: Copy "Cre:", Lịch ghi chú (Rê chuột hiện), Lưu ghi chú lên Sheet
 */

// 1. Nâng cấp Copy: Tự động thêm "Cre:"
window.copyToClipboard = function(text) {
    let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
    navigator.clipboard.writeText(finalStr).then(() => {
        alert(`📋 Đã copy: "${finalStr}"`);
    });
};

// 2. Lịch ghi chú (Dùng chung bộ nhớ và Sheet)
function initCalendarNotes() {
    // Gọi hàm này sau khi web đã load xong dữ liệu
    setTimeout(() => {
        const calendarButtons = document.querySelectorAll('.cal-btn');
        calendarButtons.forEach(btn => {
            // Khi di chuột qua ô lịch, nó tự hiện title là nội dung ghi chú
            // (Title này đã được cập nhật từ hàm render của bạn)
            btn.addEventListener('mouseenter', function() {
                console.log("Rê chuột qua ngày:", this.innerText);
            });
        });
    }, 2000);
}

// 3. Hàm ghi đè để chỉnh sửa ghi chú trực tiếp
window.updateCalendarNote = function(key, currentNote) {
    let input = prompt("Nhập ghi chú cho ngày " + key + ":", currentNote || "");
    if(input !== null) {
        // Lưu vào bộ nhớ trình duyệt
        let notes = JSON.parse(localStorage.getItem('hy_calendar_notes')) || {};
        notes[key] = input;
        localStorage.setItem('hy_calendar_notes', JSON.stringify(notes));
        
        // Gửi lên Sheet
        fetch(SHEET_API_URL, {
            method: "POST", mode: "no-cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({action: "updateNote", date: key, note: input})
        }).then(() => {
            alert("Đã lưu ghi chú lên Sheet!");
            location.reload(); // F5 để cập nhật
        });
    }
};

// Tự động khởi tạo sau khi web load xong
window.addEventListener('load', initCalendarNotes);
