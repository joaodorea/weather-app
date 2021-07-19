<template>
  <div id="app">
    <Search :onSubmit="onSubmit" />
    <Weather v-if="weatherInfo" :info="weatherInfo" />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    Search,
    Weather
  },

  data(){
    return {
      weatherInfo: null
    }
  },

  methods: {
    onSubmit(apiResponse) {
      this.weatherInfo = apiResponse
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
