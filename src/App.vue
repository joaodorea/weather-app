<template>
  <div id="app" :style="{backgroundColor: bgColor}">
    <div class="wrapper">
      <Search :onSubmit="onSubmit" />

      <template v-if="weatherInfo">
        <Weather :info="weatherInfo.current" />

        <div class="carousel">
          <WeatherSumaryList :info="weatherInfo.previousWeather" />
          <WeatherSumaryList :info="weatherInfo.daily" />
        </div>
      </template>

      <template v-else>
        <InitialHero />
      </template>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Weather from './components/Weather.vue'
import WeatherSumaryList from './components/WeatherSumaryList.vue'
import InitialHero from './components/InitialHero.vue'

export default {
  name: 'App',
  components: {
    Search,
    Weather,
    WeatherSumaryList,
    InitialHero
  },

  data(){
    return {
      weatherInfo: null
    }
  },

  computed: {
    bgColor() {
      if(!this.weatherInfo) return '#F8A797'
      
      const main = this.weatherInfo.current.weather[0].main

      if(main === 'Clouds') return '#F0F1F2'
      else if(main === 'Snow') return '#D4D9E0'
      else if(main === 'Clear') return '#FCE19C'
      else return '#9CC2FC'
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
  transition: background-color .3s;

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
