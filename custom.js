/**
 * FILE: custom.js - Tự vận hành mà KHÔNG sửa index.html
 */

window.addEventListener('load', function() {
    
    // 1. TỰ ĐỘNG XÓA DASHBOARD (Nếu nó tồn tại)
    setInterval(() => {
        let dbBox = document.getElementById('dashboard-box');
        if (dbBox && dbBox.style.display !== 'none') {
            dbBox.style.display = 'none';
        }
    }, 500);

    // 2. ÉP SỬA TÊN TÀI KHOẢN (Quét bảng Bài lưu)
    setInterval(() => {
        let table = document.getElementById('list-ideas');
        if (table) {
            table.querySelectorAll('td').forEach(td => {
                // Ô tên tài khoản nằm ở cột 4 (index 3)
                if (td.cellIndex === 3 && !td.hasAttribute('contenteditable')) {
                    td.setAttribute('contenteditable', 'true');
                    td.style.backgroundColor = "#FFF9F9";
                    td.style.border = "1px solid #FFB7B2";
                    td.title = "Click để sửa tên";
                }
            });
        }
    }, 1000);

    // 3. TÍNH NĂNG COPY (Giữ nguyên)
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 4. GHI CHÚ LỊCH
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let day = btn.innerText.split('\n')[0];
            let note = prompt("Ghi chú ngày " + day + ":", localStorage.getItem('note_'+day) || "");
            if (note !== null) {
                localStorage.setItem('note_'+day, note);
                btn.setAttribute("title", note);
            }
        }
    });
});
