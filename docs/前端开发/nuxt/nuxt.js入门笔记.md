# Nuxt.js入门笔记

## 安装
```bash
npx -v
npx create-nuxt-app projectName
```

安装的过程中会让选择：
- 集成的服务器端框架：推荐选择`None`(Nuxt默认服务器)或者`Koa`
- UI框架：PC端推荐使用`element-ui`，移动端推荐使用`Vant`(这里没有Vant的话，选择`None`，进去后再装)
- 测试框架
- Nuxt模式：`Universal` or `SPA`。用Nuxt的一般是`Universal`。`SPA`应用我们一般用脚手架`vue-cli`
- 添加`axios`
- 添加`eslint`

## 目录结构

| 目录或文件 | 介绍 |
| :-- | :-- |
| `assets/` | 资源目录 |
| `components/` | 组件目录。`Nuxt.js`不会扩展增强该目录下`Vue.js`组件，即这些组件不会像页面组件那样有`asyncData`方法的特性 |
| `layouts/` | 布局目录 |
| `middleware/` | 存放应用的中间件 |
| `pages/` | 页面目录。框架会读取该目录下所有的`.vue`文件并自动生成对应的路由配置 |
| `plugins/` | 插件目录。组织那些需要在`根vue.js应用`实例化之前需要运行的`JavaScript`插件 |
| `server/` | 服务器端目录 |
| `static/` | 静态文件目录。服务器启动时，该目录下的文件会映射至应用的根目录`/`下 |
| `store/` | 用于组织应用的`Vuex状态树`文件，在该目录下创建一个`index.js`文件即可激活这些配置 |
| `.eslintrc.js` | `Eslint`配置文件 |
| `nuxt.config.js` | `Nuxt.js`应用的个性化配置，覆盖默认配置 |

## Nuxt的页面特殊配置项
`Nuxt.js`为页面提供的特殊配置项

| 属性名 | 描述 |
| :-- | :-- |
| `asyncData` | 最重要的一个键, 支持异步数据处理，另外该方法的第一个参数为当前页面组件的上下文对象 |
| `fetch` | 与`asyncData`方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是`fetch`方法不会设置组件的数据 |
| `head` | 配置当前页面的`Meta`标签 |
| `layout` | 指定当前页面使用的布局（layouts根目录下的布局文件） |
| `loading` | 如果设置为`false`，则阻止页面自动调用`this.$nuxt.$loading.finish()`和`this.$nuxt.$loading.start()`,您可以手动控制它,仅适用于在nuxt.config.js中设置loading的情况下 |
| `transition` | 指定页面切换的过渡动效 |
| `scrollToTop` | 布尔值，默认: `false`。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于嵌套路由的应用场景 |
| `validate` | 校验方法用于校验动态路由的参数 |
| `middleware` | 指定页面的中间件，中间件会在页面渲染之前被调用 |

## 生命周期
`Vue`的生命周期全都跑在`客户端(浏览器)`，而`Nuxt`的生命周期有些在`服务端(Node)`，`客户端`，甚至两边都在

![生命周期](http://www.wmm66.com/uploads/20190903/fc37456481b7ca3bedebca6c3500ea7a.png)

**红框内的是`Nuxt`的生命周期(运行在`服务端`)，黄框内同时运行在`服务端`&&`客户端`上，绿框内则运行在`客户端`**

> 注意：
>- 服务器端不存在`window`对象。运行在服务端的生命周期都不能使用`window`对象

## 使用eslint
在安装过程中，通过`space`键可以选择安装`eslint`

以下介绍的是不通过脚手架安装`eslint`。而是自行安装的步骤

- 安装`eslint`：`npm install --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-vue`
- 根目录下添加`.eslintrc.js`文件

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // 校验 .vue 文件
  plugins: [
    'vue'
  ],
  // 自定义规则
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0
  }
}
```

- 修改`nuxt.config.js`文件，开启`eslint`

```javascript
module.exports = {
  // ...
  build: {
    // ...
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
```

## Koa服务器框架添加ES6语法支持
安装`Nuxt`时，集成的服务器端框架选择了`Koa`的话
`server/index.js`使用的是`require`，不是`ES6`的`import`

- 修改`package.json`文件。在`dev`和`start`命令的最后添加` --exec babel-node`
- 根目录下添加`babel`配置文件`.babelrc`

```json
{
  "presets": ["es2015"]
}
```

- 安装对应的插件：`npm i babel-preset-es2015 --save-dev`
- 修改`server/index.js`文件，将`require`语法修改成`import`语法

## 配置IP和端口
修改`nuxt.config.js`文件，添加`server`配置

```javascript
// ...
module.exports = {
  // ...
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // ...
}
```

## 使用Less
安装`less`即可

```bash
npm i less less-loader --save-dev
```


## 配置全局样式
- 在`assets/`目录下新建目录`less/`，在该目录下新建`main.less`
- 修改`nuxt.config.js`文件，找到`css`部分。添加代码

```javascript
module.exports = {
  // ...
  css: [
    'vue2-animate/dist/vue2-animate.min.css',
    '~assets/less/main.less'
  ],
  // ...
}
```

## 配置插件
### 通过script标签
直接引入第三方的`js`文件的话，可以通过`script`标签引入

- 修改`nuxt.config.js`文件

```javascript
// ...
module.exports = {
  // ...
  head: {  
    script: [
      { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' }
    ]
  },
  // ...
}
```

### 通过plugins配置
所有插件都写在`plugins/`目录下，这里以`vue-lazyload`为例

- 安装`vue-lazyload`：`npm i vue-lazyload --save`
- 在`plugins/`目录下新建文件`lazy-load.js`

```javascript
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('~/assets/img/loading.gif'),
  error: require('~/assets/img/error.png')
})
```

- 修改`nuxt.config.js`文件，配置插件，并配置vendor使其只打包一次

```javascript
module.expors = {
  // ...
  plugins = [
    // ...
    { src: '~/plugins/lazy-load', ssr: false }
  ],
  // ...
  build: {
    // ...
    vendor: ['vue-lazyload']
  }
}
```

> 备注：
>- `ssr: false`：只在客户端使用
>- `ssr: true`：在客户端和服务器端使用

## 配置中间件
开发后台管理页面的时候，我们经常有autu认证需求，如果没有登录，或者权限问题，都有一个脚本去控制跳转，中间件就派上用场了。

- 在`middleware/`目录下新建文件`auth.js`

```javascript
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
```

页面中使用

```javascript
export default {
  // ...
  middleware: 'auth',
  // ...
}
```

全局使用配置：修改`nuxt.config.js`文件

```javascript
// ...
module.exports = {
  // ...
  router: {
    middleware: 'auth'
  }
  // ...
}
```

## 配置别名
在根目录下有一些目录经常使用，想添加别名。比如`components/`、`config/`、`utils/`等

修改`nuxt.config.js`文件

```javascript
const path = require('path')

module.exports = {
  // ...
  build: {
    // ...
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias['components'] = path.resolve(__dirname, 'components')
      config.resolve.alias['config'] = path.resolve(__dirname, 'config')
      config.resolve.alias['utils'] = path.resolve(__dirname, 'utils')
    }
  },
  // ...
}
```

## 配置错误页面
通过编辑`layouts/error.vue`文件来定制化错误页面

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>
```

## 配置页面Loading
### 禁用Loading
修改`nuxt.config.js`文件

```javascript
// ...
module.exports = {
  // ...
  loading: false,
  // ...
}
```

### 配置颜色条
修改`nuxt.config.js`文件

```javascript
// ...
module.exports = {
  // ...
  loading: { color: '#3B8070' },
  // ...
}
```

### 配置自定义Loading
- 在`components/`目录下添加文件`loading.vue`

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
```

- 修改`nuxt.config.js`文件

```javascript
// ...
module.exports = {
  // ...
  loading: '~components/loading.vue',
  // ...
}
```

## 跨域处理
- 安装跨域代理插件：`npm i @nuxtjs/axios @nuxtjs/proxy --save`
- 在`plugins/`目录下添加文件`axios.js`，添加`axios`全局配置

```javascript
export default function ({ $axios, redirect }) {
  // 基本配置
  $axios.defaults.timeout = 10000
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  // 响应回调
  $axios.onResponse(response => {
    const res = response.data
    if (res.code !== 1) {
      Toast('网络连接不稳定，请重试或刷新页面！')
      return Promise.reject(new Error('error'))
    } else {
      return Promise.resolve(response.data)
    }
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/index')
    }
  })
}
```

- 修改`nuxt.config.js`，使用`axios`插件，配置代理

```javascript
// ...
module.exports = {
  // ...
  plugins: [
    // ...
    { src: '~plugins/axios', ssr: true }
  ],
  // ...
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    // retry: { retries: 3 },
    //开发模式下开启debug
    debug: process.env._ENV == 'production' ? false : true,
    // //设置不同环境的请求地址
    // baseURL: // 设置统一的基础url，线上环境关闭代理使用它
    //   process.env._ENV == 'production'
    //     ? 'https://act.superpopgames.com'
    //     : 'http://act.balls.web.ztgame.com',
    // withCredentials: true,
    proxy: true, // 开启代理
    prefix: '/api', // 给请求url加个前缀 /api
    credentials: true
  },
  proxy: {
    //开启代理
    '/api/': {
      target: 'https://act.superpopgames.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': 'concept', // 把/api 替换成 concept
      }
    }
  },
  // ...
}
```

- `vue`组件中使用

```javascript
export default {
  fetch ({ app }) {
    console.log(app.$axios)
  },
  asyncData ({ app }) {
    console.log(app.$axios)
  },
  created () {
    console.log(this.$axios)
  }
}
```

