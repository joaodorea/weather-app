<template>
  <div id="weather">
    <div class="column">
      <div class="current-state">
        <SunIcon class="current-state-icon" />
        <!-- <CloudRainIcon />
        <CloudIcon />
        <SnowIcon />
        <RainIcon /> -->
        <p class="current-state-label">{{ info.weather[0].description }}</p>
      </div>
    </div>

    <div class="column">
      <div class="temp">{{ info.temp }}ºC</div>

      <div class="min-and-max">
        <div>
          <p class="label">min</p>
          <p class="temp">{{ info.temp_min }}º</p>
        </div>

        <div>
          <p class="label">max</p>
          <p class="temp">{{ info.temp_max }}º</p>
        </div>
      </div>

      <div @click="toggleMoreInfo" class="more-info-toggle" :class="{ open: showMoreInfo }">
        {{ toggleText }}
        <ArrowUpIcon class="icon" />
      </div>

      <div class="more-info" :class="{hidden: showMoreInfo}">
        <div class="item">
          <WindIcon class="icon" />
          <b>{{ info.wind_speed }}km/h</b> Wind
        </div>

        <div class="item">
          <HumidtyIcon class="icon" />
          <b>{{ info.humidity }}%</b> Humidity
        </div>

        <div class="item">
          <PressureIcon class="icon" />
          <b>{{ info.pressure }}hPa</b> Pressure
        </div>

        <div class="item">
          <SunsetIcon class="icon" />
          {{ info.sunrise }} <br />
          {{ info.sunset }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SunIcon from "../assets/imgs/circle-solid.vue";
import ArrowUpIcon from "../assets/imgs/chevron-up-solid.vue";
// import CloudRainIcon from "../assets/imgs/cloud-showers-heavy-solid.vue";
// import CloudIcon from "../assets/imgs/cloud-solid.vue";
// import SnowIcon from "../assets/imgs/snowflake-solid.vue";
// import RainIcon from "../assets/imgs/tint-solid.vue";
import WindIcon from "../assets/imgs/wind-solid.vue";
import HumidtyIcon from "../assets/imgs/humidity-icon.vue";
import SunsetIcon from "../assets/imgs/sunset-icon.vue";
import PressureIcon from "../assets/imgs/pressure-icon.vue";

export default {
  name: "Weather",
  data() {
    return {
      showMoreInfo: false,
    };
  },

  components: {
    SunIcon,
    ArrowUpIcon,
    // CloudRainIcon,
    // CloudIcon,
    // SnowIcon,
    // RainIcon,
    WindIcon,
    HumidtyIcon,
    SunsetIcon,
    PressureIcon,
  },

  props: {
    info: {
      type: Object,
      // required: true
      default: () => {},
    },
  },

  computed: {
    toggleText() {
      return !this.showMoreInfo ? "Less Info" : "More Info";
    },
  },

  methods: {
    toggleMoreInfo() {
      this.showMoreInfo = !this.showMoreInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
#weather {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px auto 50px;
  text-align: center;
  max-width: 900px;

  .column {
    flex: 1;
  }

  .current-state {
    &-icon {
      max-width: 430px;
      margin-bottom: 15px;
    }

    &-label {
      font-size: 3rem;
      font-weight: 300;
      text-transform: capitalize;
    }
  }

  .temp {
    font-size: 7rem;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .min-and-max {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;

    .label {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .temp {
      font-size: 2.5rem;
    }
  }

  .more-info-toggle {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    cursor: pointer;
    font-size: 1.5rem;

    .icon {
      margin-left: 10px;
      width: 20px;
      transition: transform .3s;
    }

    &.open .icon {
      transform: rotate(180deg);
    }
  }

  .more-info {
    display: flex;
    transition: opacity .3s;
    opacity: 1;

    .item {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 15px;

      .icon {
        width: 30px;
        margin-bottom: 15px;
      }
    }

    &.hidden {
      opacity: 0;
    }
  }
}
</style>
