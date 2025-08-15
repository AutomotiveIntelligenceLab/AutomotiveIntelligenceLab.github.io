<!-- 此文件是AutoI实验室网站的使用说明文档.by_Akaxi -->

#  AutoI实验室网站使用说明文档
![主页图片](/assets/images/readme_img/src_2.png)

## 文件说明
-- assets 存储css样式代码、文件、图片、js代码的文件夹<br>
$~~~~$-- css 样式代码<br>
$~~~~~~~~$-- contact.css 相关页链接样式<br>
$~~~~~~~~$-- main.css 主页样式<br>
$~~~~~~~~$-- news.css 新闻页样式<br>
$~~~~~~~~$-- papers.css 文章页样式<br>
$~~~~~~~~$-- people.css 成员页样式<br>
$~~~~~~~~$-- research.css 研究页样式<br>
$~~~~$-- files 数据库文件<br>
$~~~~~~~~$-- papers_index_all.xlsx 已发表论文的数据库（ALL）<br>
$~~~~~~~~$-- papers_index_guofa.xlsx 老师发表的论文数据库（guofa）<br>
$~~~~~~~~$-- papers_index_jie.xlsx 老师发表的论文数据库（jie）<br>
$~~~~~~~~$-- papers_index_show.xlsx 论文页面所使用的数据库（实时渲染）<br>
$~~~~~~~~$-- papers_index_show_temp.xlsx 暂存的数据库（备份）<br>
$~~~~$-- images 图片素材<br>
$~~~~~~~~$-- home_img 主页图片素材<br>
$~~~~~~~~$-- news_img 新闻页图片素材<br>
$~~~~~~~~$-- papers_img 论文页图片素材<br>
$~~~~~~~~$-- people_img 成员页图片素材<br>
$~~~~~~~~$-- readme_img README图片素材<br>
$~~~~~~~~$-- research_img 研究页图片素材<br>
$~~~~~~~~$-- AutoI_logo.png 实验室LOGO<br>
$~~~~~~~~$-- cqu_logo.png 校徽<br>
$~~~~$-- js<br>
$~~~~~~~~$-- chatbot.js 主页聊天AIjavascript<br>
$~~~~~~~~$-- home_script.js 主页整体javascript<br>
$~~~~~~~~$-- news_script.js 新闻页javascript<br>
$~~~~~~~~$-- papers_script.js 论文页javascript<br>
$~~~~~~~~$-- people_script.js 成员页javascript<br>
$~~~~~~~~$-- xlsx.core.min.js 数据库调用渲染javascript<br>
-- contact.html 相关链接页<br>
-- index.html 主页<br>
-- news.html 新闻页<br>
-- papers.html 新闻页<br>
-- people.html 成员页<br>
-- README.md 说明文档<br>
-- research.html 研究页<br>

## 本地数据库实时调用渲染（用于实时显示papers页面）
本机网页代理：<br>
python -m http.server 8000<br>
浏览器访问：<br>
http://localhost:8000/papers.html

## 动态更改论文页面的数据（超级方便）

![数据库](/assets/images/readme_img/src.png)

只需要打开路径：assets\files\papers_index_show.xlsx 的excel表格，将论文数据按照表格要求更新，即可在网页上动态更新论文（通过paper页的js代码实现）

## 更新日历
2025.8.15 -- 实现论文数据库的动态更新