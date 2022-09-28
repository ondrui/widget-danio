import { createStore, Store } from "vuex";

import type { Data, Filters } from "@/types/types";
import { FilterStatus } from "@/basic";

interface RootState {
  filters: Filters;

  events: Data[];
}

const store = createStore<RootState>({
  state() {
    return {
      filters: {},
      events: [],
    };
  },
  mutations: {
    setData(state, payload) {
      state.events = payload.events;
      state.filters = payload.filters;
    },
    setFilter(state, payload) {
      console.log(payload);

      if (payload === 100) {
        for (const filter in state.filters) {
          state.filters[filter].status =
            state.filters[filter].amount > 0
              ? FilterStatus.Applied
              : FilterStatus.Disabled;
        }
        state.filters;
      } else {
        state.filters[payload].status = FilterStatus.Removed;
      }
    },
    setChangeToTextWidget(state) {
      console.log("mutation start");
      state.events.push({
        eventType: 2,
        eventTime: 1662702000000,
        timeFormat: `year, month, day`,
        titleText: `сильный ветер`,
        eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
        iconCode: 2,
      });
      state.events.push({
        eventType: 2,
        eventTime: 1662702000000,
        timeFormat: `year, month, day`,
        titleText: `сильный ветер`,
        eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
        iconCode: 2,
      });
      state.events.push({
        eventType: 2,
        eventTime: 1662702000000,
        timeFormat: `year, month, day`,
        titleText: `сильный ветер`,
        eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
        iconCode: 2,
      });
      state.events.map(
        (item) => (item.eventText = "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
      );
      // state.filters.map((i) => (i.name = "ssss"));
      // console.log(state);
    },
  },
  getters: {
    addFilters(state) {
      const filterObj = JSON.parse(JSON.stringify(state.filters));
      for (const filter in filterObj) {
        filterObj[filter].amount = state.events.filter(
          (f) => f.eventType === +filter
        ).length;
        if (!filterObj[filter].status) {
          filterObj[filter].status =
            filterObj[filter].amount > 0
              ? FilterStatus.Applied
              : FilterStatus.Disabled;
        }
      }
      filterObj[1].amount = 10;
      return filterObj;
    },
    filteredEvents(state, getters) {
      const computedEventTime = (event: Data): number => {
        if (typeof event.eventTime === "number") {
          return event.eventTime;
        } else {
          return event.eventTime[0];
        }
      };

      const filters = getters.addFilters;
      return (
        [...state.events]
          .filter((event) => {
            return Object.keys(filters).some((key) => {
              return (
                event.eventType === +key &&
                filters[key].status === FilterStatus.Applied
              );
            });

            // const filteredOutput = input.filter((obj) => {
            //   return Object.keys(filter).every((filterKeys) => {
            //     return obj[filterKeys] === filter[filterKeys];
            //   });
            // });
            // return filters.some((f) => {
            //   return f.code === event.eventType && f.isActive;
            // });
          })
          .sort((event1, event2): number => {
            return computedEventTime(event1) - computedEventTime(event2);
          })
          /** Set the isDayShow property mapping the date block. */
          /**
           * Параметр isDayShow устанавливается в true если:
           * - индекс предупреждения равен 0
           * - у соседних предупреждений разная дата, то параметр isDayShow
           * устанавливается в true второму предупреждению.
           */
          .map((event: Data, index: number, arr: Data[]) => {
            if (index === 0) {
              return { ...event, isDayShow: true };
            }
            if (
              new Date(computedEventTime(arr[index - 1])).getDate() !==
              new Date(computedEventTime(event)).getDate()
            ) {
              return { ...event, isDayShow: true };
            } else {
              return { ...event, isDayShow: false };
            }
          })
      );
    },
  },
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

export default store;
