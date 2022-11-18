<template>
  <div class="alerts">
    <h1>Главное</h1>
    <AlertsWidgetFilters
      :filters="getFilters"
      :totalAppliedFilters="totalAppliedFilters"
      :locales="getLocales"
      :expressions="getExpressions"
    />
    <div class="wrapper">
      <div class="container-main">
        <div class="default-event" v-if="!getEvents.length">
          <div>
            {{ getExpressions.defaultEventMessage[0] }}
          </div>
          <div>{{ getExpressions.defaultEventMessage[1] }}</div>
        </div>
        <AlertsWidgetItem
          v-for="(event, index) in getEvents"
          :key="`wn-${index}`"
          :event="event"
          :index="+index"
          :locales="getLocales"
          :expressions="getExpressions"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertsWidgetItem from "./AlertsWidgetItem.vue";
import AlertsWidgetFilters from "./AlertsWidgetFilters.vue";
import {
  DataAlerts,
  Filters,
  KeysExpressionsLocales,
} from "@/types/typesAlerts";
import { FilterStatus } from "@/constants/alerts";

export default defineComponent({
  components: {
    AlertsWidgetItem,
    AlertsWidgetFilters,
  },
  computed: {
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales(): string {
      return this.$store.getters.getLocales;
    },
    /**
     * Возвращает массив объектов с предупреждениями, полученными из store
     */
    getEvents(): DataAlerts[] {
      return this.$store.getters.getFilteredAndSortedEvents;
    },
    /**
     * Возвращает объект с фильтрами, полученными из store
     */
    getFilters(): Filters {
      return this.$store.getters.getFilters;
    },
    /**
     * Возвращает общее количество примененных фильтров
     * @example
     * 3
     */
    totalAppliedFilters(): number {
      return this.$store.getters.calcTotalFilters(FilterStatus.Applied);
    },
    /**
     * Возвращает строковые константы с учетом локали.
     */
    getExpressions(): KeysExpressionsLocales {
      return this.$store.getters.getExpressions;
    },
  },
});
</script>

<style lang="scss" scoped>
.alerts {
  border-radius: 12px;
  min-width: 438px;
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
.default-event {
  width: 100%;
  margin: 21px 5px 10px 0px;
  padding: 14px 15px;
  background: $color-filters-day-dark;
  color: $color-filters-day-darker;
  border-radius: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  & > div {
    margin-bottom: 15px;
  }
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
