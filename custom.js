/**
 * FILE: custom.js (Tất cả logic tự chèn)
 */

window.addEventListener('load', function() {
    
    // 1. DASHBOARD: Tự động chèn nút Dashboard vào sidebar (đè lên menu cũ)
    const sidebar = document.getElementById('sidebar-view-dropdown');
    if (sidebar) {
        sidebar.innerHTML = `
            <button class="menu-item" onclick="switchView('today')">✨ Hôm Nay</button>
            <div style="border-top: 2px solid #000; margin: 10px 0;"></div>
            <div style="font-weight:bold; text-align:center; margin-bottom:5px;">📊 DASHBOARD</div>
            <button class="menu-item" onclick="renderDashBar('week')">🗓️ Tuần</button>
            <button class="menu-item" onclick="renderDashBar('month')">📅 Tháng</button>
            <button class="menu-item" onclick="renderDashBar('year')">📊 Năm</button>
        `;
    }

    // 2. HÀM TẠO THÀNH NGANG (Tự chèn vào phần main)
    window.renderDashBar = function(type) {
        let bar = document.getElementById('dash-filter-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'dash-filter-bar';
            bar.style.cssText = "display:flex; flex-wrap:wrap; gap:5px; margin-bottom:15px; justify-content:center;";
            document.querySelector('.main-content').insertBefore(bar, document.getElementById('checklist-container'));
        }
        bar.innerHTML = '';
        let items = (type === 'week') ? Array.from({length: 5}, (_,i)=>i+1) : (type === 'month') ? Array.from({length: 12}, (_,i)=>i+1) : [2026];
        items.forEach(i => {
            let btn = document.createElement('button');
            btn.innerHTML = (type==='week'?'W':'') + i;
            btn.style.cssText = "padding:5px 10px; border:2px solid #000; border-radius:8px; cursor:pointer;";
            btn.onclick = () => alert("Đang lọc: " + type + " " + i);
            bar.appendChild(btn);
        });
    };

    // 3. COPY "Cre:"
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr).then(() => alert(`📋 Đã copy: "${finalStr}"`));
    };

    // 4. GHI CHÚ LỊCH (Bấm ô lịch)
    document.addEventListener('click', function(e) {
        let btn = e.target.closest('.cal-btn');
        if (btn) {
            let day = btn.innerText.split('\n')[0];
            let note = prompt("Ghi chú cho ngày " + day + ":", localStorage.getItem('note_'+day) || "");
            if (note !== null) {
                localStorage.setItem('note_'+day, note);
                btn.setAttribute("title", note);
                btn.style.border = "2px dashed #FF8B94";
            }
        }
    });

    // 5. SỬA TÊN TÀI KHOẢN (Tự động mở khóa bảng)
    setInterval(function() {
        document.querySelectorAll('#list-ideas td').forEach((td, index) => {
            if (index % 5 === 3 && !td.hasAttribute('contenteditable')) {
                td.setAttribute('contenteditable', 'true');
                td.style.backgroundColor = "#FFF9F9";
                td.style.border = "1px solid #FFB7B2";
            }
        });
    }, 1000);
});
