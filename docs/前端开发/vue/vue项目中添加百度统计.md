---
meta:
  - name: description
    content: 在vue项目中添加百度统计代码，页面跟踪和埋点事件
  - name: keywords
    content: 喵巨人,前端,笔记,vue,统计代码,百度,埋点
---

# Vue项目中添加百度统计

## 简介
统计页面打开等事件
对某些关键事件做埋点，统计关键事件的点击率等

这里假设已经注册好百度统计相关账号，做好相关配置了

## 步骤
### 引入

- 修改`index.html`文件，添加百度统计代码

```javascript
// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
```

> **备注**
>- 如果做了多环境，建议只给开发环境配置百度统计
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
  window._hmt.push(['_trackPageview', url])
}
```

- 修改`src/router/index.js`文件，每个页面切换之前，发送统计

```javascript
import { trackPageView } from '../utils/behavior'
// ...
router.beforeEach((to, from, next) => {
  trackPageView(window.location.pathname + '#' + to.fullPath)
  next()
})
// ...
```

- 打开的第一个页面，会发送两次统计，我们屏蔽掉百度的自动统计。修改`index.html`文件，添加代码`_hmt.push(['_setAutoPageview', false]);`

```javascript
// 百度统计
var _hmt = _hmt || [];
_hmt.push(['_setAutoPageview', false]);
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
```

### 埋点事件

- 修改`src/utils/behavior.js`文件，添加埋点方法

```javascript
// ...
/**
 * 百度统计-页面中的用户行为
 * index.html模板文件中需要先预定于 var _hmt = _hmt || [];
 */
export function behavior(action, label, value) {
  if (value === undefined) {
    window._hmt.push(['_trackEvent', 'category', action, label])
  } else {
    window._hmt.push(['_trackEvent', 'category', action, label, value])
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

`vue-ba`提供了百度统计的封装。
> 使用教程见：
>- [单页面vue引入百度统计的使用方法！](https://www.cnblogs.com/zengfp/p/9778119.html)
>- [vue-ba](https://github.com/minlingchao1/vue-ba)