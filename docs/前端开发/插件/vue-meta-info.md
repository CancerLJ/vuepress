---
meta:
  - name: description
    content: Vue常用插件之vue-meta-info：Vue项目中使用SEO-动态生成meta标签
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,seo,meta,vue-meta-info
---

# vue-meta-info

## 简介
基于`Vue 2.0`的单页面`meta info`管理
`VUE(SPA)`项目中使用`SEO`-动态生成`META`标签

## 步骤
### 安装
- 安装：`npm i vue-meta-info --save`

### 引入
- 修改`src/main.js`文件，全局引用

```javascript
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'
 
Vue.use(MetaInfo)
```

### 静态使用
- 在页面组件中使用

```javascript
export default {
  metaInfo: {
    title: 'My Example App', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'My Example App'
    }]
    link: [{                 // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  }
}
```

### 动态使用
这种方式可以动态生成META标签的内容，一般META标签的内容需要根据变量去变化的时候，可以选用这种方式

- 在页面组件中使用

```javascript
export default {
  metaInfo () {
    return {
      title: `${this.companyinfo.FirmName || ''} - Game Advisor`,
      meta: [{
        name: 'keywords',
        content: `${this.companyinfo.FirmName}`
      }]
    }
  }
}
```

## 参考链接
- [vue-meta-info](https://www.npmjs.com/package/vue-meta-info)
