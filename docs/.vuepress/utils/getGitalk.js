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
        clientID: 'd0e63dba54396ae968b3',
        clientSecret: '476c20b360c4737b805ef6e171f555d271cd7595',
        repo: 'CancerLJ.github.io', // 存储评论的仓库名字
        owner: 'CancerLJ',
        admin: ['CancerLJ'],  //仓库的管理员，可以有多个
        id: decodeURI(path),      // 每个页面根据url生成对应的issue，保证页面之间的评论都是独立的
      })
      _gitalk.render('gitalk-container')
    }
  }
}