// home页的js
const home_show_videos = document.getElementById('home_show_videos')
const left_button = document.getElementById('left_button')
const right_button = document.getElementById('right_button')

// 视频列表
const video_list = [
    "https://www.youtube.com/embed/hBMPtV-aj1c?autoplay=1&mute=1&rel=0", // 第一个视频
    "https://www.youtube.com/embed/hBMPtV-aj1c?autoplay=1&mute=1&rel=0",  // 第二个视频
    "https://www.youtube.com/embed/hBMPtV-aj1c?autoplay=1&mute=1&rel=0",  // 第三个视频
    "https://www.youtube.com/embed/hBMPtV-aj1c?autoplay=1&mute=1&rel=0",  // 第四个视频
    "https://www.youtube.com/embed/hBMPtV-aj1c?autoplay=1&mute=1&rel=0"   // 第五个视频
]

// 获取所有小盒子
const nav_boxes = document.querySelectorAll('.nav_box')

let current_video_index = 0

// 轮播图自动播放 设置时间间隔
let interval = setInterval(run, 16000) // 每16秒切换一次视频

// 轮播图自动播放 索引增加 调用视频索引函数变化
function run() {
    current_video_index++
    changeVideo()
}

function changeVideo() {
    if (current_video_index >= video_list.length) {
        current_video_index = 0
    } else if (current_video_index < 0) {
        current_video_index = video_list.length - 1
    }

    // 实现视频变化的动画效果
    home_show_videos.innerHTML = `<iframe width="854" height="480" src="${video_list[current_video_index]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    // 更新小盒子的背景透明度
    updateNavBoxes(current_video_index)
}

// 更新小盒子的背景透明度
function updateNavBoxes(index) {
    nav_boxes.forEach((nav_box, i) => {
        if (i === index) {
            nav_box.style.backgroundColor = 'rgba(0, 0, 0, 0.84)' // 不透明
        } else {
            nav_box.style.backgroundColor = 'rgba(0, 0, 0, 0)' // 透明
        }
    })
}

// 轮播图自动播放 重置时间间隔
function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 16000) // 重置为每16秒切换一次视频
}

// 轮播图右按钮点击事件
right_button.addEventListener('click', () => {
    current_video_index++
    changeVideo()
    resetInterval()
})

// 轮播图左按钮点击事件
left_button.addEventListener('click', () => {
    current_video_index--
    changeVideo()
    resetInterval()
})

// 为小盒子添加点击事件
nav_boxes.forEach((nav_box, index) => {
    nav_box.addEventListener('click', () => {
        current_video_index = index
        changeVideo()
        resetInterval()
    })
})

// 初始化时更新小盒子的背景透明度
updateNavBoxes(current_video_index)