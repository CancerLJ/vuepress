---
meta:
  - name: description
    content: 使用vue脚手架搭建的项目是单页面应用，可以通过简单配置修改成多页面应用
  - name: keywords
    content: 喵巨人,笔记,前端开发,Vue,单页面应用,多页面应用,SPA
---

# Vue多页面开发配置

## 简介
使用`Vue`脚手架`vue-cli`搭建的项目是单页面应用。
但是在做大型项目时，单页面往往无法满足我们的需求，因此需要配置多页面应用。
可以将`vue-cli`搭建的单页面应用改造成多页面应用。

## 思路

- 在`src`目录下新建`pages`目录，多页面应用的每个页面都放在该目录的不同子目录中

- 给`webpack`配置多入口。每个页面应用内依然采用`Vue`单页面应用开发

- 将所有的系统公共组件放在系统目录最外面，以达到组件复用的目的。每个页面内部依然可以封装和复用独立的组件。这样可最大限度的提高组件的复用性

- 每个页面单独进行路由配置

- 每个页面单独处理数据

目录结构如下图：
![image.png](http://www.wmm66.com/uploads/20190708/e2f8efe590f69467c055c870966ae6ce.png)

## 具体步骤
比如该多页面系统有两个页面`game.html`和`house.html`

### 新建多页面目录和文件

- 在`src`目录下新建目录`pages/`

- 在`src/pages/`目录下新建子目录`game/`和`house/`

- 在`src/pages/game/`目录下新建文件`game.js`

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './game.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
```

> 备注：
>- 这个文件`game.js`就相当于单页面应用的入口文件`src/main.js`。是多页面应用中`game.html`页面的入口文件
>- `new Vue`部分有修改，需要使用`render: h => h(App)`这种形式

- 在`src/pages/game/`目录下新建文件`game.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <title>游戏分享</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

> 备注：
>- 这个文件`game.html`就相当于单页面应用的模板文件`index.html`。是多页面应用中`game.html`页面的模板文件

- 在`src/pages/game/`目录下新建文件`game.vue`

```html
<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

> 备注：
>- 这个文件`game.html`就相当于单页面应用的主`vue`文件`src/App.vue`。是多页面应用中`game.html`页面的主`vue`文件

- 在`src/pages/game/`目录下的其他目录按实际情况新建即可。比如：`assets/`、`components`、`router`、`store`、`utils`等目录

- `src/pages/house/`目录下的文件和目录与`src/pages/game/`目录下文件和目录雷同，按实际情况新建即可

### 修改入口文件配置

入口文件配置在`build/webpack.base.conf.js`文件中

```javascript
// ...
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {  // 这个是入口文件，目前只有一个'./src/main.js'
    app: './src/main.js'
  },
  // ...
}
```

我们把需要配置单页面的所有页面都放在`src/systems/`目录下面了，以子目录的形式区分。每个子目录下都有对应的入口文件、模板文件和主`Vue`文件

可以将每个子页面的入口文件手动添加到`build/webpack.base.conf.js`文件中

```javascript
// ...
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    game: './src/pages/game.js',
    house: './src/pages/house.js'
  },
  // ...
}
```

> 手动添加的方式比较繁琐，也有可能会漏掉某些页面。我们这里采用自动加载的方式
> - 使用`glob`这个第三方模块来查找符合要求的文件
> - 将获取入口文件数组封装成一个方法，放在`build/utils.js`文件中
> - `build/webpack.base.conf.js`文件中调用该方法获取入口文件数组

- 安装第三方模块`glob`

```bash
npm i glob --save-dev
```

- 修改`build/utils.js`文件，添加以下代码

```javascript
let glob = require('glob') // glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
let PAGE_PATH = path.resolve(__dirname, '../src/pages') // 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在，那么就作为入口处理
exports.entries = function() {
  // 用于匹配 pages 下一级文件夹中的所有 .js 文件，所以 pages 的子目录下 只能有一个 .js 文件
  // 当然也可以规定入口文件比如就叫做 index.js 。那么下面这句就是： let entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    /* 生成对应的键值对 */
    map[filename] = filePath
  })
  return map
}
```

- 修改`build/webpack.base.conf.js`文件

```javascript
// ...
module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   game: './src/pages/game.js',
  //   house: './src/pages/house.js'
  // },
  entry: utils.entries(),
  // ...
}
```

### 修改模板文件配置

开发环境的模板配置在`build/webpack.dev.conf.js`文件中
生产环境的模板配置在`build/webpack.prod.conf.js`文件中

```javascript
// build/webpack.dev.conf.js
// ...
const devWebpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // ...
  ]
})
// ...

// build/webpack.prod.conf.js
// ...
const webpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // ...
  ]
})
// ...
```

修改成

```javascript
// build/webpack.dev.conf.js
// ...
const devWebpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: './src/pages/game/game.html',
      template: 'game.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: './src/pages/house/house.html',
      template: 'house.html',
      inject: true
    }),
    // ...
  ]
})
// ...

// build/webpack.prod.conf.js
// ...
const webpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: './src/pages/game/game.html',
      template: 'game.html',
      chunks: ['manifest', 'vendor', 'game'], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: './src/pages/house/house.html',
      template: 'house.html',
      chunks: ['manifest', 'vendor', 'house'], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // ...
  ]
})
// ...
```

> 这里同样也采用自动加载的方式
> - 使用`glob`这个第三方模块来查找符合要求的文件
> - 将获取模板文件数组，按照`webpack`的`html-webpack-plugin`格式数据数组，封装成一个方法。放在`build/utils.js`文件中中
> - 开发环境：`build/webpack.dev.conf.js`文件中给`plugins`拼接生成的数组
> - 生产环境：`build/webpack.prod.conf.js`文件中给`plugins`拼接生成的数组

- 修改`build/utils.js`文件，添加以下代码

```javascript
let HtmlWebpackPlugin = require('html-webpack-plugin') // 页面模板
let merge = require('webpack-merge') // 用于做相应的merge处理

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  // 用于匹配 pages 下一级文件夹中的所有 .html 文件，所以 pages 的子目录下 只能有一个 .html 文件
  // 同理：当然也可以规定入口文件比如就叫做 index.html 。那么下面这句就是： let entryHtml = glob.sync(PAGE_PATH + '/*/index.html')
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = { // 可以参照 build/webpack.dev.conf.js 文件中的 new HtmlWebpackPlugin 部分
      template: filePath, // 模板来源
      filename: filename + '.html', // 文件名称
      chunks: ['manifest', 'vendor', filename], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      inject: true
    }
    if (process.env.NODE_ENV === 'production') { // 生产环境做了一些压缩等处理，参照 build/webpack.prod.conf.js 文件中的 new HtmlWebpackPlugin 部分
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
```

- 修改`build/webpack.dev.conf.js`文件

```javascript
// ...
const devWebpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // ...
  ].concat(utils.htmlPlugin())
})
// ...
```

- 修改`build/webpack.prod.conf.js`文件

```javascript
// ...
const webpackConfig = merge(baseWebpackConfig, {
  // ...
  plugins: [
    // ...
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // ...
  ].concat(utils.htmlPlugin())
})
// ...
```

## 构建结果

开发环境：`npm run dev`
浏览器中需要输入：`http://localhost:8080/game.html`、`http://localhost:8080/house.html`

生产环境：`npm run build`
打包出来的文件如下图：
![image.png](http://www.wmm66.com/uploads/20190708/9efed09cbe784c24868681af293b9b59.png)
