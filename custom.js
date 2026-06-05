/**
 * FILE: custom.js - Tự động nhận diện nền tảng
 */

window.addEventListener('load', function() {
    console.log("🌸 Đã khởi tạo: Tự động nhận diện nguồn & sửa tên.");

    // 1. GHI ĐÈ HÀM TỰ NHẬN DIỆN NGUỒN (Lấy tên từ link)
    window.addSmartIdea = function() {
        let input = document.getElementById('input-idea');
        let url = input.value.trim();
        if (!url) return;

        let plat = "Khác";
        let username = "Chưa rõ";

        // Logic nhận diện
        try {
            let urlObj = new URL(url);
            let hostname = urlObj.hostname;
            let pathParts = urlObj.pathname.split('/').filter(p => p.length > 0);

            if (hostname.includes('threads.net')) {
                plat = "Threads";
                username = pathParts[0] ? pathParts[0].replace('@', '') : "User";
            } else if (hostname.includes('tiktok.com')) {
                plat = "TikTok";
                username = pathParts[0] ? pathParts[0].replace('@', '') : "User";
            } else if (hostname.includes('instagram.com')) {
                plat = "Instagram";
                username = pathParts[0] ? pathParts[0] : "User";
            } else if (hostname.includes('facebook.com')) {
                plat = "Facebook";
                username = "FB User";
            }
        } catch (e) {
            console.error("Link không hợp lệ");
        }

        // Gọi hàm gửi đi của index.html với username đã nhận diện
        sendToSheet("ideas", url, username); 
        input.value = '';
    };

    // 2. ÉP SỬA TÊN TÀI KHOẢN (Cho phép gõ trực tiếp)
    document.addEventListener('click', function(e) {
        if (e.target.closest('#list-ideas') && e.target.tagName === 'TD' && e.target.cellIndex === 3) {
            e.target.setAttribute('contenteditable', 'true');
            e.target.style.border = "2px solid #FF8B94";
        }
    });

    // 3. COPY DỮ LIỆU CHÍNH XÁC (Dù đã sửa tên vẫn copy đúng)
    window.copyToClipboard = function(text, row) {
        // Lấy tên hiện tại trong ô (đề phòng bạn đã sửa tên)
        let currentRow = row.closest('tr');
        let currentName = currentRow.cells[3].innerText;
        let finalStr = "Cre: " + currentName;
        
        navigator.clipboard.writeText(finalStr).then(() => {
            alert(`📋 Đã copy: "${finalStr}"`);
        });
    };
});
