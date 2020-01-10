# Zero‘s 博客 后台前端项目
轻量级 Spring Boot + Thymeleaf + Vue.js +Element UI 博客

## 后端选型
Spring Boot + (Thymeleaf + Vue.js + Element UI) + MyBatis + JWT + Spring Security.

## 前端选型
Vue2.x + ElementUI

## 介绍
该项目是一个前后端分离的项目、采用 JsonWebToken 的形式进行后端鉴权。前端采用了vue2.x进行渲染后台管理界面。动态管控文章、支持博客常见的时间线、标签功能、文章采用Markdown文本存储、后台内置Markdown文本编辑器，实时预览。后台内置文件存储功能，可以将markdown中的图片放在服务器上，但更应该将图片放在静态资源文件服务器上用来加速网页打开速度。

## 案例
[My Blog Manage Dashboard](http://admin.retzero.com)
暂时不提供账号密码。

## 后台图片
![https://github.com/Jackjun724/blog_pages/blob/master/img1.png?raw=true](img1)
![https://github.com/Jackjun724/blog_pages/blob/master/img2.png?raw=true](img2)
![https://github.com/Jackjun724/blog_pages/blob/master/img3.png?raw=true](img3)
![https://github.com/Jackjun724/blog_pages/blob/master/img4.png?raw=true](img4)
![https://github.com/Jackjun724/blog_pages/blob/master/img5.png?raw=true](img5)
![https://github.com/Jackjun724/blog_pages/blob/master/img6.png?raw=true](img6)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
