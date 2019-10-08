---
meta:
  - name: description
    content: Vue常用插件之vue-clipboard2：Vue项目中实现剪切板功能
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,复制,粘贴,剪切板,vue-clipboard2
---

# vue-clipboard2

## 简介
`vue`项目如何实现剪切板功能

## 步骤
### 安装
- 安装插件：`npm i vue-clipboard2 --save`

### 引入
- 引入：修改`src/main.js`文件

```javascript
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
```

### 使用
**Sample 1**

```html
<div id="app"></div>
 
<template id="t">
  <div class="container">
    <input type="text" v-model="message">
    <button type="button"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
</template>
 
<script>
new Vue({
  el: '#app',
  template: '#t',
  data: function () {
    return {
      message: 'Copy These Text'
    }
  },
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      alert('Failed to copy texts')
    }
  }
})
</script> 
```

**Sample 2**

```html
<div id="app"></div>
 
<template id="t">
  <div class="container">
  <input type="text" v-model="message">
  <button type="button" @click="doCopy">Copy!</button>
  </div>
</template>

<script>
new Vue({
  el: '#app',
  template: '#t',
  data: function () {
    return {
      message: 'Copy These Text'
    }
  },
  methods: {
    doCopy: function () {
      this.$copyText(this.message).then(function (e) {
        alert('Copied')
        console.log(e)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    }
  }
})
</script> 
```

## 参考链接
- [vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)