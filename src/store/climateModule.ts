import { Module } from "vuex";
import { RootState } from "./index";
import { DataClimate, GetterClimateData } from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
type State = {
  values: DataClimate[];
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
      { climate, format }: { climate: DataClimate[]; format: string }
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
