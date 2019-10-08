---
meta:
  - name: description
    content: Vue常用插件之vue-infinite-scroll：Vue项目中上拉无限加载
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,seo,meta,vue-infinite-scroll
---

# vue-infinite-scroll

## 简介
在移动端开发中，一个列表往往默认只加载有限的几条，想看更多只能逐渐往下翻页
`Element UI`的开发者开发了一款专用于`Vue`的无限上拉加载插件`vue-infinite-scroll`

## 步骤
### 安装
- 安装：`npm i vue-infinite-scroll --save`

### 引入

- 修改`src/main.js`文件

```javascript
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)
```

### 使用

```html
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <div v-for="item in data" :key="item.index">{{item.name}}</div>
</div>

<script>
export default {
  data: {
    count: 0,
    data: [],
    busy: false
  },
  methods: {
    loadMore: function() {
      this.busy = true
      // 模拟Ajax请求
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({name: this.count++ })
        }
        this.busy = false
      }, 1000)
    }
  }
}
</script>
```

> **备注**
>- `v-infinite-scroll="loadMore"`：表示回调函数是`loadMore`
>- `infinite-scroll-disabled="busy"`：表示由变量`busy`决定是否执行`loadMore`(`false`则执行`loadMore`，`true`则不执行)，看清楚，`busy`表示繁忙，繁忙的时候是不执行的。
>- `infinite-scroll-distance="10"`：这里`10`决定了页面滚动到离页尾多少像素的时候触发回调函数，`10`是像素值。通常我们会在页尾做一个几十像素高的“正在加载中...”，这样的话，可以把这个`div`的高度设为 `infinite-scroll-distance`的值即可。

## API

| 选项 | 默认值 | 类型 | 描述 |
| :-- | :-- | :-- | :-- |
| `v-infinite-scroll` | | Function | 回调函数 |
| `infinite-scroll-disabled` | | Boolean | 是否执行回调，如果为`true`，则不执行 |
| `infinite-scroll-distance` | 0 | Number | 到底部最小像素，低于此像素会触发回调函数 |
| `infinite-scroll-immediate-check` | true | Boolean | 是否立即检查一次`disabled`和到达底部了(如果条件符合，会执行一次回调)，用来初始化数据 |
| `infinite-scroll-listen-for-event` | | | 当事件在`Vue`实例中发出时，无限滚动将再次检查 |
| `infinite-scroll-throttle-delay` | 200 | Number | 延时检查是否需要回调 |

## 参考链接
- [vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll)
