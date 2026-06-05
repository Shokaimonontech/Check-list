/**
 * FILE: custom.js (Bản tích hợp 2 chiều)
 */

window.addEventListener('load', function() {
    
    // 1. TỰ ĐỘNG THÊM "Cre:" KHI COPY
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 2. SỬA TÊN TÀI KHOẢN (ĐẨY VỀ SHEET)
    // Dùng kỹ thuật tìm kiếm ô có viền hồng hoặc nằm trong bảng
    document.addEventListener('blur', function(e) {
        let target = e.target;
        if (target.closest('#list-ideas') || target.closest('#list-remotes')) {
            let newName = target.innerText.trim();
            // Đẩy lên Sheet
            fetch(SHEET_API_URL, {
                method: "POST", mode: "no-cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ action: "updateName", newName: newName }) 
            });
        }
    }, true);

    // 3. GHI CHÚ LỊCH (ĐẨY VỀ SHEET)
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let dayText = btn.innerText.split('\n')[0];
            let input = prompt("Ghi chú cho ngày " + dayText + ":");
            if (input !== null) {
                // Đẩy lên Sheet ngay lập tức
                fetch(SHEET_API_URL, {
                    method: "POST", mode: "no-cors",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ action: "updateNote", date: dayText, note: input })
                });
                btn.setAttribute("title", "Ghi chú: " + input);
                btn.style.border = "2px dashed #FF8B94";
            }
        }
    });
});
