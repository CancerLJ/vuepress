---
meta:
  - name: description
    content: Vue常用插件之qrcode：生成图片二维码
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,二维码,qrcode
---

# qrcode

## 简介
`qrcode`是一个用于生成二维码图片的插件

## 步骤
### 安装
- 安装：`npm i qrcode --save`

### 引入
需要用到的页面组件或者js文件中直接引入

```javascript
import QRCode from 'qrcode'
```

### 使用

```html
<canvas id="canvas" style="width:300px;height:300px;"></canvas>

<script>
import QRCode from 'qrcode'
export default {
  mounted () {
    this.getCode()
  },
  methods: {
    getCode () {
      let canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, 'http://localhost:8080/home', { width: 200 }, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  }
}
</script>
```

## API
### options

| 名称 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| `errorCorrectionLevel` | String | M | 错误处理级别。可选值：`low`, `medium`, `quartile`, `high` or `L`, `M`, `Q`, `H` |
| `maskPattern` | Number | | 可选值：`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7` |
| `margin` | Number | 4 | |
| `scale` | Number | 4 | |
| `width` | Number | | |
| `color.dark` | String | #000000ff | |
| `color.light` | String | #ffffffff | |

### toCanvas
`toCanvas(canvasElement, text, [options], [cb(error)])`
`toCanvas(text, [options], [cb(error, canvas)])`
生成的二维码画到`canvas`上面。
不传`canvasElement`的话，会生成一个`canvas`

```javascript
QRCode.toCanvas('text', { errorCorrectionLevel: 'H' }, function (err, canvas) {
  if (err) throw err
  var container = document.getElementById('container')
  container.appendChild(canvas)
})
```

### toDataURL
`toDataURL(canvasElement, text, [options], [cb(error, url)])`
`toDataURL(text, [options], [cb(error, url)])`
返回一个`Data URI`，如果传`canvasElement`，会画到该`canvas`上面。

> options:
>- `type`：String，默认（`image/png`），可选值：`image/png`, `image/jpeg`, `image/webp`
>- `rendererOpts.quality`：Number，默认值（0.92），取值在`0~1`之间

```javascript
var opts = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  rendererOpts: {
    quality: 0.3
  }
}
 
QRCode.toDataURL('text', opts, function (err, url) {
  if (err) throw err

  var img = document.getElementById('image')
  img.src = url
})
```

### toString
`toString(text, [options], [cb(error, string)])`
返回二维码字符串

```javascript
QRCode.toString('http://www.google.com', function (err, string) {
  if (err) throw err
  console.log(string)
})
```

## 参考链接
- [qrcode](https://www.npmjs.com/package/qrcode)
