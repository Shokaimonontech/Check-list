/**
 * FILE: custom.js
 * Tính năng: Copy "Cre:", Sửa tên tài khoản, Ghi chú lịch
 */

window.addEventListener('load', function() {
    console.log("🌸 Custom script đã khởi chạy...");

    // 1. NÂNG CẤP COPY: Luôn có "Cre:"
    // Ghi đè hàm copy cũ bằng hàm mới
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => {
            alert(`📋 Đã copy: "${finalStr}"`);
        });
    };

    // 2. TÍNH NĂNG SỬA TÊN TÀI KHOẢN (Cho phần Chuẩn bị dịch)
    // Tự động tìm các ô chứa tên tài khoản trong bảng tài nguyên
    function enableNameEditing() {
        const rows = document.querySelectorAll('#list-ideas tr');
        rows.forEach(tr => {
            let nameCell = tr.cells[3]; // Cột 4 (Tên tài khoản)
            if (nameCell) {
                nameCell.setAttribute('contenteditable', 'true');
                nameCell.style.border = "1px dashed #FF8B94";
                nameCell.onblur = function() {
                    console.log("Tên mới:", this.innerText);
                    // Ở đây nếu muốn lưu thẳng lên Sheet bạn thêm lệnh fetch sau
                };
            }
        });
    }
    enableNameEditing();

    // 3. TÍNH NĂNG LỊCH CÓ GHI CHÚ
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        calendarGrid.addEventListener('click', function(e) {
            let btn = e.target.closest('.cal-btn');
            if (btn) {
                // Lấy ngày từ ô lịch
                let datePart = btn.innerText.split('\n')[0]; 
                let key = formatDateKey(new Date()) + "-" + datePart; // Tạo key duy nhất
                
                let currentNote = localStorage.getItem('note_' + key) || "";
                let input = prompt("Nhập ghi chú cho ngày " + datePart + ":", currentNote);
                
                if (input !== null) {
                    localStorage.setItem('note_' + key, input);
                    btn.setAttribute("title", "Ghi chú: " + input);
                    btn.style.backgroundColor = "#FFD1DC"; // Đổi màu khi có ghi chú
                }
            }
        });
    }
});

// Hàm hỗ trợ format ngày
function formatDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
