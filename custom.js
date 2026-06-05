/**
 * FILE: custom.js (Bản cuối cùng - Dọn dẹp & Ép sửa tên)
 */

window.addEventListener('load', function() {
    // 1. TỰ ĐỘNG XÓA DASHBOARD (Nếu nó tồn tại)
    let dashBar = document.getElementById('dash-filter-bar');
    if(dashBar) dashBar.remove();

    // 2. TÍNH NĂNG COPY "Cre:"
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 3. GHI CHÚ LỊCH
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let dayText = btn.innerText.split('\n')[0];
            let note = prompt("Nhập ghi chú cho ngày " + dayText + ":", localStorage.getItem('note_'+dayText) || "");
            if (note !== null) {
                localStorage.setItem('note_'+dayText, note);
                btn.setAttribute("title", note);
            }
        }
    });

    // 4. ÉP SỬA TÊN TÀI KHOẢN (Bảng Bài lưu)
    // Dùng kỹ thuật kiểm tra sự kiện click trực tiếp để không bị xung đột
    document.addEventListener('click', function(e) {
        let target = e.target;
        // Kiểm tra xem có phải là ô td trong bảng bài lưu không
        if (target.closest('#list-ideas') && target.tagName === 'TD') {
            // Chỉ cho phép sửa cột thứ 4 (tên tài khoản)
            if (target.cellIndex === 3) {
                target.setAttribute('contenteditable', 'true');
                target.style.backgroundColor = "#FFF9F9";
                target.style.border = "1px solid #FFB7B2";
                target.focus();
            }
        }
    });
});
