<template>
  <div class="wrapper">
    <div class="container-main">
      <div class="content">
        <div class="content-main">
          <div
            class="content-left"
            v-for="(value, index) in values"
            :key="index"
          >
            <div>{{ prepositions[0] }}</div>
            {{ EndPointTextLeft(value) }}
          </div>
        </div>
        <div class="content-main">
          <div
            class="content-right"
            v-for="(value, index) in values"
            :key="index"
          >
            <div>{{ prepositions[1] }}</div>
            {{ EndPointTextRight(value) }}
          </div>
        </div>
      </div>
      <ClimateWidgetItem
        v-for="value in values"
        :key="value.title?.en?.slice(0, 4)"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ClimateWidgetItem from "./ClimateWidgetItem.vue";
import { WidgetClimateData } from "@/types/typesClimate";
import { expression } from "@/constants/climate";

export default defineComponent({
  components: { ClimateWidgetItem },
  props: {
    values: {
      type: Array as PropType<WidgetClimateData[]>,
      required: true,
    },
  },
  data() {
    return {
      prepositions: expression.ru.prepositions,
    };
  },
  computed: {},
  methods: {
    EndPointTextRight(value: WidgetClimateData): string {
      return ` ${value.data.max ?? expression.ru.noData}${
        value.dim === expression.ru.changeDimensionLocale[0]
          ? ` ${value.dim}`
          : value.dim
      }`;
    },
    EndPointTextLeft(value: WidgetClimateData): string {
      return ` ${value.data.min ?? expression.ru.noData}${
        value.dim === expression.ru.changeDimensionLocale[0]
          ? ` ${value.dim}`
          : value.dim
      }`;
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

.content {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 400;
  font-size: 14px;

  & .content-main {
    display: flex;
    row-gap: 3px;
    flex-direction: column;

    & .content-right {
      padding-top: 36px;
      line-height: 11px;
      padding-right: 6px;

      & div {
        display: inline-block;
        color: $color-item-font-light;
      }
    }
    & .content-left {
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
