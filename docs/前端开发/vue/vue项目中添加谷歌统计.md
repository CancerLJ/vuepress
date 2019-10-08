---
meta:
  - name: description
    content: 在vue项目中添加谷歌统计代码，页面跟踪和埋点事件
  - name: keywords
    content: 喵巨人,前端,笔记,vue,统计代码,谷歌,埋点
---

# Vue项目中添加谷歌统计

## 简介
统计页面打开等事件
对某些关键事件做埋点，统计关键事件的点击率等

这里假设已经注册好谷歌统计相关账号，做好相关配置了

## 步骤
### 引入

- 修改`index.html`文件，添加谷歌统计代码

```javascript
// 谷歌统计
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXX', 'auto'); // 将`UA-XXX`换成自己的ID
ga('send', 'pageview');
```

> **备注**
>- 如果做了多环境，建议只给开发环境配置谷歌统计
>- 引入后，就会自动页面跟踪统计
>- `vue-cli`脚手架搭建的`SPA`项目，切换页面是通过`vue-router`切换的。切换时不会自动页面跟踪，需要手动加一下

### SPA项目页面统计

- 在`src/utils/`目录下新建文件`behavior.js`文件，我们把统计相关代码写在这个文件里面

```javascript
// src/utils/behavior.js

/* 百度统计-页面切换 */
export function trackPageView(url) {
  if (!url) {
    return
  }
  ga('set', 'page', url)
  ga('send', 'pageview')
}
```

- 修改`src/router/index.js`文件，每个页面切换之前，发送统计

```javascript
import { trackPageView } from '../utils/behavior'
// ...
let firstFlag = true
router.beforeEach((to, from, next) => {
  firstFlag ? (firstFlag = false) : trackPageView(window.location.pathname + '#' + to.fullPath)
  next()
})
// ...
```

### 埋点事件

- 修改`src/utils/behavior.js`文件，添加埋点方法

```javascript
// ...
export function behavior(action, label, value) {
  if (value === undefined) {
    window.ga && window.ga('send', 'event', 'category', action, label)
  } else {
    window.ga && window.ga('send', 'event', 'category', action, label, value)
  }
}
```

- 修改`src/main.js`文件，挂载到`vue`的原型上去

```javascript
// ...
import { behavior } from './utils/behavior'
// ...
Vue.prototype.$behavior = behavior
// ...
```

- 组件中使用

```javascript
this.$behavior('漫画章节点击数', this.chapter.title, '+1')
```

## 插件

`vue-analytics`提供了谷歌统计的封装。

> 使用教程
>- [Vue常用插件：vue-analytics](http://www.wmm66.com/index/article/detail/id/77.html)