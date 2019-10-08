---
meta:
  - name: description
    content: Vue项目打包后，直接使用浏览器打开白屏。如何本地预览打包后的效果？
  - name: keywords
    content: 喵巨人,笔记,Vue
---

# Vue项目打包后本地预览

## 简介
`Vue`项目，使用脚手架`vue-cli`搭建。打包后会在`dist`目录下生成静态文件。

直接用浏览器打开一般是不行的，页面显示空白

那么想在本地预览怎么办？

## hash 模式
默认的`css`、`js`和图片等静态资源是通过绝对地址引入的。类似于`/static/js/...`这种形式

### 本地预览
可以将静态资源的引入路径由绝对地址修改为相对地址。
修改方法见：[Vue项目常见问题-部署资源路径问题](http://www.wmm66.com/index/article/detail/id/14.html)

### 搭建本地服务器
- 在根目录下新建文件`server.js`。使用`express`搭建本地服务器

```javascript
// server.js
const express = require("express")
const app = express()

app.use(express.static('./dist'))
 
app.listen(8081, () => {
  console.log('Listening at http://localhost:8081')
})
```

- 或者使用`koa2`搭建本地服务器

```javascript
// server.js
const Koa = require('koa')
const app = new Koa()

const path = require('path')
const koaStatic = require('koa-static')

// 配置静态web服务的中间件
app.use(koaStatic(
  path.join(__dirname, './dist')
))

app.listen(8081, function() {
  console.log('app started at port 8081...');
})
```

- 修改`package.json`文件的`scripts`部分

```javascript
"server": "node ./server.js"
```

- 执行命令`npm run server`，然后在浏览器中访问`http://localhost:8081`就能看到项目页面了


## history 模式
该模式下不能直接使用浏览器访问
需要搭建本地服务器，方法见`hash`模式中的搭建本地服务器

按上面启动本地服务器后，用浏览器访问项目页面，在首页外的其他页面刷新时会出现404。

>- `express`服务器需要使用中间件`connect-history-api-fallback`将其重定向到`index.html`
>- `koa2`服务器需要使用中间件`koa2-connect-history-api-fallback`将其重定向到`index.html`

`express`服务器修改后的`server.js`文件

```javascript
const express = require("express")
const app = express()
 
let history = require('connect-history-api-fallback')
//重定向到index.html
history({
  rewrites: [{
    from: /^\/libs\/.*$/,
    to: '/index.html'
  }]
});
app.use(history());

app.use(express.static('./dist'))
 
app.listen(8081, () => {
  console.log('Listening at http://localhost:8081')
})
```

`koa2`服务器修改后的`server.js`文件

```javascript
const Koa = require('koa')
const app = new Koa()

const path = require('path')
const koaStatic = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')

// 注意historyApiFallback的位置
app.use(historyApiFallback({ whiteList: ['/api']}))

// 配置静态web服务的中间件
app.use(koaStatic(
  path.join(__dirname, './dist')
))

app.listen(8081, function() {
  console.log('app started at port 8081...');
})
```