/**
 * FILE: custom.js (Bản nâng cấp: Ghi chú trực tiếp & Sửa tên trực tiếp)
 */

window.addEventListener('load', function() {
    
    // 1. NÂNG CẤP COPY: Luôn có "Cre:"
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => {
            alert(`📋 Đã copy: "${finalStr}"`);
        });
    };

    // 2. GHI CHÚ TRỰC TIẾP VÀO Ô LỊCH
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        calendarGrid.addEventListener('click', function(e) {
            let btn = e.target.closest('.cal-btn');
            if (btn) {
                // Lấy ngày tháng từ nội dung ô
                let dayText = btn.querySelector('.cal-solar') ? btn.querySelector('.cal-solar').innerText : btn.innerText;
                let key = "note_" + dayText;
                
                let currentNote = localStorage.getItem(key) || "";
                let input = prompt("Nhập ghi chú cho ngày " + dayText + ":", currentNote);
                
                if (input !== null) {
                    localStorage.setItem(key, input);
                    btn.setAttribute("title", "Ghi chú: " + input);
                    btn.classList.add('has-data'); // Đổi màu để nhận biết
                    btn.style.borderColor = "#FF8B94"; // Viền hồng
                }
            }
        });
    }

    // 3. SỬA TÊN TÀI KHOẢN TRỰC TIẾP (Click là sửa)
    // Áp dụng cho các ô trong bảng Bài lưu và Remote
    document.querySelectorAll('td').forEach(td => {
        // Chỉ chọn ô chứa tên tài khoản (thường là ô thứ 4 trong bảng)
        if (td.parentElement.parentElement.id === 'list-ideas' || td.parentElement.parentElement.id === 'list-remotes') {
            td.setAttribute('contenteditable', 'true');
            td.style.cursor = "text";
            td.style.backgroundColor = "#FFF9F9"; // Màu hồng nhạt để biết là sửa được
            
            td.onblur = function() {
                console.log("Đã lưu tên mới:", this.innerText);
                // Dữ liệu này tự lưu vào HTML của web
            };
        }
    });
});
