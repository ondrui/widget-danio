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
        ref="svg"
        class="svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="37px"
      >
        <g>
          <text x="150" y="12" fill="black" font-size="12" text-anchor="middle">
            21dddd
          </text>
          <svg x="140" y="9">
            <path class="triangle" d="M 10 9 L 6.5 16.8 L 14.5 16.8 Z" />
          </svg>
        </g>
        <path
          class="bg"
          :d="`M 5 33 L ${pathLength} 33 A 4 4 180 0 0 ${pathLength} 25 L 5 25 A 4 4 0 0 0 5 33`"
        />
        <path
          class="meter"
          d="M 5 33 L 150 33 A 4 4 180 0 0 150 25 L 5 25 A 4 4 0 0 0 5 33"
        />
      </svg>
      <!-- <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="37px"
        viewBox="0 0 320 37"
        preserveAspectRatio="none"
      >
        <g>
          <text x="150" y="12" fill="black" font-size="12" text-anchor="middle">
            21dddd
          </text>
          <svg x="140" y="9">
            <path class="triangle" d="M 10 9 L 6.5 16.8 L 14.5 16.8 Z" />
          </svg>
        </g>
        <path
          class="bg"
          d="M 5 33 L 305 33 A 4 4 180 0 0 305 25 L 5 25 A 4 4 0 0 0 5 33"
        />
        <path
          class="meter"
          d="M 5 33 L 150 33 A 4 4 180 0 0 150 25 L 5 25 A 4 4 0 0 0 5 33"
        />
      </svg> -->
      <!-- <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="37"
      >
        <svg x="150" y="8">
          <text x="5" y="7" fill="black" font-size="12">21dddd</text>
          <path class="triangle" d="M 30 9 L 25.5 16.8 L 34.5 16.8 Z" />
        </svg>
        <svg viewBox="0 0 320 37" preserveAspectRatio="none">
          <path
            class="bg"
            d="M 5 33 L 305 33 A 4 4 180 0 0 305 25 L 5 25 A 4 4 0 0 0 5 33"
          />
          <path
            class="meter"
            d="M 5 33 L 150 33 A 4 4 180 0 0 150 25 L 5 25 A 4 4 0 0 0 5 33"
          />
        </svg>
      </svg> -->
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
    return {
      pathLength: 300,
    };
  },
  created() {
    this.resizeBrowserHandler();
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {},
  methods: {
    resizeBrowserHandler(): void {
      this.$nextTick(() => {
        const svg = this.$refs.svg as HTMLElement;
        const lengthSVG = svg.getBoundingClientRect().width;
        this.pathLength = lengthSVG - 50;
      });
      // const svg = this.$refs.svg as HTMLElement;

      // return `M 5 33 L ${lengthSVG - 40} 33 A 4 4 180 0 0 ${
      //   lengthSVG - 40
      // } 25 L 5 25 A 4 4 0 0 0 5 33`;
      // const text = document.querySelector("text");
      // function getValue(size: number) {
      //   let p = svg?.createSVGPoint();
      //   if (p) {
      //     p.x = size;
      //     p.y = 0;
      //     p = p.matrixTransform(svg?.getScreenCTM()?.inverse());
      //     return p;
      //   }
      // }
      // let fontSize = 12;
      // let newSize = getValue(fontSize);
      // reset the font size
      // text?.setAttribute("font-size", `${newSize?.x}`);
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
