<template>
  <div class="wrapper">
    <div class="content">
      <div class="content-right" v-for="(value, index) in values" :key="index">
        <div>{{ prepositions }}</div>
        {{ ` ${value.data.max ?? "н/д"}${value.dim === "см" ? " см": value.dim` }}
      </div>
    </div>
    <div class="container-main">
      <ClimateWidgetItem
        v-for="value in values"
        :key="value.title?.en?.slice(0, 4)"
        :value="value"
        :maxWidth="maxWidth"
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
    maxWidth: Number,
  },
  data() {
    return {
      prepositions: expression.ru.prepositions[1],
    };
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 10px 19px 0 27px;
  max-height: 227px;
  display: flex;
  position: relative;
  background-color: aquamarine;
}

.content {
  position: absolute;
  display: flex;
  row-gap: 3px;
  flex-direction: column;
  background-color: tan;
  opacity: 0.6;
  right: 2px;

  & .content-right {
    padding-top: 37px;
    font-weight: 400;
    font-size: 14px;
    line-height: 10px;

    & div {
      display: inline-block;
    }

    & span {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: $color-item-font-light;
    }
  }
}

.container-main {
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
