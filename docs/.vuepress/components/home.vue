<template>
  <div class="home-page page">
    <img class="logo" src="images/logo.png" alt="logo" />
    <div class="main">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="title"><a :href="item.path">{{ item.title }}</a></div>
          <div class="desc">{{ getDescription(item) }}</div>
        </div>
      </div>
      <div class="tags">
        <div class="title">标签云</div>
        <div class="item" @click="handleChangeTag('')">All</div>
        <div class="item" v-for="(item, index) in tags" :key="index" @click="handleChangeTag(item)"> {{item}}</div>
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

    // tags
    const tags = this.$site.pages.map(item => {
      return item.frontmatter && item.frontmatter.tags || ""
    })
    const tagsArr = tags.join(",").split(",").filter(i => i !== "")
    this.tags = [...new Set(tagsArr)]
  },
  methods: {
    getDescription,
    handleChangeTag(item) {
      this.activeTag = item
    }
  }
}
</script>

<style lang="stylus">
.home-page
  .logo
    display: block
    height: auto
    margin: 0 auto
  .main
    display: -webkit-flex
    display: flex
    .list
      flex: 1
    .tags
      width: 190px
      padding: 20px 0 0 10px
      .title
        margin-bottom: 10px
        font-size: 16px
        font-weight: 600
      .item
        cursor: pointer
        display: inline-block
        font-size: 13px
        padding: 4px 10px
        border-radius: 8px
        margin: 0 8px 8px 0
        background-color: #f9f9f9
        color: #bbb
        &:hover
          color: #1e90ff
</style>