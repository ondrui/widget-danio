<template>
  <div class="container-item">
    <div class="block-text">
      <div class="title">{{ value.title[locales] }}</div>
      <div v-if="subtitleToProgressName(value).isShow" class="subtitle">
        {{ subtitleToProgressName(value).text }}
      </div>
    </div>
    <div class="chart-item">
      <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg">
        <text ref="text" :x="calcTextBlockMeterPosition" y="15">
          <tspan ref="tspan" class="tspan">
            {{ value.data.avg }}
          </tspan>
          <tspan>
            {{ dimension(value.data.avg) }}
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
  ExpressionLocales,
} from "@/types/typesClimate";
import { defineComponent, PropType } from "vue";
import {
  svgClassForPath,
  thicknessProgress,
  triagleSideLength,
  expression,
} from "@/constants/climate";
import { snowDimension } from "@/constants/functions";

export default defineComponent({
  props: {
    /**
     * Объект с данными для отображения.
     * @example
     * {
     *  "title":{"ru":"Температура","en":"Temperature"},
     *  "dim":"°",
     *  "data":{"min":"-3.6","max":"5.1","avg":"н/д"}
     * }
     */
    value: {
      type: Object as PropType<WidgetClimateData>,
      required: true,
    },
    /**
     * Языковая метка для определения локали.
     * @example "ru"
     */
    locales: {
      type: String as PropType<keyof ExpressionLocales>,
      required: true,
    },
  },
  data() {
    return {
      /**
       * Ширина элемента SVG, в котором отрисовывается прогресс бар с меткой
       * и средним значением.
       */
      SVGWidth: 300,
      /**
       * Массив в названиями классов элементов path прогресс бара.
       */
      classNameForPath: svgClassForPath,
      /**
       * Ширина текстового блока, в котором размещается среднее значение параметра и его размерность.
       * Используется для вычисления координат расположения текстового блока.
       */
      textNumBlockMeterWidth: 0,
      /**
       * Ширина элемента tspan , в котором размещается среднее значение параметра.
       * Используется для вычисления координат расположения текстового блока.
       */
      textBlockMeterWidth: 0,
    };
  },
  mounted() {
    /**
     * После монтирования компоненты вызываем функцию обработчик, которая
     * отвечает за вычисление и установку следующих значений:
     * SVGWidth, textNumBlockMeterWidth, textBlockMeterWidth.
     */
    this.resizeBrowserHandler();
    /**
     * Устанавливаем оброботчик на событие resize, которое срабатывает при
     * изменении размера окна. Функция обработчик описана выше.
     */
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  unmounted() {
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    /**
     * Вычисляем ширину элемента индикации максимального значения
     * прогресс бара.
     */
    progressBgWidth(): number {
      return this.SVGWidth - thicknessProgress / 2;
    },
    /**
     * Вычисляем и возвращаем ширину элемента индикации среднего значения
     * прогресс бара.
     */
    calcMeterLength(): number {
      const svgLength = this.progressBgWidth;
      const val = this.value.data;
      /**
       * Если отсутствует максимальное, минимальное или среднее значение
       * параметра, то метку индикации среднего значения
       * прогресс бара устанавливается посередине.
       */
      if (
        val.max === expression[this.locales].noData ||
        val.min === expression[this.locales].noData ||
        val.avg === expression[this.locales].noData
      ) {
        return svgLength / 2;
      }
      /**
       * Логика вычисления ширины индикации среднего значения
       * прогресс бара относительно ширины SVG элемента.
       */
      const length = (val1: string, val2: string): number =>
        parseInt(val1) - parseInt(val2);

      const minMaxsegmentLength = length(val.max, val.min);
      const avgSegmentLength = length(val.avg, val.min);

      const x = Math.round(
        (svgLength * avgSegmentLength) / minMaxsegmentLength
      );

      /**
       * Условия ограничения максимальной и минимальной ширины
       * индикации среднего значения прогресс бара.
       */
      if (x <= thicknessProgress + triagleSideLength) {
        return thicknessProgress / 2 + triagleSideLength - 1;
      }

      if (x >= svgLength) {
        return svgLength;
      }

      return x;
    },
    /**
     * Возвращает массив объектов, которые содержат значение атрибута d
     * элементов path прогресс бара и класс CSS.
     */
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
    /**
     *
     */
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
    /**
     *
     */
    createdTriagle(): string {
      return `M ${-3.5 + this.calcMeterLength} 18 L ${
        1 + this.calcMeterLength
      } 25.8 L ${-8 + this.calcMeterLength} 25.8 Z`;
    },
  },
  methods: {
    /**
     *
     */
    resizeBrowserHandler(): void {
      /**
       *
       * @param element
       */
      const getWidth = (element: string): number => {
        return Math.round(
          (this.$refs[element] as SVGElement).getBoundingClientRect().width
        );
      };
      this.SVGWidth = getWidth("svg");
      this.textNumBlockMeterWidth = getWidth("text");
      this.textBlockMeterWidth = getWidth("tspan");
    },
    /**
     *
     * @param value
     */
    subtitleToProgressName(value: WidgetClimateData): SubtitleToProgressName {
      return {
        isShow: !!value.def,
        text: value.def ? value.def[this.locales] : "",
      };
    },
    /**
     *
     * @param val
     */
    dimension(val: string): string {
      return snowDimension(
        val,
        expression[this.locales].noData,
        this.value.dim
      );
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
