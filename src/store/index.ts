import { createStore, Store } from "vuex";

interface RootState {
  filters: {
    all: string;
    gen: string;
    attention: string;
    dangerous: string;
    veryDangerous: string;
    bad: string;
  };
}

const store = createStore<RootState>({
  state() {
    return {
      filters: {
        all: "Все",
        gen: "Общие",
        attention: "Внимание",
        dangerous: "Опасно",
        veryDangerous: "Очень опасно",
        bad: "Неблагоприятно",
      },
    };
  },
  mutations: {},
  getters: {
    getFilters(state) {
      return state.filters;
    },
  },
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

export default store;
