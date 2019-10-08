---
meta:
  - name: description
    content: 移动端使用click事件，会有300ms延时。fastclick就是为了解决这300ms延时的插件
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,fastclick
---

# fastclick

## 简介
移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。

为了能够立即响应用户的点击事件，才有了`FastClick`。

> 备注：
>- 如果需要原生的点击事件，给对应的标签添加类名`needsclick`即可
>- `fastclick`目前有很多的坑，建议移动端不要用click事件

## 安装
插件安装：`npm i fastclick --save`

## 使用

`src/main.js`入口文件中引入

```javascript
import FastClick from 'fastclick'
FastClick.attach(document.body)
```

ios上面的可编辑div、input等会有一些bug，比如不好点击等。修改源文件

```javascript
import FastClick from 'fastclick'

// fastclick 发帖的页面，ios有bug，可编辑的div和fastclick冲突
const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
FastClick.prototype.needsClick = function (target) {
  // if ($(target).parents('.needsclick').length) return true
  while (target.tagName !== 'BODY') {
    // 放在本地插件库, 请将includes换成indexOf判断
    if (target.className.includes('needsclick')) return true
    target = target.parentNode
  }

  switch (target.nodeName.toLowerCase()) {
  // Don't send a synthetic click to disabled inputs (issue #62)
  case 'button':
  case 'select':
  case 'textarea':
    if (target.disabled) {
      return true
    }
    break
  case 'input':
    // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
    if ((deviceIsIOS && target.type === 'file') || target.disabled) {
      return true
    }
    break
  case 'label':
  case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
  case 'video':
    return true
  }

  return (/\bneedsclick\b/).test(target.className)
}
// input number的bug
FastClick.prototype.focus = function(targetElement) {
  var length
  var userSelectionRange = deviceIsIOS
  if (deviceIsIOS) {
    try {
      length = targetElement.value.length
      targetElement.setSelectionRange(length, length)
    } catch (error) {
      userSelectionRange = false
    }
  }
  if (!userSelectionRange) {
    targetElement.focus()
  }
}
FastClick.attach(document.body)
```
