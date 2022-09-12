import { createStore, Store } from "vuex";

interface RootState {
  filters: number[];

  events: {
    eventType: number;
    eventTime: number | number[];
    timeFormat: string;
    titleText: string;
    eventText: string;
    iconCode?: number;
  }[];
}

const store = createStore<RootState>({
  state() {
    return {
      filters: [100, 3, 1, 2],
      events: [
        {
          eventType: 1,
          eventTime: [1662624030000, 1662730230000],
          timeFormat: `year, month, day`,
          titleText: `внимание`,
          eventText: `Максимальный уровень ультрофиолетового излучения за день`,
          iconCode: 1,
        },
        {
          eventType: 2,
          eventTime: 1662790800000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `10 сентября 2022 года, с 10 часов до 21 часов в Москве и ТиНАО и в Московской области ожидается сильный ветер с порывами 12 - 15 м/с.`,
          iconCode: 2,
        },
        {
          eventType: 3,
          eventTime: 1662700980000,
          timeFormat: `year, month, day`,
          titleText: `заход солнца`,
          eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
        },
        {
          eventType: 2,
          eventTime: 1662699600000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `Сегодня в Москве и области ожидается усиление ветра с порывами до 22 м/с`,
          iconCode: 2,
        },
        {
          eventType: 1,
          eventTime: [1662699600000, 1662818400000],
          timeFormat: `year, month, day`,
          titleText: `внимание`,
          eventText: `Максимальный уровень ультрофиолетового излучения за день.`,
          iconCode: 1,
        },
        {
          eventType: 3,
          eventTime: 1662742800000,
          timeFormat: `year, month, day`,
          titleText: `заход солнца`,
          eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.). Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        },
        {
          eventType: 2,
          eventTime: 1662913800000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `В Москве и области ожидается усиление ветра с порывами до 22 м/с. Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
          iconCode: 2,
        },
        {
          eventType: 1,
          eventTime: [1662613200000, 1663075800000],
          timeFormat: `year, month, day`,
          titleText: `внимание`,
          eventText: `Максимальный уровень ультрофиолетового излучения за день.`,
          iconCode: 1,
        },
        {
          eventType: 2,
          eventTime: 1662702000000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `9 сентября 2022 года, с 10 часов до 20 часов в Москве и ТиНАО и в Московской области ожидается сильный ветер с порывами 12 - 17 м/с.`,
          iconCode: 2,
        },
      ],
    };
  },
  mutations: {},
  getters: {},
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

export default store;
