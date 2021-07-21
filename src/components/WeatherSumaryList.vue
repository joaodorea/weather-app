<template>
<div id="weather-list">
  <ul class="list">
    <li class="item" v-for="item in info" :key="item.dt">
      <p>{{ item.isToday ? 'Today' : item.weekday }}</p>

      <div class="card" :class="{ isToday: item.isToday }">
        <WeatherIcon class="icon" :weather="getWeatherMain(item)" />
        <p class="max">{{ item.temp.max }}º</p>
        <p class="min">{{ item.temp.min }}º</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'

export default {
  name: 'WeatherSumaryList',
  data() {
    return {}
  },
  
  components: { WeatherIcon },

  props: {
    info: {
      type: Array,
      required: true
    }
  },

  methods: {
    getWeatherMain(item) {
      if(item.current) return item.current.weather[0].main
      else return item.weather[0].main
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;

  .item {
    margin: 0 10px;

    .card {
      background-color: rgba(255, 255, 255, 0.3);
      margin-top: 10px;
      border-radius: 10px;
      padding: 12px 20px;
      width: 70px;
      text-align: center;

      .max {
        font-weight: bold;
        margin-top: 8px;
      }

      .min {
        margin-top: 8px;
      }

      .icon {
        max-width: 30px;
        max-height: 30px;
      }

      &.isToday {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
