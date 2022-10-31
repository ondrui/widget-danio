import { Module } from "vuex";
import { RootState } from "./index";
import {
  StoreClimateData,
  WidgetClimateData,
  ClimateValue,
} from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
import { radioBtnValue } from "@/constants/climate";

type State = {
  values: StoreClimateData[];
  timestamp: number;
  dateFormat: string;
  maxEndpointRightWidth: number;
};

export const climateModule: Module<State, RootState> = {
  state: (): State => ({
    values: [],
    timestamp: 0,
    dateFormat: "",
    maxEndpointRightWidth: 0,
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
      state.maxEndpointRightWidth = 0;
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
      (
        radio = "usually",
        select = "10"
      ): Array<WidgetClimateData | undefined> => {
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

            if (dataSelect === undefined) {
              return undefined;
            }

            const dataSelectRadio = () => {
              return {
                min:
                  radio === radioBtnValue[0]
                    ? dataSelect?.avgmin
                    : dataSelect?.extmin,
                max:
                  radio === radioBtnValue[0]
                    ? dataSelect?.avgmax
                    : dataSelect?.extmax,
                avg: dataSelect?.avg,
              };
            };

            return {
              title,
              def,
              dim,
              data: dataSelectRadio(),
            };
          })
          .filter((i) => i !== undefined);
      },
  },
  namespaced: true,
};
