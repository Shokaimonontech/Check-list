/**
 * FILE: custom.js
 */
window.addEventListener('load', function() {
    console.log("🌸 Custom script đã khởi chạy...");

    // 1. COPY CÓ "Cre:"
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 2. GHI CHÚ LỊCH (Bấm vào ô lịch -> nhập)
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let dayText = btn.querySelector('.cal-solar') ? btn.querySelector('.cal-solar').innerText : btn.innerText.split('\n')[0];
            let note = prompt("Nhập ghi chú cho ngày " + dayText + ":", localStorage.getItem('note_'+dayText) || "");
            if (note !== null) {
                localStorage.setItem('note_'+dayText, note);
                btn.setAttribute("title", note);
                btn.style.border = "2px dashed #FF8B94";
            }
        }
    });

    // 3. SỬA TÊN TÀI KHOẢN (Bảng Bài lưu)
    // Tự động quét bảng mỗi 1 giây
    setInterval(function() {
        const ideas = document.getElementById('list-ideas');
        if (ideas) {
            ideas.querySelectorAll('td').forEach(td => {
                // Ô thứ 3 (index 3) là tên tài khoản trong bảng Ý tưởng
                if (td.cellIndex === 3 && !td.hasAttribute('contenteditable')) {
                    td.setAttribute('contenteditable', 'true');
                    td.style.backgroundColor = "#FFF9F9";
                    td.style.border = "1px solid #FFB7B2";
                }
            });
        }
    }, 1000);
});
