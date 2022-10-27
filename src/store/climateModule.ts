import { Module } from "vuex";
import { RootState } from "./index";
import { DataClimate, GetterClimateData } from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
type State = {
  values: DataClimate[];
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
      { climate, format }: { climate: DataClimate[]; format: string }
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
    getNavbarSelectOptions(state: State) {
      const arr = [
        ...state.values.reduce(
          (acc, { value }) => (
            value[0].data.forEach(({ time }) => acc.add(time), acc), acc
          ),
          new Set()
        ),
      ].sort();

      // let arr: string[] = [];
      // const obj: { [index: string]: boolean } = {};

      // state.values.forEach((item) => {
      //   item.value[0].data.forEach(({ time }) => {
      //     obj[time] = true;
      //   });
      //   return Object.keys(obj);
      // });

      // arr = Object.keys(obj);

      // state.values.forEach((item) => {
      //   item.value[0].data.forEach(({ time }) => {
      //     if (arr.indexOf(time) === -1) {
      //       arr.push(time);
      //     }
      //   });
      // });
      return arr;
    },

    getClimateData: (
      state: State,
      getters,
      rootState: RootState,
      rootGetters
    ): GetterClimateData => {
      const dateStr = HandlerEvent.setTimeFormat(
        state.timestamp,
        state.dateFormat,
        rootGetters.getLocales
      );
      return {
        values: state.values,
        date: dateStr,
      };
    },
  },
  namespaced: true,
};
