const path = require('path')

module.exports = {
  title: '喵巨人笔记',
  description: '喵巨人学习笔记，包含前端开发、后端开发、服务器运维等',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  // palette: path.resolve(__dirname, 'palette.styl'),
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
          { text: '插件', link: '/前端开发/插件/' },
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
    sidebar: 'auto'
  }
}