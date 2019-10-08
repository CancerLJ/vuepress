---
meta:
  - name: description
    content: Vue常用插件之vue-lazyload：图片懒加载
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,图片懒加载
---

# vue-lazyload

## 简介
- `Vue`中的图片懒加载插件
- 可以用于图片列表或者背景图片的延时加载
- 如果有组件服用问题，需要添加`key`属性来确保数据变化后更新视图

## 安装
插件安装：`npm i vue-lazyload --save`

## 使用
- `src/main.js`入口文件中引入

```javascript
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
```

- 在`vue组件`中使用

```html
<div class="post_item_imgs clearfix">
  <div class="post_item_imgs_div"
    :class="{heng:img.type==1||img.type==4}"
    v-for="(img, i) in item.imgs" :key="img.imgUrl+i"
    v-lazy:background-image="img.imgUrl"
  >
    <img v-lazy="img.imgUrl" :key="img.imgUrl" :preview="index" @click.stop class="needsclick">
  </div>
</div>
```
