<template>
  <CloudIcon v-if="weather === 'Clouds'" />
  <SnowIcon v-else-if="weather === 'Snow'" />
  <SunIcon v-else-if="weather === 'Clear'" />
  <RainIcon v-else/>
</template>

<script>
import SunIcon from "../assets/imgs/circle-solid.vue";
import CloudIcon from "../assets/imgs/cloud-solid.vue"
import SnowIcon from "../assets/imgs/snowflake-solid.vue"
import RainIcon from "../assets/imgs/tint-solid.vue"

export default {
  name: "WeatherIcon",

  data() {
    return {};
  },

  components: {
    SunIcon,
    CloudIcon,
    SnowIcon,
    RainIcon,
  },

  props: {
    weather: {
      type: String,
      default: ''
    }
  },
}
</script>

<style>

</style>
