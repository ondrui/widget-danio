<template>
  <div class="container-item">
    <div class="block-text">
      <div class="title">{{ value.title.ru }}</div>
      <div v-if="value.def?.ru" class="subtitle">
        {{ value.def.ru }}
      </div>
    </div>
    <div class="chart-item">
      <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg">
        <svg class="svg-block" :x="`${calcMeterLength - 15}`" y="9">
          <text x="0" y="0" text-anchor="middle">21dddd</text>
          <path class="svg-triangle" d="M 10 9 L 6.5 16.8 L 14.5 16.8 Z" />
        </svg>
        <path
          v-for="path in showPaths"
          :key="path.class"
          :class="path.class"
          :d="path.def"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { DataClimate, PathSVG } from "@/types/typesClimate";
import { defineComponent, PropType } from "vue";
import { svgClassForPath } from "@/constants/climate";

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<DataClimate>,
      required: true,
    },
  },
  data() {
    return {
      pathLength: 300,
      classNameForPath: svgClassForPath,
    };
  },
  created() {
    this.resizeBrowserHandler();
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    calcMeterLength(): number {
      const absLength =
        parseInt(this.value.value[0]["10"].avgmax) -
        parseInt(this.value.value[0]["10"].avgmin);
      const bgLength = this.pathLength;
      const avg = parseInt(this.value.value[0]["10"].avg);
      console.log(bgLength);

      const x = Math.round((bgLength * avg) / absLength);
      console.log(x);
      return x;
    },
    showPaths(): PathSVG[] {
      const pathStr = (prop: number): string =>
        `M 5 33 L ${prop} 33 A 4 4 180 0 0 ${prop} 25 L 5 25 A 4 4 0 0 0 5 33`;
      const paths = this.classNameForPath.map((p: string) => {
        return {
          class: p,
          def:
            p === "svg-bg"
              ? pathStr(this.pathLength)
              : pathStr(this.calcMeterLength),
        };
      });
      return paths;
    },
  },
  methods: {
    resizeBrowserHandler(): void {
      this.$nextTick(() => {
        const svg = this.$refs.svg as HTMLElement;
        const lengthSVG = svg.getBoundingClientRect().width;
        this.pathLength = lengthSVG - 50;
      });
    },
  },
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
  flex-grow: 1;
}

.svg-container {
  fill: none;
  width: 100%;
  height: 37px;
}

.svg-block {
  height: 100%;
}

.svg-block > text {
  fill: black;
  font-size: 12;
}

.svg-meter {
  fill: $color-progress-meter;
}

.svg-bg {
  fill: $color-progress-bg;
}

.svg-triangle {
  fill: $color-progress-meter;
}
</style>
