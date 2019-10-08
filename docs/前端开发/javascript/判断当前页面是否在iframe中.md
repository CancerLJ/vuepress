# 判断当前页面是否在iframe中

## window
在应用有`frameset`或者`iframe`的页面时，有几个窗口的概念

- `window.self`：是对当前窗口自身的引用。与`window`、 `window.self`等价
- `window.parent`：返回父窗口。
- `window.top`：返回最顶级的父窗口（有的窗口中套了好几层frameset或者iframe）

## 原理
当前页面没有父窗口时，`window.parent`和`window.top`都返回对当前窗口的引用。
可以通过判断`window.parent`或`window.top`是否是当前窗口来区分当前页面是否在iframe中。

```javascript
if (window.parent == window) {
    // 当前页面不在iframe中
} else {
    // 当前页面在iframe或者frameset中
}
```