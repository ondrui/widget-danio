<template>
  <div class="widget">
    <h1>Главное</h1>
    <WidgetFilters
      :filters="getfilters"
      :totalAppliedFilters="totalAppliedFilters"
    />
    <div class="wrapper">
      <div class="container-main">
        <WidgetMainItem
          v-for="(event, index) in getEvents"
          :key="`wn-${index}`"
          :event="event"
          :index="+index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetMainItem from "./WidgetMainItem.vue";
import WidgetFilters from "./WidgetFilters.vue";

export default defineComponent({
  components: {
    WidgetMainItem,
    WidgetFilters,
  },
  computed: {
    /**
     * Возвращает массив объектов с предупреждениями, полученными из store
     */
    getEvents() {
      return this.$store.getters.filteredEvents;
    },
    /**
     * Возвращает массив объектов с фильтрами, полученными из store
     */
    getfilters() {
      return this.$store.getters.addFilters;
    },
    /**
     * Возвращает общее количество примененных фильтров
     * @example
     * // returns 3
     */
    totalAppliedFilters(): number {
      return this.$store.getters.totalAppliedFilters;
    },
  },
});
</script>

<style lang="scss" scoped>
.widget {
  border-radius: 12px;
  min-width: 300px;
  height: 100%;
  background: $color-white;
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  & h1 {
    margin: 18px 0 0 19px;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
  }
}
.wrapper {
  margin: 14px 4px 10px 10px;
  // height: calc(100% - 101px);
  max-height: 448px;
  display: flex;
}
.container-main {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 6px 1px 0;
  flex-basis: 100%;
}
// @media screen and (max-width: 630px) {
//   .wrapper {
//     height: calc(100% - 125px);
//   }
// }
// @media screen and (max-width: 365px) {
//   .wrapper {
//     height: calc(100% - 150px);
//   }
// }
</style>
