<template>
  <div id="app">
    <Search :onSubmit="onSubmit" />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Search
  },

  data(){
    return {}
  },

  methods: {
    onSubmit(apiResponse) {
      console.log(apiResponse)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
