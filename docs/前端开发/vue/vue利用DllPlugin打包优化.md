---
meta:
  - name: description
    content: vue-cli项目，利用webpack自带的DllPlugin进行打包优化，将第三方插件单独打包
  - name: keywords
    content: 喵巨人,笔记,vue,vue-cli,webpack,Dll
---

# Vue利用DllPlugin打包优化

## 简介
`Vue`项目一般会安装一些依赖模块，比如：`vue`、`vuex`、`vue-router`、`axios`、`element-ui`等等

使用脚手架`vue-cli`生成的项目，安装的依赖模块都一起打包到了`dist/static/js/vendor.xxxx.js`文件中，导致该文件比较大。
每次修改重新打包后，该文件的文件名会跟随hash变化（防止缓存），用户浏览需要重新下载该文件。

常用依赖模块确定好版本，通过`npm`安装后，一般不会修改，没有必要每次修改都重新下载。可以将这些依赖模块打包到一个文件名不带hash的文件中，在浏览器端缓存起来

常用的优化办法是使用CDN地址。
本文介绍的是另外一种方法，使用`wepack`的`DllPlugin`单独打包模块js

## 具体步骤
### 编写依赖模块打包文件
在`build`目录下新建文件`webpack.dll.conf.js`。

```javascript
var path = require("path");
var webpack = require("webpack");

module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue/dist/vue.esm.js', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' 
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    }),
    // 压缩打包的文件，与该文章主线无关
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    })
  ]
};
```

**这里引入的`Dllplugin`插件，该插件将生成一个`manifest.json`文件，该文件供`webpack.config.js`中加入的`DllReferencePlugin`使用，使我们所编写的源文件能正确地访问到我们所需要的静态资源（运行时依赖包）。**

### 配置模块打包命令
修改 `package.json`文件，在`scripts`中添加代码`"dll": "webpack --config build/webpack.dll.conf.js",`

### 预打包依赖模块
执行命令`npm run dll`进行模块打包

打包后在根目录下会出现文件`vendor-manifest.json`；该文件是供`webpack.config.js`中加入的`DllReferencePlugin`使用，这个在后面配置
在`static/js`目录下会出现文件`vendor.dll.js`；该文件就是插件打包后的js文件

**备注：**
1、预打包需要将文件打包的`static`目录下。因为对项目进行打包的时候，会自动将static目录下的所有文件复制到`dist/static`目录下。
2、预打包只打包一次即可。只要有相应的`vendor-manifest.json`和`static/js/vendor.dll.js`即可
3、如果修改了`build/webpack.dll.conf.js`，当然需要重新运行命令这个预打包依赖模块的命令，重新生成这两个文件

### 修改打包配置文件
修改`build/webpack.dev.conf.js`和`build/webpack.prod.conf.js`，在`plugins`配置中添加`DllReferencePlugin`插件配置

```javascript
new webpack.DllReferencePlugin({
   context: __dirname,
   manifest: require('../vendor-manifest.json')
})
```

### 修改index.html
修改根目录下的`index.html`，在`body`中手动引入`static/js/vendor.dll.js`

```html
<script type="text/javascript" src="./static/js/vendor.dll.js"></script>
```

以上都修改完成后即可`npm run dev`或者`npm run build`正常打开本地服务器或者打包项目了