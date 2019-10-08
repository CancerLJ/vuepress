---
meta:
  - name: description
    content: Vue常用插件之vuex-persistedstate，存储到vuex的数据，在页面刷新时会重置，可以手动将数据存储到cookies、localStorage等地方。该插件就是自动存储插件
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,vuex,数据持久化
---

# vuex-persistedstate

## 简介
存储到vuex的数据，在页面刷新时会重置
可以手动将数据存储到cookies、localStorage等地方
使用该插件可以做到自动存储

## 安装
插件安装：`npm i vuex-persistedstate --save`

## 使用
修改`src/store/index.js`文件

```javascript
// ...
import createPersistedState from 'vuex-persistedstate'
// ...
export default new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})
```
