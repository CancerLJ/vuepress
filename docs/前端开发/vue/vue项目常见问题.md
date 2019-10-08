---
meta:
  - name: description
    content: 使用vue-cli脚手架搭建项目，遇到的一些常见问题，比如资源路径问题、多环境配置等
  - name: keywords
    content: 喵巨人,笔记,Vue,iphone,svg
---

# Vue项目常见问题

## iphoneX等刘海手机，页面切换时闪动
做页面间切换动画时，会给切换中的页面添加样式`position: absolute`
此时如果不给父标签添加 `position:relative`的话，会出现页面切换时页面大小变化造成的闪动问题，添加该样式即可

## iphone手机的橡皮筋效果
iphone在上拉或者下拉时，会有可能漏出底部的背景

屏蔽此现象的思路：
屏蔽`body`的`touchmove`事件，需要滚动的地方用js模拟滚动

```javascript
// app.vue
export default {
    mounted() {
        document.body.addEventListener('touchmove', function (e) {
            if (!e.isScroll) {
                e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            }
        }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
    }
}

// 自定义一个指令 v-scroll
// src/directives/scroll.js
import Vue from 'vue'

Vue.directive('scroll', {
    inserted: function (el, binding) {
        let lastY // 最后一次y坐标点
        el.addEventListener('touchstart', e => {
            lastY = e.touches[0].pageY // 点击屏幕时记录最后一次Y度坐标
        })
        el.addEventListener('touchmove', e => {
            e.isScroll = true
            var y = e.touches[0].pageY
            var top = el.scrollTop // 对象最顶端和窗口最顶端之间的距离 0-93
            var scrollH = el.scrollHeight // 含滚动内容的元素大小 276 内容高度
            var offsetH = el.offsetHeight // 网页可见区域高 183 显示高度
            var cScroll = top + offsetH // 当前滚动的距离

            if (y >= lastY && top <= 10) { // 如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件
                e.preventDefault()
            }
            if (y <= lastY && cScroll >= scrollH) {
                e.preventDefault()
            }
            lastY = y
        })
    }
})

// 引入自定义指令
// src/main.js
import './directives/scroll.js'
```

`Vue组件`中需要滚动的标签，使用自定义指令`v-scroll`
```html
<div v-scroll>
    .......
</div>
```


## 判断是否是返回
判断进入的页面前进的还是返回的

**思路**
- 不使用`vue-router`提供的方法`this.$router.back()`
- 给路由的原型定义一个方法`goBack()`，在需要返回的地方调用该方法`this.$router.goBack()`
- 该方法中设置`isBack: true`
- 在需要判断的地方，获取`this.$router.isBack`即可（获取完后设置回去 `this.$router.isBack = false`）

```javascript
// src/router/index.js

Router.prototype.goBack = function() {
    this.isBack = true
    window.history.go(-1)
}
```

## 返回上一页，回退问题
如果没有上一页，默认是页面不变
需求：如果没有上一页，跳转到首页

思路：
给第一个页面添加一个路由参数`goindex=true`
在返回的地方判断路由中是否有`goindex=true`，如果有，进入首页`this.$router.push('/recommend/focus')`，如果没有或者值不对，返回上一个页面`this.$router.back()`

```javascript
// app.vue
export default {
    data() {
        flagFirst: true
    },
    updated() {
        if (this.flagFirst) {
            this.goIndex()
        }
    },
    methods: {
        goIndex() {
            this.flagFirst = false
            if (location.href.indexOf('?') === -1) {
                window.location.href = location.href + '?goindex=true'
            } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
                window.location.href = location.href + '&goindex=true'
            }
        }
    }
}

// src/router/index.js
Router.prototype.goBack = function() {
    this.isBack = true
    if (this.history.current.query.goindex === 'true') {
        this.push('/recommend/focus')
    } else {
        window.history.go(-1)
    }
}
```

**参考链接**
[Vue路由的$router.back(-1)回退时如何判断有没有上一个路由](https://segmentfault.com/q/1010000010714863)

## 部署资源路径问题
打包后的文件需要直接放在虚拟主机目录中
如果放在虚拟主机目录的子目录中，会出现js等资源文件访问不到的问题。需要将绝对路径修改为相对路径

- 修改 `config/index.js` 文件，找到`build/assetsPublicPath`
```javascript
build: {
    // ...
    assetsPublicPath: './',
    // ...
}
```

- 修改 `build/utils.js` 文件，增加一行

```javascript
if (options.extract) {
    return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        // 增加一行
        publicPath: '../../'
    })
} else {
    return ['vue-style-loader'].concat(loaders)
}
```

## 图片、JS、CSS等所有静态资源使用CDN地址

修改 `config/index.js` 文件

```javascript
// ...
module.exports = {
  // ...
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: './',
    assetsPublicPath: process.env.NODE_ENV === 'production' ? 'https://xxx/ingame/community/dist/' : './',
    // ...
  }
}
```

## 仅图片资源使用CDN地址
### `static`目录下图片使用CDN地址
- 修改 `config/dev.env.js` 文件

```javascript
// ...
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // ...
  urlCDN: '"./"'
})
```

- 修改 `config/prod.env.js` 文件

```javascript
// ...
module.exports = {
  NODE_ENV: '"production"',
  // ...
  urlCDN: '"http://xxx/heyhey/resources/actionplan/"'
}
```

- 修改 `src/main.js` 文件

```javascript
Vue.prototype.$urlCDN = process.env.urlCDN
```

- `vue`文件中

```javascript
this.rankList = res.result.map(item => {
  item.levelIcon = `${this.$urlCDN}static/level/${item.Level.Lvid}.png`
  return item
})
```

### `less`样式中的背景图片使用CDN地址

- 修改 `config/index.js` 文件

```javascript
module.exports = {
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    imgPublicPath: 'http://xxx/heyhey/resources/actionplan/',
    // ...
  }
}
```

- 修改 `build/utils.js` 文件

```javascript
if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
    // 增加一行
    publicPath: process.env.NODE_ENV === 'production' ? config.build.imgPublicPath : '../../',
  })
} else {
  return ['vue-style-loader'].concat(loaders)
}
```

### 模板中的`img`标签使用的`assets`目录下图片修改成CDN地址
- 修改 `build/webpack.base.conf.js` 文件

```javascript
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // 根据环境使用cdn或相对路径
          publicPath: process.env.NODE_ENV === 'production' ? config.build.imgPublicPath : './',
          // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
          // outputPath: 'img',
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // ..
    ],
    // ...
  }
}
```

## 多环境配置
用`vue-cli`生成的项目，只有开发环境`development`和正式环境`production`
开发时常常会用到其他环境，比如线上测试环境、预发布环境等

- 修改`package.json`文件，添加命令
```json
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
    "build:prod": "cross-env NODE_ENV=production env_config=prod node build/build.js",
    "build:sit": "cross-env NODE_ENV=production env_config=sit node build/build.js",
    "build:local": "cross-env NODE_ENV=production env_config=local node build/build.js"
},
```

- 在`config`目录下添加文件`sit.env.js`、`local.env.js`
```javascript
// config/sit.env.js
'use strict'
module.exports = {
    NODE_ENV: '"production"',
    ENV_CONFIG: '"sit"'
}

// config/local.env.js
'use strict'
module.exports = {
    NODE_ENV: '"production"',
    ENV_CONFIG: '"local"'
}
```

- 修改`config/prod.env.js`和`config/test.env.js`文件
```javascript
// config/prod.env.js
'use strict'
module.exports = {
    NODE_ENV: '"production"',
    ENV_CONFIG: '"prod"'
}

// config/test.env.js
'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    ENV_CONFIG: '"test"'
})
```

- 修改`build/build.js`文件
```javascript
const spinner = ora('building for ' + process.env.env_config + ' production...')
```

修改`build/webpack.prod.conf.js`文件
```javascript
const env = require('../config/' + process.env.env_config + '.env')
```

## 路由懒加载
结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)和 Webpack 的[代码分割功能](https://webpack.docschina.org/guides/code-splitting)，轻松实现路由组件的懒加载

```javascript
const VideoPlay = resolve=> require(['@/views/videoplay'], resolve)
// 或者
const VideoPlay = () => import('@/views/videoplay')
```

当在开发环境，页面热更新速度慢的时候。可以给开发环境单独设置
使用`babel`的 `plugins`：`babel-plugin-dynamic-import-node`。它只做一件事就是将所有的`import()`转化为`require()`，这样就可以用这个插件将所有异步组件都用同步的方式引入，并结合`BABEL_ENV`这个`babel`环境变量，让它只作用于开发环境下

首先在`package.json`中增加`BABEL_ENV`
```json
"dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```

在`.babelrc`只能加入`babel-plugin-dynamic-import-node`这个`plugins`，并让它只有在`development`模式中才生效。
```javascript
{
  "env": {
    "development": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

之后路由只要像平时一样写就可以了。
```javascript
const VideoPlay = () => import('@/views/videoplay')
```

## 使用`webpack-bundle-analyzer`分析
修改`package.json`文件，添加以下命令
```json
"scripts": {
    "build:sit-preview": "cross-env NODE_ENV=production env_config=sit npm_config_preview=true npm_config_report=true node build/build.js"
}
```

修改`build/webpack.prod.conf.js`文件，添加以下代码
```javascript
if (config.build.npm_config_preview) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

## 项目中使用svg图标
阿里巴巴`iconfont`可以生成字体图标。还是比较麻烦，用某个标签的时候需要去找对应的类名等

这里选择用`svg-sprite-loader`加载图标

- 安装`svg-sprite-loader`：`npm i svg-sprite-loader --save-dev`
- 在`src`目录下新建目录`icons`，用来放置图标相关文件
- 在`src/icons`目录下新建`svg`目录，用来方式svg图标文件
- 在`src/components`目录下新建文件`svgIcon.vue`
```html
<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
export default {
    name: 'svgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
```

- 在`src/icons`目录下新建文件`index.js`
```javascript
import Vue from 'vue'
import SvgIcon from '@/components/svgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

- 在`src/main.js`文件中引入
```javascript
import './icons'
```

- 修改`build/webpack.base.conf.js`文件，让`src/icons`目录下面的`svg文件`使用`svg-sprite-loader`打包，其他的目录下的`svg文件`还是使用原来的`loader`
```javascript
{
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    include: [resolve('src/icons')],
    options: {
        symbolId: 'icon-[name]'
    }
},
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    exclude: [resolve('src/icons')],
    options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}
```

**其他**
一般设计师等给的svg文件，里面会包含一些注释等无用的信息
可以使用`svgo`压缩

- 安装`svgo`：`npm i svgo --save-dev`
- 在`src/icons`目录下添加配置文件`svgo.yml`
```yml
# replace default config

# multipass: true
# full: true
plugins:
    # - name
    #
    # or:
    # - name: false
    # - name: true
    #
    # or:
    # - name:
    # param1: 1
    # param2: 2

- removeAttrs:
    attrs:
        - 'fill'
        - 'fill-rule'
```

- `package.json`文件中配置命令：`"svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"`
 -  执行命令进行压缩`npm run svgo`

**参考链接**
[手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
