/**
 * FILE: custom.js (Tất cả trong một)
 */

window.addEventListener('load', function() {
    console.log("🌸 Hệ thống HY HY Workspace đã sẵn sàng!");

    // 1. TÍNH NĂNG COPY (Tự thêm Cre:)
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 2. DASHBOARD ĐIỀU HƯỚNG (Tuần - Tháng - Năm)
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        sidebar.innerHTML = `
            <button class="menu-item" onclick="switchView('today')">✨ Hôm Nay</button>
            <div style="margin: 10px 0; border-top: 2px solid #FFB7B2;"></div>
            <div style="text-align:center; font-weight:bold; color:#d63384;">📊 DASHBOARD</div>
            <div style="display:flex; flex-direction:column; gap:5px; margin-top:5px;">
                <button class="menu-item" onclick="showDash('week')">🗓️ Xem Theo Tuần</button>
                <button class="menu-item" onclick="showDash('month')">📅 Xem Theo Tháng</button>
                <button class="menu-item" onclick="showDash('year')">📊 Xem Cả Năm</button>
            </div>
        `;
    }

    // 3. LOGIC XỬ LÝ DASHBOARD & SỬA TÊN & GHI CHÚ LỊCH
    window.showDash = function(type) {
        let val = prompt("Nhập " + (type === 'week' ? "số tuần" : "tháng") + " bạn muốn xem:", "1");
        if(val) {
            document.getElementById('main-title').innerText = "📊 DASHBOARD " + type.toUpperCase() + " " + val;
            alert("Đã chuyển sang chế độ lọc: " + type + " " + val);
            // Bạn có thể thêm hàm filter dữ liệu tại đây
        }
    };

    // 4. GHI CHÚ LỊCH & SỬA TÊN (Tự quét mỗi 1 giây để đảm bảo luôn chạy)
    setInterval(function() {
        // Ghi chú lịch
        const calGrid = document.getElementById('calendar-grid');
        if(calGrid && !calGrid.hasAttribute('data-ready')) {
            calGrid.addEventListener('click', function(e) {
                let btn = e.target.closest('.cal-btn');
                if(btn) {
                    let day = btn.innerText.split('\n')[0];
                    let note = prompt("Ghi chú ngày " + day + ":", localStorage.getItem('note_'+day) || "");
                    if(note !== null) {
                        localStorage.setItem('note_'+day, note);
                        btn.setAttribute("title", note);
                        btn.style.border = "2px dashed #FF8B94";
                    }
                }
            });
            calGrid.setAttribute('data-ready', 'true');
        }

        // Sửa tên tài khoản
        document.querySelectorAll('#list-ideas td, #list-remotes td').forEach(td => {
            if((td.cellIndex === 3 || td.cellIndex === 2) && !td.hasAttribute('contenteditable')) {
                td.setAttribute('contenteditable', 'true');
                td.style.backgroundColor = "#FFF9F9";
                td.style.border = "1px solid #FFB7B2";
            }
        });
    }, 1000);
});
