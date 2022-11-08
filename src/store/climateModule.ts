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
  values: StoreClimateData[];
  timestamp: number;
  dateFormat: string;
};

export const climateModule: Module<State, RootState> = {
  state: (): State => ({
    values: [],
    timestamp: 0,
    dateFormat: "",
  }),
  actions: {},
  mutations: {
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
    setTimestampClimate(state: State, timestamp: number): void {
      state.timestamp = timestamp;
    },
  },
  getters: {
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
    getNavbarSelectOptions(state: State) {
      const arr = [
        ...state.values.reduce(
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
      //console.log("getter climate", arr);
      return arr;
    },
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
             * @returns
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
  namespaced: true,
};
