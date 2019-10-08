---
tags: 前端, vue
meta:
  - name: description
    content: VuePress从零开始搭建、使用笔记
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,vue,Markdown,部署,文档
---

# VuePress简单教程

## 简介
`VuePress`是以`Vue`驱动的静态网站生成器，是一个由`Vue`、`Vue Router`和`webpack`驱动的单页应用。在`VuePress`中，你可以使用`Markdown`编写文档，然后生成网页，每一个由`VuePress`生成的页面都带有预渲染好的`HTML`，也因此具有非常好的加载性能和搜索引擎优化。同时，一旦页面被加载，`Vue`将接管这些静态内容，并将其转换成一个完整的单页应用，其他的页面则会只在用户浏览到的时候才按需加载。

> `VuePress`具有以下特性
>- 为技术文档而优化的内置`Markdown`拓展
>- 在`Markdown`文件中使用`Vue`组件的能力
>- `Vue`驱动的自定义主题系统
>- 自动生成`Service Worker`(支持PWA)
>- `Google Analytics`集成
>- 基于`Git`的"最后更新时间"
>- 多语言支持
>- 响应式布局

## 环境搭建

- 全局安装`vuepress`：`npm i vuepress -g`
- 新建项目目录`vuepress/`，作为根目录，放置此项目代码
- 在终端中打开此目录，初始化项目`npm init -y`
- 修改`package.json`文件，添加两条命令

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- 在根目录下新建`docs/`目录
- 在`docs/`目录下新建`.vuepress/`目录
- 在`docs/.vuepress/`目录下新建`public/`目录和`config.js`文件
- 将`ico文件`、`图片文件`等放到`docs/.vuepress/public/`目录下

```javascript
// config.js
module.exports = {
  title: '喵巨人笔记',
  description: '喵巨人学习笔记，包含前端开发、后端开发、服务器运维等',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ]
}
```

- 在`docs/`目录下新建文件`README.md`。这个就是站点的首页

```yaml
---
home: true
heroImage: images/logo.png
# actionText: 快速上手 →
# actionLink: /zh/guide/
# features:
# - title: 简洁至上
#   details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
# - title: Vue驱动
#   details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
# - title: 高性能
#   details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: 喵巨人笔记 © 2019-2020
---
```

- 运行命令`npm run docs:dev`，然后在浏览器中打开`http://localhost:8080`

## 示例
在`docs/`目录下新建目录和`.md`文件，编写文档即可，
该示例使用的是`vuepress`的默认主题
以下是示例项目的目录结构截图

![image.png](http://www.wmm66.com/uploads/20190911/e39050984350009ab3819fe1aa50f3d7.png)

`docs/.vuepress/config.js`的配置如下

```javascript
module.exports = {
  title: '喵巨人笔记',
  description: '喵巨人学习笔记，包含前端开发、后端开发、服务器运维等',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    // displayAllHeaders: true,
    // permalink: "/:year/:month/:day/:slug",
    nav: [
      {
        text: '前端开发',
        items: [
          { text: 'CSS', link: '/前端开发/css/' },
          { text: 'JavaScript', link: '/前端开发/javascript/' },
          { text: 'vue', link: '/前端开发/vue/' },
          { text: 'nuxt', link: '/前端开发/nuxt/' },
          { text: '其他', link: '/前端开发/other/' }
        ]
      },
      { text: 'php', link: '/php/' },
      { text: 'linux', link: '/linux/' },
      {
        text: '其他',
        items: [
          { text: 'Markdown简介', link: '/其他/Markdown简介' },
        ]
      },
      { text: '关于', link: '/关于作者' }
    ],
    // sidebar: 'auto',
    sidebar: {
      '/前端开发/other/': [
        '日志统计JSSDK示例',
        '微信自定义分享链接和图文',
        '微信输入表单时的安全提示去除',
        '清除微信浏览器缓存',
        '网站中的中文字体处理',
        '自动化构建工具gulp入门'
      ],
      '/前端开发/css/': [
        'Flex布局笔记'
      ],
      '/前端开发/javascript/': [
        '数组Array属性和方法整理',
        '正则表达式笔记',
        '原生JS操作Dom方法汇总',
        'Ajax上传图片',
        'document.ready小记',
        'HTML5中的video标签',
        'userAgent笔记',
        '如何判断当前页面是否在iframe中',
        '控制input只能输入数值'
      ],
      '/前端开发/vue/': [
        'vue项目常见问题',
        'vue项目打包后本地预览',
        'vue常用插件汇总',
        'vue引入第三方插件',
        'vue首页白屏优化',
        'vue多页面开发配置',
        'vue利用DllPlugin打包优化',
        'protobuf在vue项目中使用'
      ],
      '/前端开发/nuxt/': [
        'nuxt.js入门笔记',
        'nuxt.js中使用Vuex',
        'nuxt.js项目部署'
      ],
      '/php/': [
        'ThinkPHP跨域问题处理',
        'ThinkPHP5 部署优化',
        'thinkcmf在apache中无法启用rewrite的修改办法'
      ],
      '/linux/': [
        'Linux命令学习',
        'Linux下LNMP环境简介',
        'Linux下SVN服务器搭建和配置',
        'crontab常用命令'
      ],
      '/其他/': [
        'Markdown简介'
      ],
    },
  }
}
```

### 样式修改
- 在`docs/.vuepress/`目录下新建`styles/`目录
- 在`docs/.vuepress/styles/`目录下新建文件`palette.styl`

```stylus

// $accentColor =blue //默认主题颜色
// $textColor = red //默认字体颜色
// $borderColor = #eaecef //默认边框颜色
// $codeBgColor = #282c34 //默认背景颜色
 
// //示例修改相关样式f12找到需要修改的地方找到对应class类拿过来直接用就行了
// .sidebar-group.is-sub-group > .sidebar-heading:not(.clickable){
//   opacity :1
// }


$contentWidth = 90%

.page
  .list
    .item
      padding: 1rem 0
      border-bottom: 1px solid #eaecef
      &:last-child
        border: none
      .title
        display: block
        line-height: 1.7
        font-weight: 500
        color: #1e90ff
        text-decoration: none
        font-size: 18px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .desc
        font-size: 14px
  .footer
    padding: 1rem
    text-align: center
    color: #4e6e8e
    border-top: 1px solid #eaecef
    p
      line-height: 1.2
```

### 首页配置
这里首页我们使用自定义的样式

- 修改`docs/README.md`文件

```yaml
---
# home: true
navbar: true
isNoPage: true
sidebar: false
# pageClass: home-list
---

<home />
```

- 在`docs/.vuepress/`目录下新建`components`目录
- 在`docs/.vuepress/components`目录下新建文件`home.vue`

```html
<template>
  <div class="home-page page">
    <img class="logo" src="images/logo.png" alt="logo" />
    <div class="main">
      <div class="list">
        <div class="item" v-for="(item, index) in arts" :key="index">
          <div class="title"><a :href="item.path">{{ item.title }}</a></div>
          <div class="desc">{{ getDescription(item) }}</div>
        </div>
      </div>
    </div>
    <com-footer />
  </div>
</template>

<script>
import { getDescription } from '../utils/page'

export default {
  data() {
    return {
      arts: []
    }
  },
  created() {
    this.arts = this.$site.pages.filter(item => {
      return !item.frontmatter || !item.frontmatter.isNoPage
    })
  },
  methods: {
    getDescription
  }
}
</script>
```

- 在`docs/.vuepress/utils`目录下新建文件`page.js`

```javascript
export function getDescription(item) {
  let desc = item.title
  if (item.frontmatter.meta) {
    item.frontmatter.meta.forEach(meta => {
      if (meta.name == 'description') {
        desc = meta.content
        return
      }
    })
  }
  return desc
}
```

> **备注：**
>- 每个`markdown`文件，如果需要写`description`，使用下面这种方式写
> ```yaml
> meta:
>  - name: description
>    content: 整理的一些Vue知识点
>  - name: keywords
>    content: 喵巨人,前端,笔记,vue,插槽,过滤器,自定义指令,混入,自定义插件
> ```

### 标签实现
每个`markdown`文件，如果有标签，使用下面这种方式写

```yaml
tags: 前端, vue
```

```javascript
export default {
  data() {
    return {
      arts: [],
      tags: [],
      activeTag: ''
    }
  },
  computed: {
    list() {
      if (this.activeTag === '') return this.arts
      
      return this.arts.filter(item => {
        const tags = item.frontmatter.tags || ''
        if (tags == '') return false

        const tagsArr = tags.split(",").filter(i => i !== "")
        return tagsArr.indexOf(this.activeTag) != -1
      })
    }
  },
  created() {
    // arts
    this.arts = this.$site.pages.filter(item => {
      return !item.frontmatter || !item.frontmatter.isNoPage
    })

    // 所有标签
    const tags = this.$site.pages.map(item => {
      return item.frontmatter && item.frontmatter.tags || ""
    })
    const tagsArr = tags.join(",").split(",").filter(i => i !== "")
    this.tags = [...new Set(tagsArr)]
  },
  methods: {
    handleChangeTag(item) {
      this.activeTag = item
    }
  }
}
```

### 列表页-固定配置
比如：在`docs/前端开发/vue/README.md`文件中，读取`docs/前端开发/vue/`下面的文件，以列表的形式展示链接

```markdown
# Vue

## 目录
<ul>
  <li v-for="(menu, index) in menus"><a :href="`${path}${menu}.html`">{{menu}}</a></li>
</ul>

<script>
export default {
  data() {
    return {
      path: '',
      menus: []
    }
  },
  created() {
    this.path = decodeURIComponent(this.$page.path)
    this.menus = this.$themeConfig.sidebar[this.path]
  }
}
</script>
```

其他目录下的`README.md`文件可能也需要，我们封装一下，使用`vue`的`mixin`

- 在`docs/.vuepress/`目录下新建目录`mixins/`
- 在`docs/.vuepress/mixins/`目录下新建文件`category.js`

```javascript
export default {
  data() {
    return {
      path: '',
      menus: []
    }
  },
  created() {
    this.path = decodeURIComponent(this.$page.path)
    this.menus = this.$themeConfig.sidebar[this.path]
  }
}
```

- 修改`docs/前端开发/vue/README.md`文件

```markdown
# Vue

## 目录
<ul>
  <li v-for="(menu, index) in menus"><a :href="`${path}${menu}.html`">{{menu}}</a></li>
</ul>

<script>
import categoryMixin from '../../.vuepress/mixins/category'

export default {
  mixins: [categoryMixin]
}
</script>
```

### 列表页-自动配置
上面的方法，每个列表页如果要加新的文章，都需要在`docs/.vuepress/config.js`中配置
我们修改成新建`markdown`文档后，列表页自动更新的形式，列表页样式放在组件中写

- 修改`docs/.vuepress/config.js`中配置

```javascript
module.exports = {
  // ...
  themeConfig: {
    // ...
    sidebar: 'auto'
  }
  // ...
}
```

- 在`docs/.vuepress/components/`目录下新建文件`category.vue`

```html
<template>
  <div class="category-page page">
    <div class="list">
      <div class="item" v-for="(item, index) in arts" :key="index">
        <div class="title"><a :href="item.path">{{ item.title }}</a></div>
        <div class="desc">{{ getDescription(item) }}</div>
      </div>
    </div>
    <com-footer />
  </div>
</template>

<script>
import { getDescription } from '../utils/page'

export default {
  data() {
    return {
      arts: []
    }
  },
  created() {
    const curPath = this.$page.path
    this.arts = this.$site.pages.filter(item => {
      return item.path !== curPath && item.path.indexOf(curPath) === 0
    })
  },
  methods: {
    getDescription
  }
}
</script>
```

- 修改`docs/前端开发/vue/README.md`文件

```yaml
---
isNoPage: true
sidebar: false
---

# Vue

<category />
```

项目效果：[VuePress项目示例](http://vuepress.wmm66.com/)

## 复制时显示版权信息
复制博客文字时，自动添加版权信息

- 在`docs/.vuepress/utils/`目录下添加文件`copy.js`

```javascript
export default () => {
  function addCopy(e) {
    let copyTxt = ""
    e.preventDefault() // 取消默认的复制事件
    copyTxt = window.getSelection(0).toString()
    copyTxt = `${copyTxt}\n作者：喵巨人\n原文：${window.location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
    const clipboardData = e.clipboardData || window.clipboardData
    clipboardData.setData('text', copyTxt)
  }
  document.addEventListener("cut", e => {
    addCopy(e)
  })
  document.addEventListener("copy", e => {
    addCopy(e)
  })
}
```

- 在`docs/.vuepress/`目录下添加文件`enhanceApp.js`

```javascript
import copy from './utils/copy'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  setTimeout(() => {
    try {
      document && (() => { //对document的判断是防止编译的时候报错
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  },500)
}
```

- 这样就实现了

## 添加评论
以`GitTalk`为例
这里通过js将评论需要的js和css用js动态插入到页面中

- 注册账号[Register a new OAuth application](https://github.com/settings/applications/new)

![Register a new OAuth application]()

- 在`docs/.vuepress/utils/`目录下添加文件`getGitalk.js`

```javascript
export default ({pages})=> {
  const path = window.location.pathname
  // 获取当前页面信息
  const dist = pages.filter(item => {
    return item.path === path
  })[0]

  //只有在isNoPage是false的时候才会显示评论
  if (!dist.frontmatter || !dist.frontmatter.isNoPage) {
    const page =document.querySelector('.page')

    const linkGitalk = document.createElement('link');
    linkGitalk.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css';
    linkGitalk.rel = 'stylesheet';
    document.body.appendChild(linkGitalk);

    const scriptGitalk = document.createElement('script');
    scriptGitalk.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    document.body.appendChild(scriptGitalk);

    scriptGitalk.onload= () => {
      let gitalk = document.createElement('div')
      gitalk.id = 'gitalk-container'
      page.appendChild(gitalk)
      var _gitalk = new Gitalk({
        clientID: 'xxxxxxxxxxx', // 修改成自己的
        clientSecret: 'xxxxxxxxxxxxx',  // 修改成自己的
        repo: 'xxxx.github.io', // 存储评论的仓库名字。修改成自己的
        owner: 'xxxx',  // 修改成自己的
        admin: ['xxxx'],  //仓库的管理员，可以有多个。修改成自己的
        id: decodeURI(path),      // 每个页面根据url生成对应的issue，保证页面之间的评论都是独立的
      })
      _gitalk.render('gitalk-container')
    }
  }
}
```

- 修改`docs/.vuepress/enhanceApp.js`文件

```javascript
import copy from './utils/copy'
import getGitalk from "./utils/getGitalk"

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  setTimeout(() => {
    try {
      document && (() => { //对document的判断是防止编译的时候报错
        getGitalk.call(this, siteData)
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  },500)
}
```



## 部署
- 运行命令`npm run docs:build`打包项目，打包后会在`docs/.vuepress/dist/`目录下生成打包后的静态文件

由于构建的时候生成静态页面，所以将`docs/.vuepress/dist/`文件夹中的内容可以部署在`gitHub`的`pages`或者`coding`的`pages`都可以。
也可以搭建一个静态的服务器放置，比如使用`Nginx`

### 使用Nginx
- 将`docs/.vuepress/dist/`目录下的文件上传到服务器，比如：`/data/www/vuepress/`目录
- 配置`Nginx`的虚拟主机指向此目录

```conf
server {
    listen 80;
    server_name vuepress.wmm66.com;
    index index.html;

    root /data/www/vuepress;
    access_log /data/logs/nginx/vuepress.wmm66.com_access.log access;
    error_log  /data/logs/nginx/vuepress.wmm66.com_error.log error;
    error_page 404 /404.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
    if ($http_user_agent ~ ^$) {
        return 403;
    }
}
```

- 重启`Nginx`

### git上传GitHub
如果使用`git`上传到`github`上，操作比较繁琐，这里使用脚本的方式自动部署到`github`上。

- 在`docs/.vuepress/config.js`中设置正确的`base`
如果你打算发布到`https://<USERNAME>.github.io/`，则可以省略这一步，因为`base`默认即是`/`。
如果你打算发布到`https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在`https://github.com/<USERNAME>/<REPO>`），则将`base`设置为`/<REPO>/`。

- 在根目录下创建文件`deploy.sh`

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

- 修改`package.json`文件

```json
{
  "scripts": {
    "deploy": "bash deploy.sh"
  },
}
```

- 运行`npm run deploy`即可自动构建部署到`github`上。
