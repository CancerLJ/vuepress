---
meta:
  - name: description
    content: 汇总了一些原生Javascript常用的一些操作字符串方法
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,图片,字符串,string,常用方法
---

# 原生JS操作字符串汇总

## 获取字符串长度
获取字符串长度

```javascript
function getStrlength(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}
```