// 获取所有过滤按钮
const filterButtons = document.querySelectorAll('.filter_button');

// 获取所有论文项
const paperItems = document.querySelectorAll('.paper_item');

// 默认显示所有论文
showPapers('all');

// 为每个按钮添加点击事件
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的 active 类
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // 为当前点击的按钮添加 active 类
        button.classList.add('active');
        // 获取当前按钮的 filter 属性
        const filter = button.getAttribute('data-filter');
        // 显示对应年份的论文
        showPapers(filter);
    });
});

// 显示符合筛选条件的论文
function showPapers(filter) {
    const paperItems = document.querySelectorAll('.paper_item');

    paperItems.forEach(item => {
        const year = item.getAttribute('data-year');

        if (filter === 'all' || year === filter || (filter === 'before_2022' && parseInt(year) < 2022)) {
            item.style.display = 'flex'; // 显示符合条件的论文
        } else {
            item.style.display = 'none'; // 隐藏不符合条件的论文
        }
    });
}

// 为过滤按钮添加点击事件
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter_button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的 active 状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加 active 状态
            button.classList.add('active');
            // 获取筛选条件并显示论文
            const filter = button.getAttribute('data-filter');
            showPapers(filter);
        });
    });
}

// 初始化页面时显示所有论文
document.addEventListener('DOMContentLoaded', () => {
    showPapers('all'); // 默认显示所有论文
    setupFilterButtons(); // 设置过滤按钮事件
});