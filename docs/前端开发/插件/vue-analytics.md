---
meta:
  - name: description
    content: Vue常用插件之vue-analytics：谷歌统计
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,统计,analytics
---

# vue-analytics

## 简介
项目中添加谷歌统计（Google Analytics）的方法见：[vue项目中添加谷歌统计](http://www.wmm66.com/index/article/detail/id/75.html)

`vue-analytics`插件可以通过简单的配置快速添加谷歌统计

## 步骤
### 安装

- 安装：`npm i vue-analytics --save`

### 引入

- 修改`config/prod.env.js`文件，添加`GA`代码`ID`

```javascript
module.exports = {
  NODE_ENV: '"production"',
  GA: `"UA-xxx-x"`
}
```

- 修改`build/webpack.prod.conf.js`文件，找到`HtmlWebpackPlugin`部分，添加`ga`选项

```javascript
new HtmlWebpackPlugin({
  // ...
  ga: env.GA // 添加ga选项，以便在index.html中可以引用
}),
```

- 修改`index.html`文件，添加统计代码

```javascript
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', <%= htmlWebpackPlugin.options.ga %>, 'auto');
ga('send', 'pageview');
```

> **备注**：
>- `GA`的`ID`是从配置中读取而不是写死的

### 页面统计

- 修改`src/main.js`文件，引入`vue-analytics`

```javascript
import Vue from 'vue'
import router from './router'
import VueAnalytics from 'vue-analytics'

// GA初始化
if (process.env.GA) {
  Vue.use(VueAnalytics, {
    id: process.env.GA, // 从配置中读取
    disableScriptLoader: true, // 必须在html中完成初始化，这里显式禁止去下载ga脚本
    router, // 确保路由切换时可以自动统计
    autoTracking: {
      pageviewOnLoad: false // 当通过网址进来时已经GA在初始化时就发起一次pageview的统计，这里不要重复统计
    }
  })
}
// ...
```

> **备注**
>- 添加以上代码有，每次切换页面都会自动页面跟踪统计。
>- `pageviewOnLoad: false`防止重复统计

### 埋点事件

- 组件中使用

```javascript
this.$ga.event('category', 'action', 'label', 123)

// 或者
this.$ga.event({
  eventCategory: 'category',
  eventAction: 'action',
  eventLabel: 'label',
  eventValue: 123
})
```

> 事件参数
>- `category`: 一般为一个大类，比如品牌`brand`,视频`video`等等
>- `action`: 一般为一个具体的操作，比如`download`, `play`, `click`等等
>- `label`: 一般为额外的一些信息，比如具体的品牌`ID`，视频的`title`等等
>- `value`: 任意的度量值，必须为正的整数，比如表示品牌的价值，视频的时长等等


## 参考链接
[vue-analytics：page-tracking](https://github.com/MatteoGabriele/vue-analytics/blob/master/docs/page-tracking.md)
[vue-analytics：event-tracking](https://github.com/MatteoGabriele/vue-analytics/blob/master/docs/event-tracking.md)
