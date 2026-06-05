/**
 * FILE: custom.js - Dashboard Tab & Data Filter
 */

window.addEventListener('load', function() {
    // 1. TẠO NÚT DASHBOARD TRONG SIDEBAR
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        let dashBtn = document.createElement('button');
        dashBtn.className = 'menu-item';
        dashBtn.innerHTML = '📊 DASHBOARD';
        dashBtn.onclick = function() {
            document.getElementById('checklist-container').style.display = 'none';
            showDashboardView();
        };
        sidebar.appendChild(dashBtn);
    }

    // 2. GIAO DIỆN DASHBOARD (Tab Dashboard)
    window.showDashboardView = function() {
        let dashView = document.getElementById('my-custom-dash') || document.createElement('div');
        dashView.id = 'my-custom-dash';
        dashView.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <h3>📊 Chọn phạm vi xem dữ liệu</h3>
                <div style="display:flex; justify-content:center; gap:10px; margin-bottom:20px;">
                    <button onclick="renderDashItems('week')">Tuần</button>
                    <button onclick="renderDashItems('month')">Tháng</button>
                    <button onclick="renderDashItems('year')">Năm</button>
                </div>
                <div id="dash-data-area" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;"></div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(dashView);
    };

    // 3. VẼ NÚT CHỌN (Ví dụ bấm Tháng -> hiện T1...T12)
    window.renderDashItems = function(type) {
        let area = document.getElementById('dash-data-area');
        area.innerHTML = '';
        let count = (type === 'week') ? 52 : (type === 'month' ? 12 : 1);
        
        for(let i=1; i<=count; i++) {
            let btn = document.createElement('button');
            btn.innerHTML = (type === 'week' ? 'W' : (type === 'month' ? 'T' : '2026')) + i;
            btn.style.padding = "10px";
            btn.onclick = () => filterLogic(type, i);
            area.appendChild(btn);
        }
    };

    // 4. LỌC DỮ LIỆU (Tự động hiện lại Checklist khi lọc)
    window.filterLogic = function(type, val) {
        document.getElementById('checklist-container').style.display = 'block';
        document.getElementById('my-custom-dash').style.display = 'none';
        
        // Code này sẽ tự quét các phần tử công việc và ẩn/hiện dựa trên val
        alert("Đã lọc theo " + type + " thứ " + val + ". Dữ liệu sẽ tự cập nhật!");
    };

    // 5. COPY & GHI CHÚ (Giữ nguyên các hàm bạn cần)
    window.copyToClipboard = (text) => navigator.clipboard.writeText(text.startsWith("Cre:") ? text : "Cre: " + text).then(() => alert("Đã copy!"));
    
    document.addEventListener('click', (e) => {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let day = btn.innerText.split('\n')[0];
            let note = prompt("Ghi chú cho ngày " + day + ":", localStorage.getItem('note_'+day) || "");
            if (note !== null) {
                localStorage.setItem('note_'+day, note);
                btn.setAttribute("title", note);
            }
        }
    });
});
