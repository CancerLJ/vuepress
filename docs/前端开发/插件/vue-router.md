---
meta:
  - name: description
    content: Vue常用插件之vue-router：路由管理
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,路由管理
---

# vue-router

## 简介
`Vue全家桶`中的路由管理工具

## 安装使用
插件安装：`npm i vue-router --save`

- 在`src/`目录下新建目录`router/`
- 在`src/router/`目录下新建`index.js`和`routes.js`文件
- `index.js`文件：vue-router配置、初始化等

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
/* eslint-disable */
let router = new Router({
  // mode: 'history',
  routes
})
export default router
```

- `routes.js`文件：具体的路由信息，每个路由对应的组件

```javascript
// 推荐/关注页面
const RecommendFocus = res => require(['@/views/recommend/focus'], res)
const PostDetail = res => require(['@/views/post/detail'], res)

const Msg = res => require(['@/views/msg'], res)
const MsgCommentAll = res => require(['@/views/msg/comment-all'], res)
const MsgCommentMe = res => require(['@/views/msg/comment-me'], res)

const routes = [
  {
    path: '/',
    redirect: '/recommend/focus',
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/recommend/focus',
    component: RecommendFocus,
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'postDetail',
    path: '/post/detail/:id',
    components: PostDetail,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/msg',
    component: Msg,
    redirect: '/msg/comment/all',
    meta: {
      keepAlive: false
    },
    children: [
      {
        path: 'comment/all',
        component: MsgCommentAll,
        meta: {
          keepAlive: false
        }
      },
      {
        path: 'comment/me',
        component: MsgCommentMe,
        meta: {
          keepAlive: false
        }
      }
    ]
  }
]

export default routes
```

- 修改`src/main.js`文件，使用定义好的路由

```javascript
// ...
import store from './store'
// ...
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

## 常用属性方法
`html`模板中：
```html
<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>

<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<router-link to="/foo">Go to Foo</router-link>
```

`javascript`代码中：
```javascript
// this.$route：vue-router维护的一个对象，从这里可以拿到当前页面的路由信息，比如当前页面的name、path、params等
// this.$router：vue-router维护的一个对象，可以使用此进行一些路由操作

console.log(this.$route)
console.log(this.$route.path)
console.log(this.$route.params.id)

this.$router.push('/post/detial/1')
this.$router.back()
this.$router.go(0)
```

## 参考链接
- [Vue Router官方文档](https://router.vuejs.org/zh/)
