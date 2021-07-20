<template>
  <div id="app">
    <div class="wrapper">
      <Search :onSubmit="onSubmit" />

      <template v-if="weatherInfo">
        <Weather :info="weatherInfo.current" />

        <div class="carousel">
          <WeatherSumaryList :info="weatherInfo.previousWeather" />
          <WeatherSumaryList :info="weatherInfo.daily" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Weather from './components/Weather.vue'
import WeatherSumaryList from './components/WeatherSumaryList.vue'

export default {
  name: 'App',
  components: {
    Search,
    Weather,
    WeatherSumaryList
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

<style lang="scss">
#app {
  min-height: 100vh;
  padding: 30px 30px;
  background-color: #FCE19C;

  .wrapper {
    max-width: 1200px;
    margin: auto;

    .carousel {
      display: flex;
      overflow-y: auto;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
}
</style>
