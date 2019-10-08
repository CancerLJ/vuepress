---
meta:
  - name: description
    content: 整理的一些Vue知识点
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插槽,过滤器,自定义指令,混入,自定义插件
---

# vue备忘

## 插槽
- 子组件`child.vue`

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

- 父组件`parent.vue`

```html
<sub-item>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</sub-item>

<script>
import subItem from './child'

export default {
  components: {
    subItem
  }
}
</script>
```

## 过滤器
### 局部注册
- 在`src/`目录下新建目录`filters/`
- 在`src/filters/`目录下新建文件`formatTime.js`，注册单个过滤器

```javascript
import Vue from 'vue'

// 时间戳转换 yy-mm-dd hh:mm:ss 格式
Vue.filter('formatTime', function(value) {
  if (!value) {
    return ''
  }

  var date = new Date()
  date.setTime(Number(value) * 1000)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
})
```

- 页面组件中使用

```html
<span>{{item.create_at | formatTime}}</span>
<!-- 或者 v-bind中使用 -->
<div v-bind:id="item.create_at | formatTime"></div>

<script>
import '@/filters/formatTime'
</script>
```

### 全局注册
- 在`src/`目录下新建目录`filters/`
- 在`src/filters/`目录下新建文件`index.js`，所有的过滤器方法写在这里

```javascript
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
```

- 修改`src/main.js`文件，注册过滤器

```javascript
import Vue from 'vue'
// ...
import * as filters from './filters' // 全局filter
// ...

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
```

- 页面组件中使用

```html
<span>{{item.create_at | formatTime}}</span>
<!-- 或者 v-bind中使用 -->
<div v-bind:id="item.create_at | formatTime"></div>
```

### 组件注册
在页面组件中，单独给这个组件添加本地的过滤器

```javascript
export default {
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
```

## 自定义指令
### 全局注册
- 在`src/`目录下新建目录`directives/`目录
- 在`src/directives/`目录下新建文件`scroll-back.js`

```javascript
import Vue from 'vue'
import router from '../router'

Vue.directive('scroll-back', {
  inserted: function(el, binding) {
    let startPos = {x: 0, y: 0}
    let endPos = {x: 0, y: 0}
    el.addEventListener('touchstart', e => {
      if (!e.touches.length) {
        return
      }
      startPos.x = e.touches[0].pageX
      startPos.y = e.touches[0].pageY
      endPos.x = 0
      endPos.y = 0
    })

    el.addEventListener('touchmove', e => {
      if (!e.touches.length) {
        return
      }
      endPos.x = e.touches[0].pageX
      endPos.y = e.touches[0].pageY
    })

    el.addEventListener('touchend', e => {
      // 位移小于100的不翻页
      let offsetX = endPos.x - startPos.x
      let offsetY = endPos.y - startPos.y
      if (offsetX > 100 && offsetX > Math.abs(offsetY)) {
        router.ret()
      }
    })
  }
})
```

- 修改`src/main.js`文件，全局引入自定义指令

```javascript
// ...
// 自定义指令
import './directives/scroll-back'
// ...
```

### 局部注册
在页面组件中，单独给这个组件添加该组件可以使用的自定义指令

```javascript
export default {
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
```

指令也可以写到单独的文件中，比如：

- 在`src/`目录下新建目录`directives/`目录
- 在`src/directives/`目录下新建文件`focus.js`

```javascript
export default {
  {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

- 在页面组件中

```javascript
import focus from '@/directive/focus.js'
export default {
  directives: {
    focus
  }
}
```

### 组件中使用

```html
<div v-scroll-back></div>
```

## 混入
混入(`mixin`)提供了一种非常灵活的方式，来分发`Vue`组件中的可复用功能。
一个混入对象可以包含任意组件选项。
当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项，在发生冲突时以组件数据优先。

### 局部混入

- 在`src/`目录下新建目录`mixins/`
- 在`src/mixins/`目录下新建文件`user.js`

```javascript
export default {
  props: {
    myself: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prefixStr() {
      return this.myself ? '我' : 'TA'
    }
  }
}
```

- 在页面组件中

```javascript
import userMixin from 'mixins/user'

export default {
  mixins: [userMixin]
}
```

### 全局混入
**使用时格外小心！**一旦使用全局混入，它将影响每一个之后创建的`Vue`实例。
使用恰当时，这可以用来为自定义选项注入处理逻辑。

- 修改`src/main.js`文件

```javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created() {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  // ...
})
```

## 自定义插件

## 渲染函数

## 过渡动画
