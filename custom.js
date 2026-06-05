/**
 * FILE: custom-features.js
 * Tính năng: Copy "Cre:", Sửa tên tài khoản, Lịch ghi chú (Rê chuột hiện)
 */

// 1. TỰ ĐỘNG THÊM "Cre: " KHI COPY
window.copyToClipboard = function(text) {
    let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
    navigator.clipboard.writeText(finalStr).then(() => {
        alert(`📋 Đã copy: "${finalStr}"`);
    });
};

// 2. CHO PHÉP SỬA TÊN TÀI KHOẢN (Click vào là sửa được)
// Hàm này sẽ tự động gắn vào các ô tên khi web load xong
function enableNameEditing() {
    document.querySelectorAll('td').forEach(td => {
        if (td.innerText.includes("Nhấp sửa") || td.parentElement.parentElement.id === 'list-ideas') {
            td.setAttribute('contenteditable', 'true');
            td.classList.add('editable-cell');
            td.onblur = function() {
                // Tự động lưu tên sau khi sửa
                console.log("Tên mới đã lưu:", this.innerText);
                // Bạn có thể thêm hàm fetch gửi lên Sheet ở đây nếu cần
            };
        }
    });
}

// 3. XỬ LÝ LỊCH GHI CHÚ (Rê chuột hiện)
function initCalendarNotes() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;

    // Lắng nghe sự kiện để gắn title (hiện tooltip)
    calendarGrid.addEventListener('mouseover', (e) => {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let key = btn.innerText.split('\n')[0]; // Giả định lấy ngày từ nội dung
            let note = localStorage.getItem('note_' + key) || "Chưa có ghi chú";
            btn.setAttribute("title", "Ghi chú: " + note);
        }
    });
}

// Khởi chạy các tính năng mới
window.addEventListener('load', () => {
    enableNameEditing();
    initCalendarNotes();
});
