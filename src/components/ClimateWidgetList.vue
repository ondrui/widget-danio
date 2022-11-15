<template>
  <div class="wrapper">
    <div class="container-main">
      <div class="endpoint">
        <div
          class="endpoint-col"
          v-for="(point, index) in endpoints"
          :key="index"
        >
          <div
            :class="`endpoint-item-${point}`"
            v-for="(value, i) in values"
            :key="i"
          >
            <div>{{ expressions.prepositions[index] }}</div>
            {{ EndPointText(point, value) }}
          </div>
        </div>
      </div>
      <ClimateWidgetItem
        v-for="(value, index) in values"
        :key="`cn-${index}`"
        :value="value"
        :expressions="expressions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ClimateWidgetItem from "./ClimateWidgetItem.vue";
import {
  KeysExpressionsLocales,
  WidgetClimateData,
} from "@/types/typesClimate";
import { snowDimension } from "@/constants/functions";

export default defineComponent({
  components: { ClimateWidgetItem },
  props: {
    /**
     * Массив объектов с данными передаваемые из
     * store в компоненты для отображения.
     */
    values: {
      type: Array as PropType<WidgetClimateData[]>,
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
       * Массив для отрисовки и размещения правого и левого блока с
       * подписями и значениями прогресс бара.
       */
      endpoints: ["left", "right"],
    };
  },
  methods: {
    /**
     * Возвращает отформатированную строку с минимальным и максимальным
     * значением параметра и его размерностью.
     * @param point - Задает с какой стороны будет отрисовываться блок с
     * подписями.
     * @param value - Объект с данными передаваемые из store в компоненты
     * для отображения.
     * @example "-3.6°"
     */
    EndPointText(point: string, value: WidgetClimateData): string {
      const [left] = this.endpoints;
      const pointNum = point === left ? value.data.max : value.data.min;
      return `${pointNum}${snowDimension(
        pointNum,
        this.expressions.noData,
        value.dim
      )}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 10px 19px 0 27px;
  max-height: 227px;
  display: flex;
}

.endpoint {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 400;
  font-size: 14px;

  & .endpoint-col {
    display: flex;
    row-gap: 3px;
    flex-direction: column;

    & .endpoint-item-right {
      padding-top: 36px;
      line-height: 11px;
      padding-right: 6px;

      & div {
        display: inline-block;
        color: $color-item-font-light;
      }
    }
    & .endpoint-item-left {
      padding-top: 36px;
      line-height: 11px;
      padding-left: 108px;

      & div {
        display: inline-block;
        color: $color-item-font-light;
      }
    }
  }
}

.container-main {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 6px;
  flex-basis: 100%;
}
</style>
