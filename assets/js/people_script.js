// 成员展示相册框的轮播逻辑
const people_show_imgs = document.getElementById('people_show_imgs');
const people_left_button = document.getElementById('people_left_button');
const people_right_button = document.getElementById('people_right_button');
const ellipses = document.querySelectorAll('.ellipse');

const people_img_list = people_show_imgs.querySelectorAll('img');
let current_people_img_index = 0;

// 轮播图自动播放 设置时间间隔
let people_interval = setInterval(people_run, 3500);

// 轮播图自动播放 索引增加 调用图片索引函数变化
function people_run() {
    current_people_img_index++;
    changePeopleImage();
}

function changePeopleImage() {
    if (current_people_img_index >= people_img_list.length) {
        current_people_img_index = 0;
    } else if (current_people_img_index < 0) {
        current_people_img_index = people_img_list.length - 1;
    }

    // 实现图片变化的动画效果
    people_show_imgs.style.transform = `translateX(${-current_people_img_index * 854}px)`;

    // 更新小椭圆状态
    updateEllipses();
}

// 更新小椭圆状态
function updateEllipses() {
    ellipses.forEach((ellipse, index) => {
        if (index === current_people_img_index) {
            ellipse.classList.add('active');
        } else {
            ellipse.classList.remove('active');
        }
    });
}

// 轮播图自动播放 重置时间间隔
function resetPeopleInterval() {
    clearInterval(people_interval);
    people_interval = setInterval(people_run, 3500);
}

// 轮播图右按钮点击事件
people_right_button.addEventListener('click', () => {
    current_people_img_index++;
    changePeopleImage();
    resetPeopleInterval();
});

// 轮播图左按钮点击事件
people_left_button.addEventListener('click', () => {
    current_people_img_index--;
    changePeopleImage();
    resetPeopleInterval();
});

// 小椭圆点击事件
ellipses.forEach((ellipse, index) => {
    ellipse.addEventListener('click', () => {
        current_people_img_index = index;
        changePeopleImage();
        resetPeopleInterval();
    });
});

// 初始化小椭圆状态
updateEllipses();