<template>
  <div class="hello">
    4
    <div>{{ article.title }}</div>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  serverPrefetch({ store,context }){
    return context && store.dispatch('getNormal',context)
  },
  computed:{
    article() {
      return this.$store.state.normalContent
    }
  },
  data() {
    return {
      count:0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
