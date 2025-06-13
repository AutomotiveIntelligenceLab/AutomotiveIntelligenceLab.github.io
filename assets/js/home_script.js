//home页的js
const home_show_imgs = document.getElementById('home_show_imgs')
const left_button = document.getElementById('left_button')
const right_button = document.getElementById('right_button')

const img_list = home_show_imgs.querySelectorAll('img')
//获取导览盒子
const nav_boxes = document.querySelectorAll('.nav_box')
//导览盒子摘要文本
const img_abstracts = [
    "Abstract for image 1: This image showcases our research in autonomous driving systems,This image showcases our research in autonomous driving systems,This image showcases our research in autonomous driving systems.",
    "Abstract for image 2: Explore our advancements in intelligent transportation technologies,Explore our advancements in intelligent transportation technologies,Explore our advancements in intelligent transportation technologies.",
    "Abstract for image 3: Learn about our work in vehicle-to-everything (V2X) communication,Learn about our work in vehicle-to-everything (V2X) communication,Learn about our work in vehicle-to-everything (V2X) communication.",
    "Abstract for image 4: Discover how we are improving safety in automotive systems,Discover how we are improving safety in automotive systems,Discover how we are improving safety in automotive systems.",
    "Abstract for image 5: Our latest innovations in connected and autonomous vehicles,Our latest innovations in connected and autonomous vehicles,Our latest innovations in connected and autonomous vehicles."
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