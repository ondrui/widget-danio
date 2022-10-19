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
        viewBox="0 0 310 35"
        preserveAspectRatio="xMinYMax meet"
      >
        <path
          d="M5 20 H300 Z"
          stroke="#EFF2F5"
          stroke-width="1px"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M5 20 H150 Z"
          stroke="#CFD6E4"
          stroke-width="zpx"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
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
  gap: 20px;
}

.block-text {
  position: relative;
  align-self: flex-end;
}
.title {
  width: 90px;
  padding-bottom: 4px;
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
  flex-grow: 1;
  height: 33px;
  border: 1px solid teal;
}
</style>
