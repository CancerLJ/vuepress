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
