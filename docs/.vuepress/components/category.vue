<template>
  <div class="category-page page">
    <div class="list">
      <div class="item" v-for="(item, index) in arts" :key="index">
        <div class="title"><a :href="item.path">{{ item.title }}</a></div>
        <div class="desc">{{ getDescription(item) }}</div>
      </div>
    </div>
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
