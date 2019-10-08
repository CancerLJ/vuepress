---
meta:
  - name: description
    content: Vue常用插件之vue-photo-preview：图片查看器
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,图片查看器
---

# vue-photo-preview

## 简介
- `Vue`中的图片查看器插件
- 可以用来放大展示图片
- 复用的组件，有时候图片不能及时更新，可以使用`this.$previewRefresh()`手动更新

## 安装
插件安装：`npm i vue-photo-preview --save`

## 使用
- `src/main.js`入口文件中引入

```javascript
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(preview, {
  fullscreenEl: false, // 关闭全屏按钮
  zoomEl: false, // 关闭放大按钮
  tapToClose: true, // 点击关闭图片
  loadingIndicatorDelay: 10
})
```

- 在`vue组件`中使用
```html
<img src="img.imgUrl" :preview="index" preview-text="描述文字">
```

## 参考链接
- [vue前端开发--图片查看大图插件 vue-photo-preview](https://blog.csdn.net/wcharles666/article/details/81332867)

