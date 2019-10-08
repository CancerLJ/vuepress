---
meta:
  - name: description
    content: 汇总了一些原生Javascript常用的一些操作图片方法
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,图片,img,image,常用方法
---

# 原生JS操作图片汇总

## 获取图片真实尺寸
根据图片地址，获取该图片的实际宽度和高度

```javascript
let img = new Image()
img.src = 'https://www.baidu.com/img/bd_logo1.png?qua=high'
img.onload = function() {
  let nWidth = img.naturalWidth;
  let nHeight = img.naturalHeight;
  console.log(nWidth, nHeight)
}
```

## 文件转成二进制
使用`input['file']`等获取的文件DataURI，将其转成二进制数据

```javascript
function convertDataURIToBinary(dataURI) {
  var BASE64_MARKER = ';base64,';
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
```