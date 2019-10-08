---
meta:
  - name: description
    content: Babel垫片之babel-polyfill：浏览器兼容
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,webpack,babel,es6,es5,浏览器兼容
---

# babel-polyfill

## 简介
`ie9`和一些低版本的高级浏览器对`es6`新语法并不支持

要兼容低版本浏览器，需要使用`babel-polyfill`，为当前环境提供一个垫片

## 步骤
### 安装

- 安装：`npm i babel-polyfill --save`

### 使用

- 修改`src/main.js`，在入口文件顶部引入，确保它在任何其他代码/依赖声明之前被调用，以确保它能够最先加载

```javascript
import Vue from 'vue'
import 'babel-polyfill' // 兼容IE
// ...
```

- 修改`build/webpack.base.conf.js`文件，将`babel-polyfill`加到你的`entry`数组中

```javascript
// ...
module.exports = {
  // ...
  entry: { // 兼容IE
    app: ["babel-polyfill", "./src/main.js"]
  },
  // ...
}
```
