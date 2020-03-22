<template>
  <div>
    <h4 class="title">{{ normalContent.title }}</h4>
    <div v-html="normalContent.richText" />
  </div>
</template>

<script>
export default {
  name: '',
  asyncData({ store, context }) {
    return store.dispatch('getNormal', context)
  },
  data() {
    return {}
  },
  computed: {
    normalContent() {
      return this.$store.state.normalContent
    }
  },
  created() {
    console.log('this.normalContent.title', this.normalContent.title)
    this.$ssrContext && (this.$ssrContext.title = this.normalContent.title)
  }
}
</script>

<style lang='less'>
html{
  max-width: 750px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-color: #fff;
}
img{
  max-width: 100%;
}
.container{
  padding: 0 16px;
}
/* 头部样式 */
.title{
  margin-top: 16px;
  color: #333;
  font-size: 24px;
}
.content{
  margin-top: 10px;
}
</style>
