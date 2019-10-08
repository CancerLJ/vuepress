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