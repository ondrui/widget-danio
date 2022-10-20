<template>
  <div class="container-item">
    <div class="block-text">
      <div class="title">{{ value.title.ru }}</div>
      <div v-if="value.def?.ru" class="subtitle">
        {{ value.def.ru }}
      </div>
    </div>
    <div class="chart-item">
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="320px"
        height="37px"
        viewBox="0 0 320 37"
      >
        <g transform="translate(115, 9)">
          <text x="5" y="7" fill="black" font-size="12">21dddd</text>
          <path class="triangle" d="M 30 9 L 25.5 16.8 L 34.5 16.8 Z" />
        </g>
        <path
          class="bg"
          d="M 5 33 L 305 33 A 4 4 180 0 0 305 25 L 5 25 A 4 4 0 0 0 5 33"
        />
        <path
          class="meter"
          d="M 5 33 L 150 33 A 4 4 180 0 0 150 25 L 5 25 A 4 4 0 0 0 5 33"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { DataClimate } from "@/types/typesClimate";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    value: {
      type: Object as PropType<DataClimate>,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.container-item {
  display: flex;
  gap: 18px;
}

.block-text {
  position: relative;
  align-self: flex-end;
}
.title {
  width: 90px;
  color: $color-item-font-dark;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
}

.subtitle {
  position: absolute;
  top: 14px;
  right: 0px;
  color: $color-item-font-light;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
}

.chart-item {
  display: flex;
}

path.meter {
  fill: $color-progress-meter;
}

path.bg {
  fill: $color-progress-bg;
}

path.triangle {
  fill: $color-progress-meter;
}
</style>
