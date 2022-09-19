<template>
  <div class="widget">
    <h1>Главное</h1>
    <WidgetFilters
      @filtered="changeFilterActive"
      :filters="filters"
      :counters="countFiltersWithPlusAmount"
    />
    <div class="wrapper">
      <div class="container-main">
        <WidgetMainItem
          v-for="(event, index) in filteredEvents"
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

interface Data {
  eventType: number;
  eventTime: number | number[];
  timeFormat: string;
  titleText: string;
  eventText: string;
  iconCode?: number;
  isDayShow?: boolean;
}

interface Filters {
  code: number;
  amount: number;
  name: string;
  isActive: boolean;
}

export default defineComponent({
  components: {
    WidgetMainItem,
    WidgetFilters,
  },
  data() {
    return {
      events: [] as Data[],
      filters: [] as Filters[],
    };
  },
  created() {
    this.events = this.it();
    this.filters = this.initialfilters();
    this.amount();
  },
  computed: {
    filteredEvents(): Data[] {
      let filters = this.filters;

      return (
        this.events
          .filter((event) => {
            return filters.some((f) => {
              return f.code === event.eventType && f.isActive;
            });
          })
          .sort((event1, event2): number => {
            const a =
              typeof event1.eventTime === "number"
                ? event1.eventTime
                : event1.eventTime[0];
            const b =
              typeof event2.eventTime === "number"
                ? event2.eventTime
                : event2.eventTime[0];
            return a - b;
          })
          /** Set the isDayShow property mapping the date block. */
          .map((event: Data, index: number, arr: Data[]) => {
            //!!!!
            if (index === 0) {
              return { ...event, isDayShow: true };
            }
            let firstElm = arr[index - 1].eventTime;
            let secondElm = event.eventTime;
            firstElm = typeof firstElm === "number" ? firstElm : firstElm[0];
            secondElm =
              typeof secondElm === "number" ? secondElm : secondElm[0];
            if (
              new Date(firstElm).getDate() !== new Date(secondElm).getDate()
            ) {
              return { ...event, isDayShow: true };
            } else {
              return { ...event, isDayShow: false };
            }
          })
      );
    },
    countFiltersWithPlusAmount(): number {
      let allActiveFilters = this.filters.reduce(
        (previousValue, currentValue) =>
          currentValue.isActive ? ++previousValue : previousValue,
        0
      );

      let ActiveFiltersWithZeroAmount = this.filters.reduce(
        (previousValue, currentValue) =>
          currentValue.amount === 0 ? ++previousValue : previousValue,
        0
      );
      return allActiveFilters - ActiveFiltersWithZeroAmount;
    },
  },
  methods: {
    it() {
      return this.$store.state.events;
    },
    initialfilters(): Filters[] {
      return this.$store.getters.getFilters;
    },
    changeFilterActive(filter: Filters | 100) {
      if (filter === 100) {
        this.filters = this.filters.map((f) => {
          return { ...f, isActive: true };
        });
      } else {
        this.filters = this.filters.map((f) =>
          f.code === filter.code && f.amount > 0
            ? { ...f, isActive: !f.isActive }
            : f
        );
      }
    },
    amount() {
      this.filters = this.filters.map((f) => {
        const filterAmount = this.events.reduce(
          (previousValue, currentValue) => {
            if (currentValue.eventType === f.code) {
              return ++previousValue;
            }
            return previousValue;
          },
          0
        );
        return { ...f, amount: filterAmount };
      });
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
  margin: 14px 4px 4px 10px;
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
  padding: 10px 6px 10px 0;
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
