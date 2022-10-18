import { Module } from "vuex";
import { RootState } from "./index";
import { DataClimate } from "@/types/typesClimate";
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
    getClimateData: (state: State): { value: DataClimate[]; date: string } => {
      return "";
    },
  },
  namespaced: true,
};
