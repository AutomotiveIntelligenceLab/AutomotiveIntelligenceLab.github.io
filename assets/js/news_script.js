// 获取轮播图元素
const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel_images');
const prevButton = document.querySelector('.carousel_prev');
const nextButton = document.querySelector('.carousel_next');

let currentIndex = 0; // 当前显示的图片索引

// 切换到下一张图片
function nextImage() {
    currentIndex = (currentIndex + 1) % carouselImages.children.length;
    updateCarousel();
}

// 切换到上一张图片
function prevImage() {
    currentIndex = (currentIndex - 1 + carouselImages.children.length) % carouselImages.children.length;
    updateCarousel();
}

// 更新轮播图位置
function updateCarousel() {
    const offset = -currentIndex * 480; // 每张图片的宽度为 480px
    carouselImages.style.transform = `translateX(${offset}px)`;
}

// 添加按钮点击事件
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// 自动轮播（可选）
setInterval(nextImage, 3000); // 每 3 秒切换一次