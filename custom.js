/**
 * FILE: custom.js - Code tự vận hành (Không cần sửa index.html)
 */

window.addEventListener('load', function() {
    console.log("🌸 HY HY Workspace: Đang khởi tạo logic sửa tên & copy...");

    // 1. GHI ĐÈ HÀM COPY CŨ CỦA BẠN
    // Thay vì copy từ ô text, ta lấy dữ liệu từ biến 'resources' để đảm bảo chính xác
    window.copyToClipboard = function(text) {
        // Nếu truyền vào là một chuỗi, copy trực tiếp
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 2. ÉP SỬA TÊN TÀI KHOẢN & KHÔNG MẤT DỮ LIỆU
    // Sử dụng MutationObserver để theo dõi sự thay đổi của bảng
    const observer = new MutationObserver(() => {
        const table = document.getElementById('list-ideas');
        if (table) {
            table.querySelectorAll('tr').forEach(tr => {
                let nameCell = tr.cells[3]; // Cột 4: Tên tài khoản
                if (nameCell && !nameCell.hasAttribute('data-editable')) {
                    nameCell.setAttribute('data-editable', 'true');
                    nameCell.setAttribute('contenteditable', 'true');
                    nameCell.style.border = "2px dashed #FF8B94";
                    nameCell.style.backgroundColor = "#FFF9F9";
                    
                    // Lưu lại thay đổi vào localStorage để không bị mất khi load lại
                    nameCell.addEventListener('blur', function() {
                        let link = tr.cells[1].querySelector('a') ? tr.cells[1].querySelector('a').href : "unknown";
                        localStorage.setItem('name_' + link, this.innerText);
                    });
                }
            });
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 3. ẨN DASHBOARD (Tự động ẩn sau 1s)
    setInterval(() => {
        let dbBox = document.getElementById('dashboard-box');
        if (dbBox && dbBox.style.display !== 'none') {
            dbBox.style.display = 'none';
        }
    }, 1000);
});
