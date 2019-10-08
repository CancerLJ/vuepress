---
tags: 前端, vue
meta:
  - name: description
    content: Vue常用插件之vue-happy-scroll：基于vue2.0的滚动条插件
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,滚动条,vue-happy-scroll
---

# vue-happy-scroll

## 简介
解决原生滚动条在不同系统、不同浏览器中的丑陋表现，
在保证原生滚动条功能可用的基础上实现了更丰富的功能、保证在所支持的浏览器下展现出风格一致、交互体验一致的滚动条。

>- 保留原生滚动条功能
>- 支持动态设置滚动条颜色
>- 支持设置滚动条的位置。左右(竖向滚动条)、上下(横向滚动)方向
>- 支持隐藏滚动条
>- 支持动态设定滚动位置，并支持`top`与`left`值同步
>- 支持动态数据`resize`，滚动条自动隐藏与显示
>- 支持设置`resize`滚动条变化规则(e. 在`chart`应用中，来新消息时，滚动条始终在最底部)
>- 支持设置滚动速度
>- 支持设置隐藏滚动条，`hover`时显示

## 步骤
### 安装
- 安装：`npm i vue-happy-scroll --save`

### 引入
**全局引入**

- 修改`src/main.js`文件

```javascript
import Vue from 'vue'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

Vue.component('happy-scroll', HappyScroll)
```

**组件引入**

```javascript
import { HappyScroll } from 'vue-happy-scroll'
// 引入css，推荐将css放入main入口中引入一次即可。
import 'vue-happy-scroll/docs/happy-scroll.css'

export default {
  components: {
    HappyScroll
  } // 在组件内注册
}
```

### 使用

```html
<!-- 外层盒子 -->
<div style="height:200px;width:300px;background-color:#ccc;">
  <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
  <happy-scroll color="rgba(0,0,0,0.5)" size="5">
    <!-- 内层盒子——内容区 -->
    <div class="con">
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
      <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
    </div>
  </happy-scroll>
</div>
```

## API
### 属性

| 选项 | 默认值 | 类型 | 描述 |
| :-- | :-- | :-- | :-- |
| `color` | rgba(51,51,51,0.2) | String | 设置滚动条的颜色 |
| `size` | 4 | Number|String | 设置滚动条的大小 |
| `min-length-h` | 40 | Number | 横向滚动条最小的长度，当元素无限长或者宽的时候，会导致滚动条无限小，这种情况可以使用该属性。来设置最小的长度。当`min-length-h`小于`1`的时候，会将其当作`百分比`来处理 |
| `min-length-v` | 40 | Number | 竖向滚动条最小的长度，当元素无限长或者宽的时候，会导致滚动条无限小，这种情况可以使用该属性。来设置最小的长度。当`min-length-v`小于`1`的时候，会将其当作`百分比`来处理 |
| `scroll-top` | 0 | Number|String | 修饰符`sync`，在组件`mounted`之后，设置容器距离顶部的距离，相当于`element.scrollTop` |
| `scroll-left` | 0 | Number|String | 修饰符`sync`，在组件`mounted`之后，设置容器距离左边的距离，相当于`element.scrollLeft` |
| `hide-vertical` | false | Boolean | 隐藏竖向滚动条 |
| `hide-horizontal` | false | Boolean | 隐藏横向滚动条 |
| `resize` | false | Boolean | 开启监听容器大小变化 |
| `smaller-move-h` | '' | String | 容器大小变小时，横向滚动条移动的方向：可选值`start`、`end`，除此之外的其他值都认为是默认值。当`resize=true`时，此配置才有效 |
| `smaller-move-v` | '' | String | 容器大小变小时，纵向滚动条移动的方向：可选值`start`、`end`，除此之外的其他值都认为是默认值。当`resize=true`时，此配置才有效 |
| `bigger-move-h` | '' | String | 容器大小变大时，横向滚动条移动的方向：可选值`start`、`end`，除此之外的其他值都认为是默认值。当`resize=true`时，此配置才有效 |
| `bigger-move-v` | '' | String | 容器大小变大时，纵向滚动条移动的方向：可选值`start`、`end`，除此之外的其他值都认为是默认值。当`resize=true`时，此配置才有效 |
| `left` | false | Boolean | 设置竖向滚动条依靠在左边。默认竖向滚动条在右边 |
| `top` | false | Boolean | 设置横向滚动条依靠在上边。默认横向滚动条在下边 |
| `throttle` | 14 | Number | 鼠标拖动滚动条的节流时间，单位`ms`。如果没有特殊的要求不建议修改此值 |

### 事件

| 名称 | 参数 | 说明 |
| :-- | :-- | :-- |
| horizontal-start | scrollLeft | 监听横向滚动条滚动到头部的事件。当`scroll-left = 0`时会触发该事件 |
| horizontal-end | scrollLeft | 监听横向滚动条滚动到尾部的事件 |
| vertical-start | scrollTop | 监听竖向滚动条滚动到头部的事件。当`scroll-top = 0`时会触发该事件 |
| vertical-end | scrollTop | 监听竖向滚动条滚动到尾部的事件 |

## 参考链接
- [vue-happy-scroll](https://github.com/tangdaohai/vue-happy-scroll)