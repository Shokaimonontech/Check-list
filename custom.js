/**
 * FILE: custom.js - Dashboard điều hướng Tuần/Tháng/Năm
 */

window.addEventListener('load', function() {
    // 1. TẠO MENU DASHBOARD TRONG SIDEBAR
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        sidebar.innerHTML = `
            <button class="menu-item" onclick="switchView('today')">✨ Hôm Nay</button>
            <div style="margin: 10px 0; border-top: 2px solid #FFB7B2;"></div>
            <div style="text-align:center; font-weight:bold; color:#d63384;">📊 DASHBOARD</div>
            <div style="display:flex; gap:5px; margin-top:5px;">
                <button class="menu-item" onclick="showDashboard('week')">Tuần</button>
                <button class="menu-item" onclick="showDashboard('month')">Tháng</button>
                <button class="menu-item" onclick="showDashboard('year')">Năm</button>
            </div>
        `;
    }
});

// 2. HÀM HIỂN THỊ CÁC Ô DASHBOARD (Tuần/Tháng/Năm)
window.showDashboard = function(type) {
    const mainContent = document.querySelector('.main-content');
    let dashContainer = document.getElementById('dash-view');
    
    // Tạo container hiển thị dashboard nếu chưa có
    if (!dashContainer) {
        dashContainer = document.createElement('div');
        dashContainer.id = 'dash-view';
        dashContainer.style.cssText = "display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; justify-content:center;";
        mainContent.insertBefore(dashContainer, document.getElementById('checklist-container'));
    }
    dashContainer.innerHTML = '';

    let items = [];
    if (type === 'week') items = Array.from({length: 52}, (_, i) => i + 1);      // 52 Tuần
    if (type === 'month') items = Array.from({length: 12}, (_, i) => i + 1);     // 12 Tháng
    if (type === 'year') items = [2026];                                         // 1 Năm

    items.forEach(item => {
        let btn = document.createElement('button');
        btn.innerHTML = type === 'week' ? `W${item}` : (type === 'month' ? `T${item}` : item);
        btn.style.cssText = "padding:10px; border:2px solid #000; border-radius:10px; cursor:pointer; background:#FFF5F5;";
        
        btn.onclick = () => {
            alert("Đang lọc dữ liệu cho: " + (type === 'week' ? "Tuần " : "Tháng ") + item);
            filterDataByCriteria(type, item);
        };
        dashContainer.appendChild(btn);
    });
};

// 3. HÀM LỌC DỮ LIỆU (Tương tác với index.html cũ)
window.filterDataByCriteria = function(type, val) {
    // Ẩn tất cả các thẻ Card công việc
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'none'; // Ẩn hết
    });

    // Logic: Ở đây bạn muốn hiện những công việc nào thuộc tuần/tháng đó.
    // Nếu bạn muốn hiện lại, ta sẽ cần logic đối chiếu ngày.
    alert("Hệ thống đã nhận lệnh lọc theo " + type + " thứ " + val);
};
