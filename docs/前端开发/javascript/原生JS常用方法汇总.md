---
meta:
  - name: description
    content: 汇总了一些原生Javascript常用的一些方法
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,常用方法
---

# 原生JS常用方法汇总

## 深拷贝
对象、数组的深拷贝实现
简单的对象或者数组，比较常用的`JSON.parse(JSON.stringify(obj))`
以下方法适用于较为复杂的对象或者数组的深拷贝

```javascript
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys]
    }
  });
  return targetObj;
}
```

## 获取随机颜色
生成一个随机颜色的色值,`#ffffff`的形式

```javascript
function getRandomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  const color = r << 16 | g << 8 | b;
  return "#" + color.toString(16);
}
```

## 生成随机码
随机生成一串随机码，要求有的位置是固定的数字，有的位置做一些处理。用于校验

```javascript
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

>**备注**：
>- `(r & 0x3 | 0x8)`：按照位进行与或计算。比如`r=15`即`1111`；`r & 0x3`就是`0011`；`r & 0x3 | 0x8`就是`1011`即`11`
>- `v.toString(16)`：将数字转为字符，按照十六进制的方式转
>- `x`：所在位置随机替换成一个字母
>- `y`：所在位置随机替换成一个计算后的字母，计算出来的是`10**`
>- `4`：所在位置不替换，保留原来的`4`
