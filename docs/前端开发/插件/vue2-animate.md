---
meta:
  - name: description
    content: Vue常用插件之vue2-animate：CSS3动画效果
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,路由管理
---

# vue2-animate

## 安装
插件安装：`npm i vue2-animate --save`

## 使用

`src/main.js`入口文件中引入
```javascript
import 'vue2-animate/dist/vue2-animate.min.css'
```

在组件中使用
```html
<transition-group name="fadeLeft" tag="ul">
  <li v-for="item in items" v-bind:key="item">
    {{ item }}
  </li>
</transition-group>

<transition
  name="custom-classes-transition"
  enter-active-class="bounceLeft-enter"
  leave-active-class="bounceRight-leave"
>
  <p v-if="show">hello</p>
</transition>

<transition
  name="bounce"
  enter-active-class="bounceInLeft"
  leave-active-class="bounceOutRight"
>
  <p v-if="show">hello</p>
</transition>
```

## 参考链接
- [vue2-animate](https://www.npmjs.com/package/vue2-animate)
- [vue2使用animate css](https://blog.csdn.net/qq_25804071/article/details/70911421)

