---
meta:
  - name: description
    content: 以引入微信的js文件为例介绍Vue引入第三方插件
  - name: keywords
    content: 喵巨人,前端,笔记,Vue,webpack,第三方插件
---

# Vue引入第三方插件

## 简介
Vue项目中经常会引入第三方插件
这里以引入微信的js文件为例（文件地址：https://res.wx.qq.com/open/js/jweixin-1.2.0.js）

## 具体步骤
### 全局引入一
- 修改全局模板文件`index.html`，引入js文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>xxx</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
  </body>
</html>
```

- 引入完成后可以通过`window.wx`来使用

### 全局引入二
- 修改全局模板文件`index.html`，引入js文件

- 如果不想带前面的`window`，可以修改`webpack`的配置文件。修改`build/webpack.base.conf.js`文件

```javascript
// ...
module.exports = {
  context: path.resolve(__dirname, '../'),
  // ...
  externals: {
    'wx': 'wx'
  }
}
```

- 在`vue`或`js`文件中使用

```javascript
import wx from 'wx'
console.log(wx)
```

### 单页面引入
如果项目中只有很少的一两个页面用到，不想全局引入的话，可以单页面引入

- 在`src/utils/`目录下新建文件`wx.js`

```javascript
export default {
  init () {
    return new Promise((resolve, reject) => {
      // 插入script脚本
      let scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js')
      document.body.appendChild(scriptNode)

      // 等待页面加载完毕回调
      window.onload = function () {
        resolve(window.wx)
      }
    })
  }
}
```

- 在`vue`或`js`文件中使用

```javascript
import wx from '@/utils/wx'
console.log(wx)
```


