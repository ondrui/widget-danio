import { Module } from "vuex";
import { RootState } from "./index";
import {
  StoreClimateData,
  WidgetClimateData,
  ClimateValue,
  ParamsValue,
  SelectRadioData,
} from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
import { radioBtnValue, expression } from "@/constants/climate";

type State = {
  /**
   * Свойство содержит объект с данными с сервера для отображения виджета.
   */
  values: StoreClimateData[];
  /**
   * Дата для которой отображаются данные. Приходит с сервера в виде timestamp.
   */
  timestamp: number;
  /**
   * Формат отображения даты. Приходит с сервера в строковом формате.
   */
  dateFormat: string;
};

export const climateModule: Module<State, RootState> = {
  state: (): State => ({
    values: [],
    timestamp: 0,
    dateFormat: "",
  }),
  mutations: {
    /**
     * Заполняет store данными, полученными с бэкэнда.
     * @param state Текущее состояние store.
     * @param climate Массив с данными для отображения виджетом.
     * @param format Формат отображения даты.
     */
    setDataClimate(
      state: State,
      { climate, format }: { climate: StoreClimateData[]; format: string }
    ): void {
      if (climate == null) {
        climate = [];
      }
      state.values = climate;
      state.dateFormat = format;
    },
    /**
     * Получение timestamp даты.
     * @param state Текущее состояние store.
     * @param timestamp Дата для которой отображаются данные.
     */
    setTimestampClimate(state: State, timestamp: number): void {
      state.timestamp = timestamp;
    },
  },
  getters: {
    /**
     * Возвращает дату в виде строки в заданном формате.
     * @param state Текущее состояние store.
     * @param getters not used
     * @param rootState not used
     * @param rootGetters Доступ к глобальным геттерам.
     * @example "30 сентября"
     */
    getDate: (
      state: State,
      getters,
      rootState: RootState,
      rootGetters
    ): string => {
      const dateStr = HandlerEvent.setTimeFormat(
        state.timestamp,
        state.dateFormat,
        rootGetters.getLocales
      );
      return dateStr;
    },
    /**
     * Возвращает массив временных интервалов для отображения в меню опций
     * элемента select.
     * @param state Текущее состояние store.
     * @example ["10","20","30"]
     */
    getNavbarSelectOptions(state: State): string[] {
      const arr: string[] = [
        ...state.values.reduce<Set<string>>(
          (acc, { value }) => (
            value[0].data.forEach(
              ({ time }: { time: string }) => acc.add(time),
              acc
            ),
            acc
          ),
          new Set()
        ),
      ].sort();
      return arr;
    },
    /**
     * Возвращает массив объектов с данными передаваемые из
     * store в компоненты для отображения.
     * @param state Текущее состояние store.
     * @param radio -
     * @param select - Интервал времени, который задается выбором опции
     * элемента select в компоненте Navbar.vue.
     */
    getClimateData:
      (state: State) =>
      ({
        radio,
        select,
      }: {
        radio: string;
        select: string;
      }): Array<WidgetClimateData | undefined> => {
        const numRender = (val: string | undefined): string =>
          val ?? expression.ru.noData;
        const dimRender = (dim: string): string =>
          dim === expression.ru.changeDimensionLocale[0] ? ` ${dim}` : dim;

        return state.values
          .map(({ value, title, def }) => {
            /**
             * Функция будет реализована позже. Пока всегда возвращает первый элемент массива.
             * @param prop
             */
            const findDimValue: (
              prop: ClimateValue[],
              dim?: string
            ) => ClimateValue = (prop) => prop[0];
            const { dim, data } = findDimValue(value);
            const dataSelect = data.find(
              ({ time }: { time: string }) => time === select
            );

            if (dataSelect === undefined) return undefined;

            const dataSelectRadio = (): SelectRadioData => {
              const min = radioBtnValue[radio as keyof typeof radioBtnValue][0];
              const max = radioBtnValue[radio as keyof typeof radioBtnValue][1];
              return {
                min: numRender(dataSelect[min as keyof ParamsValue]),
                max: numRender(dataSelect[max as keyof ParamsValue]),
                avg: numRender(dataSelect.avg),
              };
            };

            return {
              title,
              def,
              dim: dimRender(dim),
              data: dataSelectRadio(),
            };
          })
          .filter((i) => i !== undefined);
      },
  },
  /**
   * Задаем собственное пространство имён для этого модуля.
   */
  namespaced: true,
};
