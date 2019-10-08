# userAgent笔记

## 简介
`userAgent`中文名为用户代理，简称`UA`，它是一个特殊字符串头，使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件等。
`userAgent`属性是一个只读的字符串，声明了浏览器用于`HTTP`请求的用户代理头的值

## 应用
### 安卓系统
安卓系统的`userAgent`中会带有`Android`标识

```javascript
let ua = navigator.userAgent
const isAndroid = (ua.match(/Android/i) !== null)
```

### IOS系统
IOS系统的`userAgent`中会带有`iPad`、`iPod`或者`iPhone`标识

```javascript
let ua = navigator.userAgent.toLowerCase()
const isIos = (ua.match(/iPad|iPod|iPhone/i) !== null)
const isIphone = (ua.match(/iPhone/i) !== null)
```

### 微信浏览器
微信浏览器的`userAgent`中会带有`Micromessenger`标识

```javascript
let ua = navigator.userAgent.toLowerCase()
const isWechat = (ua.match(/micromessenger/i) !== null)
```

### QQ浏览器
QQ浏览器的`userAgent`中会带有` qq/`标识
QQ内部浏览器和QQ浏览器不太好区分

```javascript
let ua = navigator.userAgent.toLowerCase()
const isQq = (ua.match(/\sqq\//i) !== null)
```

### 微博
微博的`userAgent`中会带有`Weibo`标识

```javascript
let ua = navigator.userAgent.toLowerCase()
const isWeibo = (ua.match(/weibo/i) !== null)
```