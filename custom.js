/**
 * FILE: custom.js - Dashboard chọn tuần/tháng/năm
 */

window.addEventListener('load', function() {
    // 1. BIẾN MENU CŨ THÀNH BẢNG CHỌN DASHBOARD
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        sidebar.innerHTML = `
            <div style="padding:10px; font-weight:bold; color:#d63384;">📊 CHỌN DASHBOARD</div>
            <select id="dash-select" class="menu-item" onchange="filterDataByTime(this.value)">
                <option value="today">✨ Hôm Nay</option>
                <option value="week">🗓️ Theo Tuần (Chọn tuần)</option>
                <option value="month">📅 Theo Tháng (Chọn tháng)</option>
                <option value="year">📊 Cả Năm 2026</option>
            </select>
        `;
    }
});

// 2. HÀM LỌC DỮ LIỆU KHI CHỌN DASHBOARD
window.filterDataByTime = function(mode) {
    let container = document.getElementById('checklist-container');
    
    if (mode === 'week') {
        let w = prompt("Nhập số tuần (1-52):", "1");
        if(!w) return;
        document.getElementById('main-title').innerText = "🌸 DASHBOARD TUẦN " + w;
        // Logic: Ẩn các công việc không thuộc tuần w
        filterTasks('week', w);
    } else if (mode === 'month') {
        let m = prompt("Nhập tháng (1-12):", "6");
        if(!m) return;
        document.getElementById('main-title').innerText = "🌸 DASHBOARD THÁNG " + m;
        filterTasks('month', m);
    } else {
        document.getElementById('main-title').innerText = "🌸 HY HY WORKSPACE 2026";
        filterTasks('all', null);
    }
};

// 3. LOGIC ẨN/HIỆN CÔNG VIỆC (Dựa trên ID của ngày)
function filterTasks(type, val) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Nếu chọn "today" hoặc "all" thì hiện hết
        if (type === 'all') {
            card.style.display = 'block';
        } else {
            // Logic ẩn: Bạn có thể quy định các thẻ div công việc có class chứa ngày/tháng
            // Ví dụ: Nếu muốn lọc theo dữ liệu từ Sheet, bạn cần gắn data-month vào thẻ
            console.log("Đang lọc theo:", type, val);
            // Ở đây web sẽ làm mờ hoặc ẩn các thẻ không khớp
        }
    });
}

// 4. GHI CHÚ TRỰC TIẾP VÀO LỊCH (Bản nâng cấp)
document.addEventListener('click', function(e) {
    let btn = e.target.closest('.cal-btn');
    if (btn) {
        let dayText = btn.innerText.split('\n')[0];
        let key = "note_" + dayText;
        let note = prompt("Ghi chú cho ngày " + dayText + ":", localStorage.getItem(key) || "");
        if (note !== null) {
            localStorage.setItem(key, note);
            btn.setAttribute("title", note);
            btn.style.border = "2px dashed #FF8B94";
            // Đẩy lên Sheet
            fetch(SHEET_API_URL, {
                method: "POST", mode: "no-cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({action: "updateNote", date: dayText, note: note})
            });
        }
    }
});
