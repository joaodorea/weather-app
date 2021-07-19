<template>
  <div>
    {{ info.weather }}
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {}
  },

  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
