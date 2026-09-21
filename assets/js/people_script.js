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

// people 页面语言切换
const language_switch = document.getElementById('language_switch');

if (language_switch) {
    const nav_items = document.querySelectorAll('.header_text');
    const teacher_names = document.querySelectorAll('.teacher_name');
    const member_names = document.querySelectorAll('.student_name');
    const graduate_details = document.querySelectorAll('.graduated_details');
    const intro_headings = document.querySelectorAll('.student_intro_text h4');
    const intro_paragraphs = document.querySelectorAll('.student_intro_text p');
    const statistic_labels = document.querySelectorAll('.info_box h3');

    const original_content = {
        nav: Array.from(nav_items, (item) => item.innerHTML),
        teachers: Array.from(teacher_names, (item) => item.innerHTML),
        members: Array.from(member_names, (item) => item.innerHTML),
        graduateDetails: Array.from(graduate_details, (item) => item.innerHTML),
        introHeadings: Array.from(intro_headings, (item) => item.innerHTML),
        introParagraphs: Array.from(intro_paragraphs, (item) => item.innerHTML),
        statisticLabels: Array.from(statistic_labels, (item) => item.innerHTML),
        director: document.querySelector('.director_text').innerHTML,
        labPhotos: document.querySelector('.Lab_photos p').innerHTML,
        membersTitle: document.querySelector('.student_text').innerHTML,
        graduatedTitle: document.querySelector('.graduated_title').innerHTML,
        aboutUs: document.querySelector('.about_us p').innerHTML,
        phdTitle: document.querySelector('.phd_student_title').innerHTML,
        masterTitle: document.querySelector('.master_student_title').innerHTML,
        footer: document.querySelector('.bottom_text_1').innerHTML,
        pageTitle: document.title
    };

    const chinese_nav = ['首页', '成员', '研究', '3DGS', '论文', '新闻', '联系我们'];
    const chinese_statistics = {
        'Ph.D.': '博士生',
        'Joint Ph.D.': '联合培养博士生',
        'Master’s': '硕士生',
        "Master's": '硕士生',
        'Joint Master’s': '联合培养硕士生',
        "Joint Master's": '联合培养硕士生',
        'Staff': '教职工',
        'Former Members': '毕业成员'
    };
    const chinese_intro_headings = {
        'Doctoral Candidate': '博士研究生',
        "Master's Candidate": '硕士研究生',
        'Research Interest:': '研究方向：',
        'More': '更多'
    };

    // 以 DOM 顺序保存简介正文，恢复英文时仍使用页面原始内容。
    const chinese_intro_paragraphs = [
        '2023年9月入学攻读博士，主要研究视觉语言模型在自动驾驶中的应用。目前聚焦于利用视觉语言模型理解自动驾驶复杂场景，同时开展视觉语言模型/语言模型轻量化研究。未来计划探索多智能体协同决策与规划。',
        '• 视觉语言模型（VLM）<br>• 轻量化/模型压缩<br>• 多智能体协同决策与规划',
        '车辆感知方向博士研究生（2024年9月入学）、TinyML 专业研究者和嵌入式 AI 开发者，具备轻量化 AI 模型设计、开发与部署经验。研究还涉及新视角合成与四维事件分析。',
        '• 低层视觉与中层视觉图像处理<br>• NVS 三维重建<br>• 高斯泼溅<br>• 硬件 PCB 产品设计与制造',
        '2021年获学士学位、2024年获硕士学位，毕业于深圳大学机电与控制工程学院。目前在重庆大学机械与车辆工程学院攻读博士，研究兴趣包括深度强化学习、智能车辆规划与控制。',
        '• 自动驾驶决策<br>• 基于强化学习的决策算法',
        '研究聚焦自动驾驶协同感知，主要开展路侧三维重建、新视角合成与多传感器融合算法研究。曾通过三维仿真项目开发基于向量量化的低带宽融合方法，未来将继续推进车路协同感知技术。',
        '• 多传感器融合感知<br>• 点云数据处理<br>• 路侧三维重建',
        '研究聚焦动态场景重建，参与了面向自动驾驶的高保真仿真系统开发。未来将探索用于验证感知算法和测试端到端自动驾驶仿真系统的多模态传感器数据生成。',
        '• 动态场景重建<br>• 端到端仿真数据生成',
        '主要研究方向是自动驾驶场景生成与多传感器融合感知。目前参与实验室智能驾驶仿真平台建设，负责静态场景重光照。',
        '• 多传感器融合感知<br>• 生成模型<br>• 三维场景重建',
        '主要研究方向是自动驾驶场景仿真，目前从事动态与可编辑相关任务。即将开始博士阶段学习，后续将进一步细化和拓展研究方向。',
        '• 图像处理<br>• 深度学习<br>• 三维/四维重建<br>• 生成模型',
        '主要研究自动驾驶决策与控制，目前专注于大模型赋能的单车智能与多车协同控制。在实验室期间参与了多个项目并积累了丰富实践经验，未来计划探索 AI4Vehicle 的不同方向。',
        '• 智能驾驶决策<br>• 大语言模型<br>• 人工智能',
        '主要研究车联网网络安全，目前专注于身份认证机制，目标是构建安全、可靠的车联网生态。欢迎与相关方向的研究者开展交流合作，共同推进学术研究。',
        '• 车联网安全',
        '主要研究视频目标分割与视觉语言大模型推理加速。在实验室期间参与了基于 Qt 应用框架的工业软件端到端开发，实现了多任务系统的并行执行与交互优化。',
        '• 视频目标分割<br>• 视觉语言模型',
        '主要研究自动驾驶感知，目前重点关注视觉语言模型压缩技术。在实验室期间开展了图像处理、视觉语言模型感知与模型压缩研究，完成了基于多网络架构的强一致性镜面高光去除算法和基于 N:M 稀疏结构的视觉语言模型剪枝技术。未来将探索视觉语言模型在车载系统中的应用与部署。',
        '• 深度学习<br>• 视觉语言模型（VLM）<br>• 模型压缩',
        '主要研究自动驾驶规划，目前聚焦交互式预测与规划优化。未来将探索大规模模型的量化与部署。',
        '• 自动驾驶决策与规划',
        '主要研究自动驾驶感知，目前聚焦融合四维毫米波雷达与图像的三维目标检测算法。',
        '• 多传感器融合',
        '主要研究自动驾驶真实道路测试用例构建，参与过测试路线生成相关项目。',
        '• 自动驾驶功能测试<br>• 自动驾驶测试场景库构建',
        '研究聚焦三维重建，尤其是高保真车辆建模与动态场景重建。在实验室参与了狭窄反光空间机器人导航的碰撞检测与预警算法开发，并完成了基于深度估计的算法和点云模型加载可视化软件模块。未来将继续探索三维重建领域的新问题。',
        '• 三维重建<br>• SLAM',
        '主要研究基于强化学习的自动驾驶决策与控制，目前专注于多智能体大模型决策与控制。在实验室期间参与了基于三维高斯的自动驾驶仿真器项目，负责局部高斯点云编辑与部署。',
        '• 基于强化学习的车辆决策与控制',
        '研究聚焦多传感器融合定位与建图系统（SLAM）、多传感器仿真以及激光雷达点云处理与配准。',
        '• 多传感器融合<br>• 传感器仿真<br>• SLAM',
        '在实验室期间主要从事动态三维重建与基于 Unreal Engine 5 的高斯点云插件开发。',
        '• 动态三维重建',
        '主要研究自动驾驶数据合成算法，已建立图像数据合成流程，并持续开展轨迹数据生成研究。',
        '• 数据合成<br>• 轨迹预测<br>• 图像协调',
        '主要研究自动驾驶场景三维重建，目前专注于基于生成模型和三维高斯泼溅（3DGS）的重建。在实验室期间参与了车辆仿真测试场景构建，并开发了动态目标编辑模块。',
        '• 自动驾驶场景三维重建',
        '主要研究自动驾驶决策，目前专注于复杂环境中的基于强化学习的决策。',
        '• 自动驾驶决策<br>• 扩散模型',
        '主要研究自动驾驶决策与控制，目前开展轻量化决策模型设计。未来将继续探索端到端模型轻量化技术及其在自动驾驶中的实际部署。',
        '• 自动驾驶决策与控制',
        '主要研究自动驾驶决策，目前开展安全强化学习（Safe RL）研究，以在保证安全的同时实现高效决策，探索在动态交通环境中兼顾驾驶性能与严格安全约束的算法。',
        '• 强化学习（RL）',
        '主要研究强化学习，目前专注于扩散式规划，计划进一步探索扩散模型在端到端自动驾驶系统中的应用。',
        '• 扩散模型',
        '研究聚焦自动驾驶决策，尤其是强化学习与基于 Bézier 曲线的轨迹预测。在基于 3DGS 的 UniSim 项目中开发了可编辑静态模型，后续将继续进行算法优化。',
        '• 强化学习 + Bézier 曲线<br>• 决策与规划',
        '目前对视觉感知很感兴趣，尤其是三维重建与多模态学习。具备扎实的 Python 基础，正在学习 CNN、Transformer 等经典模型和相关论文，期待通过系统训练深入理解理论并逐步明确研究方向。',
        '• 计算机视觉<br>• 运动规划',
        '目前主要研究三维仿真场景重建。在实验室期间积极参与仿真环境重建相关开发，未来计划继续探索该方向。',
        '• 3DGS 三维重建<br>• 多传感器融合感知',
        '主要研究强化学习（RL）。本科期间参与过实验室 SLAM 项目，负责定位与建图模块。未来计划探索强化学习、路径规划及相关方向的交叉应用。',
        '• 强化学习<br>• 路径规划<br>• 决策与控制',
        '作为动态重建团队成员，参与了基于 UE5 的动态重建项目，主要负责主界面 UI、各功能 UI 以及点击交互气泡 UI 的开发。',
        '• 动态场景重建<br>• 点云处理',
        '研究主要聚焦自动驾驶系统的决策模块，具体探索鲁棒强化学习如何提升复杂不确定环境中的决策能力，致力于研究动态与对抗场景下的强化学习鲁棒性优化。',
        '• 鲁棒强化学习',
        '主要研究世界模型，正在探索其与鲁棒强化学习（RRL）的结合，并持续推进相关前沿研究。',
        '• 世界模型<br>• 鲁棒强化学习',
        '目前研究自动驾驶应用中的大语言模型，重点关注用于场景理解的视觉语言模型。未来将探索多模态大模型与大模型轻量化技术，提升其在真实自动驾驶系统中的实用性。',
        '• 端到端基础模型<br>• 边缘 AI<br>• 强化学习',
        '主要研究用于决策的强化学习（RL）。在实验室期间参与 UniSim 项目，开发了动态可编辑模块。未来将继续探索强化学习在自动驾驶决策系统，尤其是复杂城市场景中的应用。',
        '• 强化学习决策',
        '最感兴趣的方向是计算机视觉，目前正在学习三维点云目标检测与分割算法，希望在未来的学习探索中不断提升。',
        '• 计算机视觉<br>• 点云数据处理',
        '主要研究自动驾驶决策与运动规划，目前聚焦基于学习的端到端算法。未来计划探索多模态大模型、扩散模型和混合专家（MoE）架构在自动驾驶系统中的应用。',
        '• 端到端自动驾驶系统<br>• 强化学习<br>• VLM/VLA',
        '2021.9-2024.6，重庆邮电大学，物联网工程，本科生<br>2024.9-2025.6，重庆大学国家卓越工程师学院，智能网联汽车，交流学生<br>2025.9-，重庆大学，机器人学工程，硕士研究生',
        '• 智能网联汽车<br>• 一些有趣的事情'
    ];

    function replaceAllText(source, replacements) {
        let result = source;
        replacements.forEach(([from, to]) => {
            result = result.split(from).join(to);
        });
        return result;
    }

    function applyChinese() {
        document.documentElement.lang = 'zh-CN';
        nav_items.forEach((item, index) => item.textContent = chinese_nav[index]);
        teacher_names.forEach((item, index) => {
            item.innerHTML = original_content.teachers[index].split('Director').join('导师');
        });
        member_names.forEach((item, index) => {
            item.innerHTML = replaceAllText(original_content.members[index], [
                ['Ph.D. student', '博士生'],
                ["Master's student", '硕士生']
            ]);
        });
        graduate_details.forEach((item, index) => {
            item.innerHTML = replaceAllText(original_content.graduateDetails[index], [
                ['Graduation:', '毕业时间：'],
                ['Employer:', '就职单位：'],
                ['Position:', '岗位：'],
                ['June 2026', '2026年6月'],
                ['Geely Auto Research Institute', '吉利汽车研究院'],
                ['Leapmotor', '零跑汽车'],
                ['Zhuoyu Technology (ZYT)', '卓驭科技（ZYT）'],
                ['Li Auto', '理想汽车'],
                ['Chongqing Changxian Intelligent Technology Co., Ltd.', '重庆长先智能科技有限公司'],
                ['AI Algorithm Researcher', 'AI算法研究员'],
                ['ADS Algorithm Research and Technology Development Department', 'ADS算法研究与技术开发部'],
                ['Algorithm Engineer', '算法工程师'],
                ['System Safety Engineer', '系统安全工程师'],
                ['AI Algorithm Engineer', 'AI算法工程师'],
                ['VLA Inference Acceleration', 'VLA推理加速'],
                ['Software Test Engineer', '软件测试工程师']
            ]);
        });
        intro_headings.forEach((item, index) => {
            item.innerHTML = chinese_intro_headings[original_content.introHeadings[index].trim()]
                || original_content.introHeadings[index];
        });
        intro_paragraphs.forEach((item, index) => {
            if (chinese_intro_paragraphs[index]) item.innerHTML = chinese_intro_paragraphs[index];
        });
        statistic_labels.forEach((item, index) => {
            const label = original_content.statisticLabels[index].trim();
            item.textContent = chinese_statistics[label] || label;
        });
        document.querySelector('.director_text').textContent = '导师';
        document.querySelector('.Lab_photos p').textContent = '实验室照片';
        document.querySelector('.student_text').textContent = '成员';
        document.querySelector('.graduated_title').textContent = '毕业生';
        document.querySelector('.about_us p').textContent = '关于我们';
        document.querySelector('.phd_student_title').textContent = '博士生';
        document.querySelector('.master_student_title').textContent = '硕士生';
        document.querySelector('.bottom_text_1').innerHTML = '中国重庆市沙坪坝区沙正街174号A区7号教学楼，400030 | 电话：12345678 | 邮箱：12345678@123.com<br>版权所有 © 2025 Automotive Intelligence Lab';
        document.title = '汽车智能实验室';
        language_switch.textContent = 'English';
        language_switch.setAttribute('aria-label', 'Switch page language to English');
    }

    function applyEnglish() {
        document.documentElement.lang = 'en';
        nav_items.forEach((item, index) => item.innerHTML = original_content.nav[index]);
        teacher_names.forEach((item, index) => item.innerHTML = original_content.teachers[index]);
        member_names.forEach((item, index) => item.innerHTML = original_content.members[index]);
        graduate_details.forEach((item, index) => item.innerHTML = original_content.graduateDetails[index]);
        intro_headings.forEach((item, index) => item.innerHTML = original_content.introHeadings[index]);
        intro_paragraphs.forEach((item, index) => item.innerHTML = original_content.introParagraphs[index]);
        statistic_labels.forEach((item, index) => item.innerHTML = original_content.statisticLabels[index]);
        document.querySelector('.director_text').innerHTML = original_content.director;
        document.querySelector('.Lab_photos p').innerHTML = original_content.labPhotos;
        document.querySelector('.student_text').innerHTML = original_content.membersTitle;
        document.querySelector('.graduated_title').innerHTML = original_content.graduatedTitle;
        document.querySelector('.about_us p').innerHTML = original_content.aboutUs;
        document.querySelector('.phd_student_title').innerHTML = original_content.phdTitle;
        document.querySelector('.master_student_title').innerHTML = original_content.masterTitle;
        document.querySelector('.bottom_text_1').innerHTML = original_content.footer;
        document.title = original_content.pageTitle;
        language_switch.textContent = '中文';
        language_switch.setAttribute('aria-label', 'Switch page language to Chinese');
    }

    let is_chinese = false;
    language_switch.addEventListener('click', () => {
        is_chinese = !is_chinese;
        if (is_chinese) {
            applyChinese();
        } else {
            applyEnglish();
        }
    });
}
