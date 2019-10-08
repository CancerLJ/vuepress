---
meta:
  - name: description
    content: Vue等MVVM框架项目，有的时候也需要直接操作dom，汇总了一些常用的操作dom方法
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,dom
---

# 原生JS操作Dom方法汇总

## 是否含有指定的类
```javascript
function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
```

## 添加指定的类
```javascript
function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
```

## 删除指定的类
```javascript
function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let primaryClass = el.className.split(' ')
  let newClass = primaryClass.filter((item, index) => {
    return item !== className
  })
  el.className = newClass.join(' ')
}
```

## 获取或者设置data-xxx的值
```javascript
function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
```

## 添加浏览器样式兼容的前缀
```javascript
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
```

使用方法示例：
```javascript
import { prefixStyle } from 'utils/dom.js'
const transform = prefixStyle('transform')
const transition = prefixStyle('transition')

// 这里的 el 根据实际情况替换成DOM节点
el.style[transform] = 'translate3d(0, 0, 0)'
el.style[transition] = 'all 0.4s ease'
```

## 获取某样式
```javascript
function getStyle(el, attr) {
  if (el.currentStyle) {
    return el.currentStyle[attr]
  } else {
    return getComputedStyle(el, null)[attr]
  }
}
```