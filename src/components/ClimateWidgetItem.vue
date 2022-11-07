<template>
  <div class="container-item">
    <div class="block-text">
      <div class="title">{{ value.title.ru }}</div>
      <div v-if="SubtitleToProgressName(value).isShow" class="subtitle">
        {{ SubtitleToProgressName(value).text }}
      </div>
    </div>
    <div class="chart-item">
      <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg">
        <text ref="text" :x="calcTextBlockMeterPosition" y="15">
          <tspan ref="tspan" class="tspan">
            {{ showPoint(value.data.avg) }}
          </tspan>
          <tspan>
            {{ showDimension(value.data.avg) }}
          </tspan>
        </text>
        <path class="svg-triangle" :d="createdTriagle" />
        <path
          v-for="path in showProgressPaths"
          :key="path.class"
          :class="path.class"
          :d="path.def"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {
  WidgetClimateData,
  PathSVG,
  SubtitleToProgressName,
} from "@/types/typesClimate";
import { defineComponent, PropType } from "vue";
import {
  svgClassForPath,
  thicknessProgress,
  triagleSideLength,
  expression,
} from "@/constants/climate";

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<WidgetClimateData>,
      required: true,
    },
    maxWidth: {
      type: Number,
      default: 65,
    },
  },
  data() {
    return {
      SVGWidth: 300,
      classNameForPath: svgClassForPath,
      textNumBlockMeterWidth: 0,
      textBlockMeterWidth: 0,
      prepositions: expression.ru.prepositions,
      noData: expression.ru.noData,
    };
  },
  mounted() {
    this.resizeBrowserHandler();
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    progressBgWidth(): number {
      return this.SVGWidth - thicknessProgress / 2;
    },
    calcMeterLength(): number {
      const svgLength = this.progressBgWidth;
      const val = this.value.data;
      if (
        val.max === undefined ||
        val.min === undefined ||
        val.avg === undefined
      ) {
        return svgLength / 2;
      }
      const minMaxsegmentLength = parseInt(val.max) - parseInt(val.min);
      const avgSegmentLength = parseInt(val.avg) - parseInt(val.min);

      const x = Math.round(
        (svgLength * avgSegmentLength) / minMaxsegmentLength
      );

      if (x <= thicknessProgress + triagleSideLength) {
        return thicknessProgress / 2 + triagleSideLength - 1;
      }

      if (x >= svgLength) {
        return svgLength;
      }

      return x;
    },
    showProgressPaths(): PathSVG[] {
      const pathStr = (prop: number): string =>
        `M 4 33 H ${prop} A 4 4 180 0 0 ${prop} 25 H 4 A 4 4 0 0 0 5 33`;
      const paths = this.classNameForPath.map((p: string) => {
        return {
          class: p,
          def:
            p === svgClassForPath[0]
              ? pathStr(this.progressBgWidth)
              : pathStr(this.calcMeterLength),
        };
      });
      return paths;
    },
    calcTextBlockMeterPosition(): number {
      const widthText = this.textBlockMeterWidth;
      const diffRightBorder =
        this.SVGWidth - this.calcMeterLength - widthText / 2;
      const diffLeftBorder = this.calcMeterLength - widthText / 2;
      if (diffRightBorder <= 0) {
        return this.SVGWidth - widthText - 1;
      }

      if (diffLeftBorder <= 0) {
        return 1;
      }

      return (
        this.calcMeterLength -
        this.textNumBlockMeterWidth / 2 -
        thicknessProgress / 2
      );
    },
    createdTriagle(): string {
      return `M ${-3.5 + this.calcMeterLength} 18 L ${
        1 + this.calcMeterLength
      } 25.8 L ${-8 + this.calcMeterLength} 25.8 Z`;
    },
  },
  methods: {
    resizeBrowserHandler(): void {
      const svg = this.$refs.svg as SVGGraphicsElement;
      const text = this.$refs.text as SVGGraphicsElement;
      const tspan = this.$refs.tspan as SVGTextContentElement;
      const widthSVG = Math.round(svg.getBoundingClientRect().width);
      const widthNumTextBlockMeter = Math.round(
        tspan.getBoundingClientRect().width
      );
      const widthTextBlockMeter = Math.round(
        text.getBoundingClientRect().width
      );
      this.SVGWidth = widthSVG;
      this.textNumBlockMeterWidth = widthNumTextBlockMeter;
      this.textBlockMeterWidth = widthTextBlockMeter;
    },
    SubtitleToProgressName(value: WidgetClimateData): SubtitleToProgressName {
      return {
        isShow: !!value.def?.ru,
        text: value.def?.ru,
      };
    },
    showDimension(val: string | undefined): string {
      return !val
        ? ""
        : this.value.dim === expression.ru.changeDimensionLocale[0]
        ? ` ${this.value.dim}`
        : this.value.dim;
    },
    showPoint(val: string | undefined) {
      return val ?? this.noData;
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
  padding-bottom: 15px;
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
  height: 47px;
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

.svg-container .preposition {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

.svg-container .preposition-text {
  fill: $color-item-font-light;
}
</style>
