import { DataClimate } from "@/types/typesClimate";
type State = {
  climate: DataClimate[];
  timestamp: number;
};

export const climateModule = {
  state: (): State => ({
    climate: [],
    timestamp: 0,
  }),
  actions: {},
  mutations: {
    setDataClimate(
      state: State,
      { climate }: { climate: DataClimate[] }
    ): void {
      if (climate == null) {
        climate = [];
      }
      state.climate = climate;
    },
  },
  getters: {},
  namespace: true,
};
