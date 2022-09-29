import { createStore, Store } from "vuex";

import type { Data, Filters } from "@/types/types";
import { FilterStatus } from "@/basic";
import { HandlerEvent } from "./../handlers/HandlerEvent";

interface RootState {
  filters: Filters;

  events: HandlerEvent[];
}

const store = createStore<RootState>({
  state() {
    return {
      filters: {},
      events: [],
    };
  },
  mutations: {
    /**
     * Заполняет store данными, полученными с бэкэнда, предварительно их модифицировав.
     * @param state
     * @param payload Объект с фильтрами и массивом предупреждений
     */
    setData(state, payload) {
      /**
       * Класс HandlerEvent добавляет в объект предупреждения методы,
       * которые будут применяться в дальнейшем.
       */
      state.events = payload.events.map(
        (event: Data) => new HandlerEvent(event)
      );
      /**
       * Вычисляется общее количество предупреждений с определенным типом и записывает
       * его в свойство amount объекта фильтра, а также присваивает свойству status значение
       *  FilterStatus.Applied если общее количество предупреждений больше 0 или
       * FilterStatus.Disabled, если общее количество предупреждений равно 0.
       */
      const filterObj = payload.filters;
      for (const key in filterObj) {
        filterObj[key].amount = state.events.filter(
          (f) => f.eventType === +key
        ).length;
        if (!filterObj[key].status) {
          if (filterObj[key].amount > 0) {
            filterObj[key].status = FilterStatus.Applied;
          } else {
            filterObj[key].status = FilterStatus.Disabled;
          }
        }
      }
      state.filters = filterObj;
    },
    /**
     * Вызывается когда пользователь кликает на кнопку фильтра или
     * кнопку 'Показать все'.
     * @param {number} payload Параметром принимает код
     * выбранного фильтра или число 100
     *
     * Если параметр равен 100, то применяются ВСЕ фильтры у которых общее
     * количество предупреждений больше 0.
     *
     * Если принимается код фильтра, то у данного фильтра меняется свойство status на
     * противоположное при условии, что у него общее количество предупреждений
     * больше 0.
     *
     */
    changeFilterStatus(state, payload: number) {
      console.log(payload);
      if (payload === 100) {
        for (const key in state.filters) {
          if (state.filters[key].amount > 0) {
            state.filters[key].status = FilterStatus.Applied;
          }
        }
      } else {
        if (state.filters[payload].status === FilterStatus.Removed) {
          state.filters[payload].status = FilterStatus.Applied;
        } else {
          state.filters[payload].status = FilterStatus.Removed;
        }
      }
    },
    // setChangeToTextWidget(state) {
    //   // console.log("mutation start");
    //   // state.events.push({
    //   //   eventType: 2,
    //   //   eventTime: 1662702000000,
    //   //   timeFormat: `year, month, day`,
    //   //   titleText: `сильный ветер`,
    //   //   eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
    //   //   iconCode: 2,
    //   // });
    //   // state.events.push({
    //   //   eventType: 2,
    //   //   eventTime: 1662702000000,
    //   //   timeFormat: `year, month, day`,
    //   //   titleText: `сильный ветер`,
    //   //   eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
    //   //   iconCode: 2,
    //   // });
    //   // state.events.push({
    //   //   eventType: 2,
    //   //   eventTime: 1662702000000,
    //   //   timeFormat: `year, month, day`,
    //   //   titleText: `сильный ветер`,
    //   //   eventText: `FFFFFFFFFFFFFFFFFFFFFFFF`,
    //   //   iconCode: 2,
    //   // });
    //   // state.events.map(
    //   //   (item) => (item.eventText = "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    //   // );
    //   // state.filters.map((i) => (i.name = "ssss"));
    //   // console.log(state);
    // },
  },
  getters: {
    /**
     * Возвращает копию объекта с настройками фильтров, полученными из store
     */
    addFilters(state): Filters {
      const copyFilter: Filters = JSON.parse(JSON.stringify(state.filters));
      return copyFilter;
    },
    /**
     * Возвращает общее количество примененных фильтров
     * @example
     * // returns 3
     */
    totalAppliedFilters(state): number {
      return Object.keys(state.filters).reduce(
        (previousValue, currentValue) =>
          state.filters[+currentValue].status === FilterStatus.Applied
            ? ++previousValue
            : previousValue,
        0
      );
    },
    /**
     * Возвращает копию массива объектов с предупреждениями отфильтрованные и отсортированные
     * по дате и времени. А также добавляет в объект опциональный параметр, который
     * отвечает за отображение блока с датой. Если true, то блок отрисовывается.
     */
    filteredEvents(state, getters) {
      const copyEvents = [...state.events];
      const filters = getters.addFilters;
      return (
        copyEvents
          .filter((event) => {
            return Object.keys(filters).some((key) => {
              return (
                event.eventType === +key &&
                filters[key].status === FilterStatus.Applied
              );
            });
          })
          .sort((event1: HandlerEvent, event2: HandlerEvent): number => {
            return event1.getTimestamp() - event2.getTimestamp();
          })
          /** Set the isDayShow property mapping the date block. */
          /**
           * Параметр isDayShow устанавливается в true если:
           * - индекс предупреждения равен 0
           * - у соседних предупреждений разная дата, то параметр isDayShow
           * устанавливается в true второму предупреждению.
           */
          .map((event: HandlerEvent, index: number, arr: HandlerEvent[]) => {
            if (index === 0) {
              return { ...event, isDayShow: true };
            }
            if (
              new Date(arr[index - 1].getTimestamp()).getDate() !==
              new Date(event.getTimestamp()).getDate()
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
