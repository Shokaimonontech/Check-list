/**
 * FILE: custom.js (Bản sửa lỗi nhận diện & sửa tên)
 */

window.addEventListener('load', function() {
    // 1. GHI ĐÈ HÀM THÊM Ý TƯỞNG (Tự nhận diện Threads, TikTok, FB, Insta)
    window.addSmartIdea = function() {
        let input = document.getElementById('input-idea');
        let url = input.value.trim();
        if (!url) return;

        let plat = "Khác";
        let username = "Nhấp sửa tên TK";

        try {
            let u = new URL(url);
            let h = u.hostname.toLowerCase();
            let p = u.pathname.split('/').filter(x => x);
            
            if (h.includes('threads.net')) { plat = "Threads"; username = p[0] ? p[0].replace('@','') : "ThreadsUser"; }
            else if (h.includes('tiktok.com')) { plat = "TikTok"; username = p[0] ? p[0].replace('@','') : "TikTokUser"; }
            else if (h.includes('instagram.com')) { plat = "Instagram"; username = p[0] ? p[0] : "InstaUser"; }
            else if (h.includes('facebook.com')) { plat = "Facebook"; username = "FBUser"; }
        } catch(e) { console.log("Lỗi nhận diện link"); }

        // Gọi hàm gửi gốc trong index.html
        sendToSheet("ideas", url, username); 
        input.value = '';
    };

    // 2. MỞ KHÓA SỬA TÊN BẢNG (Dùng MutationObserver để quét bảng liên tục)
    const observer = new MutationObserver(() => {
        let cells = document.querySelectorAll('#list-ideas td');
        cells.forEach(td => {
            // Cột số 4 là cột Tên tài khoản
            if (td.cellIndex === 3 && !td.hasAttribute('contenteditable')) {
                td.setAttribute('contenteditable', 'true');
                td.style.border = "2px dashed #FF8B94";
                td.style.backgroundColor = "#FFF9F9";
                
                // Lưu lại khi sửa xong
                td.addEventListener('blur', function() {
                    console.log("Đã sửa tên thành:", this.innerText);
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 3. COPY "Cre:" CHÍNH XÁC (Dù bạn đã sửa tên, nó vẫn lấy tên mới)
    window.copyToClipboard = function(text, btnElement) {
        // Lấy tên từ ô td thứ 4 trong cùng hàng với nút bấm copy
        let row = btnElement.closest('tr');
        let currentName = row.cells[3].innerText;
        let finalStr = "Cre: " + currentName;
        
        navigator.clipboard.writeText(finalStr).then(() => {
            alert(`📋 Đã copy: "${finalStr}"`);
        });
    };
});
