import { Module } from "vuex";
import { RootState } from "./index";
import { DataClimate, GetterClimateData } from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
import { radioBtnValue } from "@/constants/climate";
import { title } from "process";

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
    getCoolData:
      (state: State): ((radio: string, select: string) => DataClimate[]) =>
      (radio = "usually", select = "10"): DataClimate[] => {
        const climate = state.values;
        const climate1 = state.values.map(({ value, title }) => {
          const findValue = value[0].data.find(
            ({ time }: { time: string }) => time === select
          );
          // console.log("value[0]", value[0]);
          // console.log("findValue", findValue);
          return {
            ...title,
            ...value[0],
            data: findValue,
          };
        });
        console.log("climate1", climate1);
        return climate;
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
