---
tags: 前端, vue
meta:
  - name: description
    content: Vue常用插件之vue-waterfall2：Vue项目中使用瀑布流布局
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,瀑布流,vue-waterfall2
---

# vue-waterfall2

## 简介
`vue`的瀑布流布局插件

> 特点
>- 不需知道元素宽高，可宽高自适应
>- 支持无图模式,内容自定义程度高
>- 支持懒加载(`lazy-src`)
>- 提供Event:`loadmore` (pc/android端滑动到底部触发，ios端需要上拉触发)
>- 使用极为简便,适用于PC/ios/android

## 步骤
### 安装
- 安装：`npm i vue-waterfall2 --save`

### 引入
- 修改`src/main.js`

```javascript
import Vue from 'vue'
import waterfall from 'vue-waterfall2'

Vue.use(waterfall)
```

### 使用

```html
<div class="list-container" id="gameListContainer">
  <waterfall class="list" :col="waterfall.col" :data="list" @loadmore="loadmore" @scroll="scroll">
    <template>
      <list-item v-for="(item, index) in list" :key="index" :width="waterfall.width" :item="item" :index="index" :active="active" @change="handleChange"></list-item>
    </template>
  </waterfall>
</div>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: 4
    },
    width: {
      type: Number,
      default: 292
    },
    gutterWidth: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      active: -1,
      waterfall: {
        col: 3,
        width: 340
      }
    }
  },
  mounted() {
    this.calcWaterfall()
    window.addEventListener('resize', this.calcWaterfall)
  },
  destroyed() {
    window.removeEventListener('resize', this.calcWaterfall)
  },
  methods: {
    handleChange(index) {
      this.active = index
      // this.$emit('play', true)
    },
    loadmore(index) {
      // this.$emit('loadmore', index)
    },
    scroll(scrollData) {
      // this.$emit('scroll', scrollData)
    },
    calcWaterfall() {
      let elParent = document.getElementById('waterfallContainer')
      if (elParent) {
        let width = elParent.offsetWidth
        let col = Math.round((width + 20) / 360)
        this.waterfall.col = col < 1 ? 1 : col
        this.waterfall.width = col < 1 ? width : (width / col) - 20
      }
    }
  },
  components: {
    listItem
  }
}
</script>
```

> **备注**
>- `gutterWidth`需要与`width`一起使用才会生效，否则会进行自适应宽度(使用`rem`布局时，需先计算出自适应后的宽度再传值)
>- 使用了`waterfall`的父组件,如果样式存在问题，可去掉`css scoped`尝试一下

## API
### 属性

| Name | Default | Type | Desc |
| :-- | :-- | :-- | :-- |
| col | 2 | Number | 列数 |
| width | null | Number | 宽度 |
| gutterWidth | 10 | Number | 间隔的宽度 |
| data | [] | Array | 数据 |
| isTransition | true | Boolean | 加载图片是否使用过渡动画 |
| lazyDistance | 300 | Number | 触发图片懒加载的距离 |
| loadDistance | 300 | Number | 触发上拉加载更多的距离 |

### 懒加载
具体使用见：[vue-lazyload](http://www.wmm66.com/index/article/detail/id/47.html)

```html
<!-- demo -->
<waterfall :col='col' :data="data">
  <template>
    <img v-if="item.img" :lazy-src="item.img" alt="加载错误"  />
  </template>
</waterfall>
```

### Events

| Name | Data | Desc |
| :-- | :-- | :-- |
| loadmore | null | 滚动到底部触发 |
| scroll | obj | 获取滚动时的event对象 |

### $waterfall

```javascript
this.$waterfall.forceUpdate()   // forceUpdate
```

## 参考链接
- [vue-waterfall2](http://npm.taobao.org/package/vue-waterfall2)
