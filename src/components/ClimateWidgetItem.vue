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
        <text :x="calcMeterLength - calcMiddlePosition" y="15">
          <tspan ref="tspan" class="tspan">
            {{ value.value[0][10].avg }}
          </tspan>
          <tspan>{{ value.value[0].dim }}</tspan>
        </text>
        <path class="svg-triangle" :d="createdTriagle" />
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
      textNumWidth: 0,
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
      const val = this.value.value[0]["10"];
      const segmentLength = parseInt(val.avgmax) - parseInt(val.avgmin);
      const svgLength = this.pathLength;
      const avg = parseInt(val.avg) - parseInt(val.avgmin);
      const x = Math.round((svgLength * avg) / segmentLength);
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
    calcMiddlePosition(): number {
      return this.textNumWidth / 2 + 4;
    },
    createdTriagle(): string {
      return `M ${-3.5 + this.calcMeterLength} 18 L ${
        1 + this.calcMeterLength
      } 25.8 L ${-8 + this.calcMeterLength} 25.8 Z`;
    },
  },
  methods: {
    resizeBrowserHandler(): void {
      this.$nextTick(() => {
        const svg = this.$refs.svg as SVGGraphicsElement;
        const tspan = this.$refs.tspan as SVGGraphicsElement;
        const lengthSVG = svg.getBoundingClientRect().width;
        this.pathLength = lengthSVG - 20;
        this.textNumWidth = Math.round(tspan.getBoundingClientRect().width);
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
  height: 60px;
  border: 1px solid teal;
}

.svg-container > text {
  fill: $color-black;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  overflow: visible;
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
