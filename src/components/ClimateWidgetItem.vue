<template>
  <div class="container-item">
    <div class="block-text">
      <div class="title">{{ value.title }}</div>
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
  KeysExpressionsLocales,
} from "@/types/typesClimate";
import { defineComponent, PropType } from "vue";
import {
  svgClassForPath,
  thicknessProgress,
  triagleSideLength,
} from "@/constants/climate";
import { snowDimension } from "@/constants/functions";

export default defineComponent({
  props: {
    /**
     * Объект с данными для отображения.
     * @example
     * {
     *  title: "Температура",
     *  def: "вероятность",
     *  dim: "°",
     *  data: {"min":"-3.6","max":"5.1","avg":"н/д"}
     * }
     */
    value: {
      type: Object as PropType<WidgetClimateData>,
      required: true,
    },
    /**
     * Строковые константы с учетом локали.
     */
    expressions: {
      type: Object as PropType<KeysExpressionsLocales>,
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
        val.max === this.expressions.noData ||
        val.min === this.expressions.noData ||
        val.avg === this.expressions.noData
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
     * Вычисляет координату оси x текстового блока расположенного над треугольной
     * меткой прогресс бора.
     * Ограничивает выход блока за пределы основного SVG элемента.
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
     * Возвращает список команд пути для рисования треугольной метки
     * прогресс бора.
     */
    createdTriagle(): string {
      return `M ${-3.5 + this.calcMeterLength} 18 L ${
        1 + this.calcMeterLength
      } 25.8 L ${-8 + this.calcMeterLength} 25.8 Z`;
    },
  },
  methods: {
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
     */
    resizeBrowserHandler(): void {
      /**
       * Определяет и устанавливает требуемые для отрисовки графика параметры.
       * @param element - строка содержит ключ ссылку $refs на элемент в шаблоне
       * компонента.
       */
      const getWidth = (element: string): number => {
        return Math.round(
          (this.$refs[element] as SVGElement)?.getBoundingClientRect().width
        );
      };
      this.SVGWidth = getWidth("svg");
      this.textNumBlockMeterWidth = getWidth("text");
      this.textBlockMeterWidth = getWidth("tspan");
    },
    /**
     * Отвечает за отображение блока с дополнительной информацией параметра.
     * @param def - Дополнительная информация параметра, которая выводится
     * под его названием.
     */
    subtitleToProgressName({
      def,
    }: {
      def?: string | undefined;
    }): SubtitleToProgressName {
      return {
        isShow: !!def,
        text: def ?? "",
      };
    },
    /**
     * Возвращает единицу измерения параметра. Если параметр не задан,
     * то возвращается пустая строка.
     * @param val Значение параметра.
     */
    dimension(val: string): string | undefined {
      return snowDimension(val, this.expressions.noData, this.value.dim);
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

  &::first-letter {
    text-transform: capitalize;
  }
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
