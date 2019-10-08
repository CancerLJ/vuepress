# document.ready小记

## 简介
`JavaScript`中的`window`对象有个事件`onload`。该事件在页面资源（比如js文件、图片和媒体资源等）加载完成后再执行

如果我们想在`DOM文档树`加载完之后执行一段代码，该如何做？

## 实现
### JQuery实现
`JQuery`中提供了一个比较常用的方法，用来在`DOM文档树`加载完成后自己执行

```javascript
$(document).ready(function() {
  // do something
})
```

### 自定义代码实现
`JavaScript`没有直接提供类似于`ready`方法，我们可以自己封装一个

```javascript
// 封装
(function () {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
  var fn = [];
  var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
  var d = document;
  d.readydom = function (f) {
    if (!ie && !wk && d.addEventListener)return d.addEventListener('DOMContentLoaded', f, false);
    if (fn.push(f) > 1) return;
    if (ie)(function () {  try { d.documentElement.doScroll('left'); run(); } catch (err) { setTimeout(arguments.callee, 0); }   })();
    else if (wk)   var t = setInterval(function () {   if (/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run();   }, 0);
  };
})();

// 使用
document.readydom(function() {
  // do something
})
```

