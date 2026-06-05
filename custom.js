/**
 * FILE: custom.js (Sửa lỗi: Ép buộc sửa tên tài khoản)
 */

window.addEventListener('load', function() {
    console.log("🌸 Đang khởi chạy tính năng sửa tên...");

    // 1. TÍNH NĂNG COPY (Giữ nguyên)
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 2. GHI CHÚ LỊCH (Giữ nguyên)
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let dayText = btn.querySelector('.cal-solar') ? btn.querySelector('.cal-solar').innerText : btn.innerText.split('\n')[0];
            let key = "note_" + dayText;
            let note = prompt("Nhập ghi chú cho ngày " + dayText + ":", localStorage.getItem(key) || "");
            if (note !== null) {
                localStorage.setItem(key, note);
                btn.setAttribute("title", note);
                btn.style.border = "2px dashed #FF8B94";
            }
        }
    });

    // 3. SỬA TÊN TÀI KHOẢN (Phiên bản quét toàn diện)
    // Dùng kỹ thuật quét mỗi 500ms để đảm bảo không bỏ sót bất kỳ bảng nào
    setInterval(function() {
        // Quét tất cả các ô td trong trang
        document.querySelectorAll('td').forEach(td => {
            // Nếu ô đó chứa chữ "Nhấp sửa" hoặc nằm trong bảng Tài nguyên
            if (td.innerText.includes("Nhấp sửa") || td.closest('.remote-table')) {
                if (!td.hasAttribute('contenteditable')) {
                    td.setAttribute('contenteditable', 'true');
                    td.style.backgroundColor = "#FFF9F9";
                    td.style.border = "1px solid #FFB7B2";
                    td.style.cursor = "text";
                    
                    // Ghi lại sự kiện khi sửa xong
                    td.onblur = function() {
                        console.log("Đã sửa tên thành:", this.innerText);
                    };
                }
            }
        });
    }, 500); 
});
