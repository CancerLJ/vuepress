---
meta:
  - name: description
    content: Vue常用插件之vuex：数据管理
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,数据管理
---

# vuex

## 简介
`Vue全家桶`中的状态管理工具

## 安装
插件安装：`npm i vuex --save`

## store定义
### 简单使用
- 在`src`目录下新建目录`store`
- 在`src/store`目录下新建`index.js`文件

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

// state
const state = {
  indexCount: 0
}

// getters
const getters = {
  indexCount: state => state.indexCount
}

// mutations
const mutations = {
  setIndexCount(state, n) {
    state.indexCount = n
  },
  addIndexCount(state) {
    state.indexCount++
  }
}

// actions
const actions = {}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

### 抽离文件
项目较大时，推荐将`state`，`getters`、`mutations`、`actions`放在单独的文件中
- `src/store/index.js`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

- 在`src/store/`目录下新建`state.js`、`getters.js`、`mutations.js`、`actions.js`文件，分别用来存放`state`、`getters`、`mutations`、`actions`

### 分模块处理
项目较大时也可以分模块处理
比如`src/store/`目录下这种结构(`app`和`user`两个模块)
- `src/store/index.js`文件

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters
})

export default store
```

- `src/store/`目录下新建`getters.js`文件

```javascript
const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
}
export default getters
```

- `src/store/`目录下新建`modules/`目录
- `src/store/modules/`目录下新建`app.js`文件

```javascript
import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
```

- `src/store/modules/`目录下新建`user.js`文件，内容参考`app.js`

## vue文件中使用

- 修改`src/main.js`文件

```javascript
// ...
import store from './store'
// ...
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
```

- 读取`state`数据

```javascript
console.log(this.$store.state.indexCount)
```

- 使用辅助函数读取`state`数据

```javascript
import { mapState } from 'vuex'
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  }),
  // 也可以传一个数组
  // computed: mapState([
  //   // 映射 this.count 为 store.state.count
  //   'count'
  // ])
}
```

- 读取`getters`数据

```javascript
this.$store.getters.indexCount
```

- 使用辅助函数读取`getters`数据

```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // 方法类似mapState，同样也可以传入一个对象
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

- 使用`mutations`修改数据

```javascript
this.$store.commit('setIndexCount', 6)
```

- 使用辅助函数commit

```javascript
import {mapMutations} from 'vuex'
export default {
  // ...
  methods: {
  ...mapMutations({
      setCount: 'setIndexCount'
  }),
  // ...
  // this.setCount(6)
}
```

- 使用`actions`

```javascript
this.$store.dispatch('GetUserInfo')
```

- 使用辅助函数dispatch

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    // ...mapActions({
    //   add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    // })
  }
}
```

## js文件中使用

```javascript
import store from '../store/index'

console.log(store.state.indexCount)
store.commit('setIndexCount', 6)
```

## 参考链接
- [Vuex官方文档](https://vuex.vuejs.org/zh/)
