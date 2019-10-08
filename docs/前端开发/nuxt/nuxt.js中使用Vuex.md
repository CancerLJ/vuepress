# Nuxt.js中使用Vuex

`Nuxt`已经内置了`vuex`，不需要再次安装。
使用方法跟在`vue-cli`项目中基本一样

以`app`、`culture`、`interact`三个模块为例

## Classic(不建议使用)
- 在`store/`目录下新建`index.js`文件

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import app from './modules/app'
import culture from './modules/culture'
import interact from './modules/interact'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = () => { // 唯一区别：这里返回一个方法
  return new Vuex.Store({
    getters,
    modules: {
      app,
      culture,
      interact
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}

export default store
```

- 在`store/`目录下新建`modules/`目录
- 在`store/modules`目录下新建模块文件`app.js`、`culture.js`、`interact.js`
- 在`store/`目录下新建`getters.js`文件

具体不在累述，可参考 [Vue常用插件：vuex](http://www.wmm66.com/index/article/detail/id/41.html)

## 模块方式(推荐)
- 在`store/`目录下新建`app.js`文件

```javascript
export const state = () => ({ // 用方法的形式返回
  loadingFlag: true,
  openTime: (new Date()).getTime(),
  curVideo: null
})

export const mutations = {
  setLoadingFlag(state, flag) {
    state.loadingFlag = flag
  },
  setOpenTime(state, time) {
    state.openTime = time
  },
  setCurVideo(state, video) {
    state.curVideo = video
  }
}
```

- 在`store/`目录下新建`culture.js`、`interact.js`文件，类似`app.js`
- 在`store/`目录下新建`getters.js`

```javascript
const getters = {
  // app
  loadingFlag: state => state.app.loadingFlag,
  openTime: state => state.app.openTime,
  curVideo: state => state.app.curVideo,
  // ...
}

export default getters
```

页面中使用的时候也是分模块使用的
```javascript
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['cartoon', 'chapters'])
  },
  methods: {
    ...mapMutations({
      setChapter: 'culture/setChapter'
    }),
    // ...
  }
}
```

添加`Vuex`模块，比如`vuex-persistedstate`

- 在`store/`目录下新建`index.js`

```javascript
import createPersistedState from 'vuex-persistedstate'
export const plugins = [ createPersistedState() ]
```
