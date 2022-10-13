import { createStore, Store } from "vuex";

import type { Data, Filters, Filter } from "@/types/types";
import { FilterStatus } from "@/basic";
import { HandlerEvent } from "./../handlers/HandlerEvent";
import { climateModule } from "./climateModule";

interface RootState {
  filters: Filters;
  events: HandlerEvent[];
  locales: string;
}

const store = createStore<RootState>({
  state() {
    return {
      /**
       * Начальные настройки фильтров.
       */
      filters: {},
      events: [],
      /**
       * Языковая метка для определения локали.
       */
      locales: "ru",
    };
  },
  modules: {
    climate: climateModule,
  },
  actions: {
    /**
     * Получает параметром код фильтра.
     * Вычисляет общее количество фильтров со статусом FilterStatus.Applied.
     * Вызывает мутацию changeFilterStatus, в которую передает массив с этими
     * данными.
     * @param key Код фильтра.
     * @param total Общее количество фильтров со статусом FilterStatus.Applied.
     */
    FilterStatus({ commit, getters }, key: number) {
      const total: number = getters.calcTotalFilters(FilterStatus.Applied);
      commit("changeFilterStatus", [total, key]);
    },
  },
  mutations: {
    /**
     * Заполняет store данными, полученными с бэкэнда, предварительно их модифицировав.
     * @param state Текущее состояние store.
     * @param events Массив предупреждений.
     * @param filters Объект, который управляет отображением
     * блока с фильтрами и их состояниями.
     */
    setData(
      state: RootState,
      { events, filters }: { events?: Data[]; filters?: Filters }
    ): void {
      if (events == null) {
        events = [];
      }

      if (filters == null) {
        filters = {};
      }
      /**
       * Класс HandlerEvent добавляет в объект предупреждения методы,
       * которые будут применяться в дальнейшем.
       */
      state.events = events.map((event: Data) => new HandlerEvent(event));
      /**
       * Вычисляется общее количество предупреждений с определенным типом и записывает
       * его в свойство amount объекта фильтра, а также присваивает свойству status значение
       *  FilterStatus.Applied если общее количество предупреждений больше 0 или
       * FilterStatus.Disabled, если общее количество предупреждений равно 0.
       */
      const filterObj = filters;
      for (const key in filterObj) {
        filterObj[key].amount = state.events?.filter(
          (f) => f.eventType === +key
        ).length;

        filterObj[key].status =
          filterObj[key].amount > 0
            ? FilterStatus.Applied
            : FilterStatus.Disabled;
      }
      state.filters = filterObj;
    },

    /**
     * Вызывается когда пользователь кликает на
     * кнопку 'Показать все'.
     * Применяются ВСЕ фильтры у которых общее
     * количество предупреждений больше 0.
     * @param state Текущее состояние store.
     */
    resetFilters(state: RootState): void {
      for (const key in state.filters) {
        if (state.filters[key].amount > 0) {
          state.filters[key].status = FilterStatus.Applied;
        }
      }
    },

    /**
     * Вызывается когда пользователь кликает на кнопку фильтра.
     * выбранного фильтра
     * @param state Текущее состояние store.
     * @param key Код фильтра.
     * @param total Общее количество фильтров со статусом FilterStatus.Applied.
     */
    changeFilterStatus(state: RootState, [total, key]: number[]): void {
      /**
       * У фильтра проверяется значение свойства status.
       *
       * Если оно равно FilterStatus.Applied, то вычисляется общее
       * количество фильтров с таким статусом. Если оно больше 1, то статус фильтра
       * меняется на FilterStatus.Removed.
       *
       * Если значение свойства status равно FilterStatus.Removed, то статус фильтра
       * меняется на FilterStatus.Applied.
       */

      state.filters[key].status =
        state.filters[key].status === FilterStatus.Applied && total > 1
          ? FilterStatus.Removed
          : FilterStatus.Applied;
    },
  },
  getters: {
    /**
     * Возвращает языковую метку для определения локали.
     * @param state Текущее состояние store.
     * @example
     * "ru"
     */
    getLocales: (state: RootState): string => state.locales,
    /**
     * Возвращает объект с настройками фильтров, полученными из store
     * @param state Текущее состояние store.
     * @example
     * [
     * 1: {name: 'Внимание', amount: 3, status: 0}
     * 2: {name: 'Опасно', amount: 5, status: 0}
     * 3: {name: 'Общие', amount: 2, status: 0}
     * 5: {name: 'Очень опасно', amount: 0, status: 2}
     * 6: {name: 'Неблагоприятно', amount: 0, status: 2}
     * ];
     */
    getFilters: (state: RootState): Filters => state.filters,
    /**
     * Возвращает общее количество фильтров со определенным статусом, который получает
     * как параметр.
     * @param state Текущее состояние store.
     * @param status Статус фильтра.
     * @example
     * 3
     */
    calcTotalFilters:
      (state: RootState): ((status: FilterStatus) => number) =>
      (status: FilterStatus): number => {
        return Object.values(state.filters).reduce<number>(
          (previousValue: number, currentValue: Filter) =>
            currentValue.status === status ? previousValue + 1 : previousValue,
          0
        );
      },
    /**
     * Возвращает копию массива объектов с предупреждениями отфильтрованные и отсортированные
     * по дате и времени. А также добавляет в объект опциональный параметр, который
     * отвечает за отображение блока с датой. Если true, то блок отрисовывается.
     * @param state Текущее состояние store.
     */
    getFilteredAndSortedEvents(state: RootState, getters): Data[] {
      const copyEvents = [...state.events];
      const filters: Filters = getters.getFilters;
      return (
        copyEvents
          .filter(
            (event: HandlerEvent) =>
              filters[event.eventType].status === FilterStatus.Applied
          )
          .sort((event1: HandlerEvent, event2: HandlerEvent): number => {
            return event1.getTimestamp() - event2.getTimestamp();
          })
          /** Set the isDayShow property mapping the date block. */
          /**
           * Значение свойства isDayShow устанавливается в true если:
           * - индекс предупреждения равен 0 или
           * - у соседних предупреждений разная дата, то параметр isDayShow
           * устанавливается в true второму предупреждению.
           */
          .map((event: HandlerEvent, index: number, arr: HandlerEvent[]) => {
            return {
              ...event,
              isDayShow:
                index === 0 ||
                new Date(arr[index - 1].getTimestamp()).getDate() !==
                  new Date(event.getTimestamp()).getDate(),
            };
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
