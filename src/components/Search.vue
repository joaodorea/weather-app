<template>
  <form @submit.prevent="submit">
    <input
      :class="{ error: reqError || inputError }"
      type="text"
      name="location"
      v-model="location"
      placeholder="São Paulo, BR"
    />
  </form>
</template>

<script>
import { weatherApi } from "../services";

export default {
  name: "Search",
  data() {
    return {
      location: "",
      reqError: false
    };
  },

  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },

  watch: {
    location() {
      this.reqError = false;
    },
  },

  computed: {
    inputError() {
      const size = this.location.trim.length;
      return size < 4 && size > 0;
    },
  },

  methods: {
    async submit() {
      const resp = await weatherApi.getCityWeatherByPeriod(this.location);

      if (resp.message) {
        console.log("Error: " + resp.message);
        this.reqError = true;
      } else {
        this.onSubmit(resp);
        this.reqError = false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.error {
  border: 1px solid red;
}

input {
  border-width: 0 0 2px 0;
  border-color: black;
  background-color: transparent;
  padding: 10px 5px;
  outline: none;
  font-size: 1.3rem;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>
