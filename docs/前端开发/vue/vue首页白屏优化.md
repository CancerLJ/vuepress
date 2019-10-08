---
meta:
  - name: description
    content: vue首页会加载很多东西，导致首页页面打开速度慢，白屏问题的优化
  - name: keywords
    content: 喵巨人,笔记,Vue
---

# Vue首页白屏优化

## 开启路由懒加载
开启了以后不同的路由组件可以分成不同的代码，从而实现进入相应页面以后才加载相关代码

```javascript
const admin = res => require(['@/views/admin'], res)
```

## 开启GZip压缩
后端用的是nginx，稍微配置即可开启gzip
修改Nginx的配置文件`nginx.conf`

```nginx
gzip on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_comp_level 5;
gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php;
```

## 关闭map
修改`config/index.js`文件

```javascript
bulid: {
    productionSourceMap: false
}
```

## 分离部分插件
用webpack的extension，把不需要打包的库文件分离出来，减小打包后文件的大小
分离出来的文件可以用CDN

修改`index.html`文件，引入要分离的插件
```html
<script src="//cdn.bootcss.com/vue/2.2.5/vue.min.js"></script>
<script src="//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
<script src="https://cdn.bootcss.com/axios/0.16.2/axios.min.js"></script>
<!-- <script src="https://cdn.bootcss.com/axios/0.11.0/axios.min.js"></script> -->
<!-- <script src="https://unpkg.com/vue-lazyload/vue-lazyload.js"></script> -->
<script src="https://cdn.bootcss.com/moment.js/2.18.1/moment.js"></script>
<script src="https://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>
```

修改`build/webpack.base.conf.js`文件，配置分离的插件
```javascript
module.exports = {
    output: {
        // ...
    },
    // 插入此部分内容
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        // 'vue-lazyload': 'VueLazyload',
        'moment': 'moment',
        // 'element-ui': 'element-ui'
    }
}
```
**备注**：externals的左边是给 require用的 ,右边是给全局调用的

去掉`main.js`等文件中使用`import`引入这些插件的代码

## 使用服务器端渲染（SSR）
常用的`nuxt.js`


## 参考链接
- [Vue首页加载速度优化](https://blog.csdn.net/haojie6091/article/details/81670154)
- [vue异步组件(高级异步组件)使用场景及实践](https://segmentfault.com/a/1190000012138052)
- [vue-cli的webpack模板项目配置文件分析](https://www.cnblogs.com/sxz2008/p/6699127.html)