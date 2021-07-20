<template>
  <form @submit.prevent="submit">
    <label for="location">Where is your location?</label>
    <fieldset :class="{loading: isLoading}">
      <input
        :class="{ error: inputError }"
        type="text"
        name="location"
        id="location"
        v-model="location"
        placeholder="São Paulo, BR"
      />
    </fieldset>

    <p class="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { weatherApi } from "../services";

export default {
  name: "Search",
  data() {
    return {
      location: "",
      errorMessage: '',
      isLoading: false
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
      this.errorMessage = '';
    },
  },

  computed: {
    inputError() {
      const size = this.trimmedLocation.length;
      return size < 4 && size > 0;
    },

    trimmedLocation() {
      return this.location.trim()
    }
  },

  methods: {
    async submit() {
      if(this.trimmedLocation.length <= 3) return

      this.isLoading = true
      const resp = await weatherApi.getCityWeatherByPeriod(this.trimmedLocation);

      if (resp.message) {
        this.errorMessage = resp.message;
      } else {
        this.onSubmit(resp);
        this.errorMessage = ''
      }

      this.isLoading = false
    }
  },
};
</script>

<style lang="scss" scoped>
label {
  display: block;
}

fieldset {
  position: relative;
  display: inline;

  &.loading::after {
    content: '';
    position: absolute;
    top: 14px;
    right: 7px;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 16px;
    border-color: transparent transparent black black;

    animation-name: spinning;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    margin-bottom: 30px;
  }
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

  &:focus {
    background-color: rgba(255, 190, 35, 0.25);
  }
}

.errorMessage {
  margin-top: 10px;
  text-transform: capitalize;
  height: 16px;
}

@keyframes spinning {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
