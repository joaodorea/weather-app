<template>
<div id="weather-list">
  <ul class="list">
    <li class="item" v-for="item in info" :key="item.dt">
      <p>{{ item.isToday ? 'Today' : item.weekday }}</p>

      <div class="card" :class="{ isToday: item.isToday }">
        <SunsetIcon />
        <p class="max">{{ item.temp.max }}º</p>
        <p class="min">{{ item.temp.min }}º</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import SunsetIcon from '../assets/imgs/sunset-icon.vue'

export default {
  name: 'WeatherSumaryList',
  data() {
    return {}
  },
  
  components: { SunsetIcon },

  props: {
    info: {
      type: Array,
      required: true
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

      &.isToday {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
