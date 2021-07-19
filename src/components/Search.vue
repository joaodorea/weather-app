<template>
  <form @submit.prevent="onSubmit">
    <input :class="{error: reqError || inputError}" type="text" v-model="location" />
    <button hidden type="submit" />
  </form>
</template>

<script>
import { weatherApi } from '../services'

export default {
  name: 'Search',
  data() {
    return {
      location: '',
      reqError: false
    }
  },

  watch: {
    location() {
      this.reqError = false
    }
  },

  computed: {
    inputError() {
      const size = this.location.trim.length
      return size < 4 && size > 0
    }
  },

  methods: {
    async onSubmit() {
      const resp = await weatherApi.getCityWeatherByPeriod(this.location)
      
      if(resp.message) {
        console.log('Error: ' + resp.message)
        this.reqError = true
      }
      else {
        this.reqError = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .error {
    border: 1px solid red;
  }
</style>
