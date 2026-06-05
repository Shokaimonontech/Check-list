/**
 * FILE: custom.js (Bản Dashboard Tab)
 */

window.addEventListener('load', function() {
    
    // 1. TẠO NÚT DASHBOARD TRONG SIDEBAR
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        // Chèn nút Dashboard vào sidebar
        let dashBtn = document.createElement('button');
        dashBtn.className = 'menu-item';
        dashBtn.innerHTML = '📊 DASHBOARD';
        dashBtn.onclick = showDashboardView;
        sidebar.appendChild(dashBtn);
    }

    // 2. LOGIC CHUYỂN ĐỔI GIAO DIỆN
    window.showDashboardView = function() {
        // Ẩn nội dung cũ
        document.getElementById('checklist-container').style.display = 'none';
        
        // Tạo hoặc lấy Dashboard View
        let dashView = document.getElementById('my-custom-dash');
        if (!dashView) {
            dashView = document.createElement('div');
            dashView.id = 'my-custom-dash';
            dashView.style.cssText = "padding:20px; text-align:center;";
            document.querySelector('.main-content').appendChild(dashView);
        }
        dashView.style.display = 'block';

        // Vẽ menu Tuần/Tháng/Năm ngang hàng
        dashView.innerHTML = `
            <div style="display:flex; justify-content:center; gap:10px; margin-bottom:20px;">
                <button onclick="renderDashItems('week')" style="padding:10px 20px; border:2px solid #000; border-radius:15px; cursor:pointer;">Tuần</button>
                <button onclick="renderDashItems('month')" style="padding:10px 20px; border:2px solid #000; border-radius:15px; cursor:pointer;">Tháng</button>
                <button onclick="renderDashItems('year')" style="padding:10px 20px; border:2px solid #000; border-radius:15px; cursor:pointer;">Năm</button>
            </div>
            <div id="dash-data-area" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;"></div>
        `;
    };

    // 3. VẼ CÁC Ô ĐỂ CHỌN (Ví dụ bấm Tháng -> hiện T1...T12)
    window.renderDashItems = function(type) {
        let area = document.getElementById('dash-data-area');
        area.innerHTML = '';
        let count = (type === 'week') ? 52 : (type === 'month' ? 12 : 1);
        
        for(let i=1; i<=count; i++) {
            let btn = document.createElement('button');
            btn.innerHTML = (type === 'week' ? 'W' : (type === 'month' ? 'T' : '2026')) + i;
            btn.style.cssText = "padding:15px; border:2px solid #000; border-radius:10px; cursor:pointer; background:#FFF5F5;";
            btn.onclick = () => alert("Đang hiện dữ liệu: " + type + " " + i);
            area.appendChild(btn);
        }
    };

    // 4. CÁC TÍNH NĂNG CŨ (Copy Cre, Sửa tên, Ghi chú lịch)
    // Giữ nguyên các hàm Copy, Ghi chú, Sửa tên như đoạn code trước tôi đã gửi.
    // ... (bạn copy thêm các hàm đó vào dưới đây) ...
});
