<template>
  <div class="widget">
    <h1>Главное</h1>
    <WidgetFilters />
    <div class="wrapper">
      <div class="container-main">
        <WidgetMainItem
          v-for="(event, index) in isDayShow"
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
import type { PropType } from "vue";

interface PropsData {
  eventType: number;
  eventTime: number | number[];
  timeFormat: string;
  titleText: string;
  eventText: string;
  iconCode?: number;
}

interface Data {
  eventType: number;
  eventTime: number | number[];
  timeFormat: string;
  titleText: string;
  eventText: string;
  iconCode?: number;
  isDayShow: boolean;
}

export default defineComponent({
  components: {
    WidgetMainItem,
    WidgetFilters,
  },
  props: {
    events: {
      type: Array as PropType<Array<PropsData>>,
      required: true,
    },
  },
  computed: {
    sortedEvents(): PropsData[] {
      return [...this.events].sort(
        (event1: PropsData, event2: PropsData): number => {
          const a =
            typeof event1.eventTime === "number"
              ? event1.eventTime
              : event1.eventTime[0];
          const b =
            typeof event2.eventTime === "number"
              ? event2.eventTime
              : event2.eventTime[0];
          return a - b;
        }
      );
    },
    isDayShow(): Data[] {
      let copyEvents = [...this.sortedEvents] as Data[]; ///!!!!!!
      copyEvents.map((event: Data, index: number): void => {
        //!!!!
        if (index === copyEvents.length - 1) {
          return;
        }
        // event.isDayShow = false;
        let firstElm = event.eventTime;
        let secondElm = copyEvents[index + 1].eventTime;
        firstElm = typeof firstElm === "number" ? firstElm : firstElm[0];
        secondElm = typeof secondElm === "number" ? secondElm : secondElm[0];
        if (new Date(firstElm).getDate() !== new Date(secondElm).getDate()) {
          copyEvents[index + 1].isDayShow = true;
        }
      });
      copyEvents[0].isDayShow = true;
      return copyEvents;
    },
  },
  methods: {},
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
  margin: 14px 14px 4px 10px;
  height: calc(100% - 101px);
  display: flex;
}
.container-main {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  min-height: 0;
  overflow: scroll;
  padding: 10px 0;
}
@media screen and (max-width: 595px) {
  .wrapper {
    height: calc(100% - 125px);
  }
}
@media screen and (max-width: 365px) {
  .wrapper {
    height: calc(100% - 150px);
  }
}
</style>
