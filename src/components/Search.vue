<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="location" />
    <button hidden type="submit" />
  </form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      location: ''
    }
  },

  methods: {
    onSubmit() {
      console.log(this.location)
    }
  }
};
</script>

<style>
</style>
