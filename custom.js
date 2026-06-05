window.addEventListener('load', function() {
    alert("Đã kết nối custom.js thành công!");

    // Tính năng Sửa tên: Bấm vào là sửa được
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'TD' && e.target.closest('#list-ideas')) {
            if (e.target.cellIndex === 3) {
                e.target.contentEditable = "true";
                e.target.style.border = "2px solid red";
                e.target.focus();
            }
        }
    });

    // Copy "Cre:"
    window.copyToClipboard = function(text) {
        let finalStr = text.startsWith("Cre:") ? text : "Cre: " + text;
        navigator.clipboard.writeText(finalStr);
        alert("Đã copy: " + finalStr);
    };

    // Ẩn Dashboard
    let dbBox = document.getElementById('dashboard-box');
    if(dbBox) dbBox.style.display = 'none';
});
