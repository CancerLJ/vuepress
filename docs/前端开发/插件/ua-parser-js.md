---
meta:
  - name: description
    content: Vue常用插件之ua-parser-js：获取浏览器和系统信息
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,ua,user-agent,ua-parser-js
---

# ua-parser-js

## 简介
获取浏览器和系统信息

## 步骤
### 安装
- 安装：`npm i ua-parser-js --save`

### 引入
需要用到的页面组件或者js文件中直接引入

```javascript
import uaParser from 'ua-parser-js'
```

### 使用

```javascript
const ua = uaParser(navigator.userAgent)
console.log(ua)
```

## 参考链接
- [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)