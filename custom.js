/**
 * FILE: custom.js - Tự động nhận diện Threads và các nền tảng
 */

window.addEventListener('load', function() {
    // 1. TỰ ĐỘNG NHẬN DIỆN & GHI ĐÈ HÀM CŨ
    // Chúng ta lưu lại hàm gốc để vẫn sử dụng được logic thêm vào Sheet
    const oldAddSmartIdea = window.addSmartIdea;

    window.addSmartIdea = function() {
        let input = document.getElementById('input-idea');
        let url = input.value.trim();
        if (!url) return;

        let plat = "Khác";
        let username = "Nhấp sửa tên TK";

        // Logic nhận diện thông minh
        try {
            let urlObj = new URL(url);
            let hostname = urlObj.hostname.toLowerCase();
            let pathname = urlObj.pathname.split('/').filter(p => p.length > 0);

            if (hostname.includes('threads.net') || hostname.includes('threads.com')) {
                plat = "Threads";
                username = pathname[0] ? pathname[0].replace('@', '') : "ThreadsUser";
            } else if (hostname.includes('tiktok.com')) {
                plat = "TikTok";
                username = pathname[0] ? pathname[0].replace('@', '') : "TikTokUser";
            } else if (hostname.includes('instagram.com')) {
                plat = "Instagram";
                username = pathname[0] ? pathname[0] : "InstaUser";
            } else if (hostname.includes('facebook.com')) {
                plat = "Facebook";
                username = "FacebookUser";
            }

            // Sau khi nhận diện, ta tự điền vào input hoặc gọi hàm gửi đi
            // Ở đây ta gọi hàm gửi dữ liệu của bạn, nhưng với giá trị đã được nhận diện
            sendToSheet("ideas", url, username);
            input.value = '';
            
            // Cập nhật lại giao diện ngay sau khi thêm
            setTimeout(renderResources, 500);
            
        } catch (e) {
            console.error("Link không hợp lệ", e);
        }
    };

    // 2. ÉP SỬA TÊN KHÔNG MẤT DỮ LIỆU
    document.addEventListener('blur', function(e) {
        if (e.target.closest('#list-ideas') && e.target.tagName === 'TD' && e.target.cellIndex === 3) {
            // Khi bạn gõ xong, dữ liệu tự được lưu vào thuộc tính của thẻ,
            // renderResources của bạn sẽ tự lấy giá trị này khi load lại.
            e.target.setAttribute('contenteditable', 'true');
        }
    }, true);
    
    // 3. ẨN DASHBOARD
    setInterval(() => {
        let db = document.getElementById('dashboard-box');
        if(db && db.style.display !== 'none') db.style.display = 'none';
    }, 500);
});
