//home页的js
const home_show_imgs = document.getElementById('home_show_imgs')
const left_button = document.getElementById('left_button')
const right_button = document.getElementById('right_button')

const img_list = home_show_imgs.querySelectorAll('img')
//获取导览盒子
const nav_boxes = document.querySelectorAll('.nav_box')
//导览盒子摘要文本
const img_abstracts = [
    "We propose a novel two-stage domain generalization framework for EEG-based driver drowsiness recognition, addressing cross-subject EEG variations through domain mappers and adversarial training.",
    "We propose an alternating interaction fusion approach to overcome the limitations of existing methods, which either underutilize image data or suffer from excessive complexity in parallel fusion schemes.",
    "We propose lightweight optimization strategies for vision-based decision-making models, addressing parameter size, memory usage, and inference speed through innovative architectural improvements.",
    "We developed an explainable driving stress recognition framework that combines EEG and behavioral data, achieving 84.93% accuracy after feature selection - an 8.56% and 26.51% improvement over using either data type alone.",
    "We investigated tunnel-induced mental fatigue in high-speed rail drivers using EEG and graph theory, finding significantly increased fatigue (p<0.001) and altered brain connectivity patterns during tunnel driving compared to plain scenarios."
];
//获取摘要文字元素
const img_abstract_text = document.getElementById('img_abstract_text')

let current_img_index = 0

// 轮播图自动播放 设置时间间隔
let interval = setInterval(run,2000)

// 轮播图自动播放 索引增加 调用图片索引函数变化
function run(){
    current_img_index++
    changeImage()
}

function changeImage(){
    if(current_img_index >= img_list.length){
        current_img_index = 0
    }
    else if(current_img_index < 0){
        current_img_index = img_list.length - 1
    }
    
    // 实现图片变化的动画效果
    home_show_imgs.style.transform = `translateX(${-current_img_index * 854}px)`

    // 实现导览图片透明度变换效果
    nav_boxes.forEach((nav_box,index) => {
        if (index === current_img_index){
            nav_box.querySelector('img').style.opacity = 1; // 展示时间->导览图片原色
        }
        else{
            nav_box.querySelector('img').style.opacity = 0.4; //没展示时间->导览图片变40%透明
        }
    })

    // 实现图片摘要文字的更新效果
    img_abstract_text.textContent = img_abstracts[current_img_index]
}

// 轮播图自动播放 重置时间间隔
function resetInterval(){
    clearInterval(interval)
    interval = setInterval(run,2000)
}

// 轮播图右按钮点击事件
right_button.addEventListener('click',()=>{
    current_img_index++
    changeImage()
    resetInterval()
})

// 轮播图左按钮点击事件
left_button.addEventListener('click',()=>{
    current_img_index--
    changeImage()
    resetInterval()
})

//导览盒子变化事件
nav_boxes.forEach((nav_box,index) => {
    nav_box.addEventListener('click',() => {
        current_img_index = index
        changeImage()
        resetInterval()
    })
})