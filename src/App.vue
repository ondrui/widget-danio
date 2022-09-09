<template>
  <div class="app">
    <WidgetMain :events="events" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetMain from "./components/WidgetMain.vue";

export default defineComponent({
  components: {
    WidgetMain,
  },
  data() {
    return {
      events: [
        {
          eventType: 1,
          eventTime: [1662537600000, 1662643800000],
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
          eventText: `10 августа 2022 года, с 10 часов до 21 часов в Москве и ТиНАО и в Московской области ожидается сильный ветер с порывами 12 - 15 м/с.`,
          iconCode: 2,
        },
        {
          eventType: 3,
          eventTime: 1662614580000,
          timeFormat: `year, month, day`,
          titleText: `заход солнца`,
          eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
        },
        {
          eventType: 2,
          eventTime: 1662656400000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `Сегодня в Москве и области ожидается усиление ветра с порывами до 22 м/с`,
          iconCode: 2,
        },
        {
          eventType: 1,
          eventTime: [1662526800000, 1662742800000],
          timeFormat: `year, month, day`,
          titleText: `внимание`,
          eventText: `Максимальный уровень ультрофиолетового излучения за день.`,
          iconCode: 1,
        },
        {
          eventType: 3,
          eventTime: 1662656400000,
          timeFormat: `year, month, day`,
          titleText: `заход солнца`,
          eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.). Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        },
        {
          eventType: 2,
          eventTime: 1662654600000,
          timeFormat: `year, month, day`,
          titleText: `сильный ветер`,
          eventText: `В Москве и области ожидается усиление ветра с порывами до 22 м/с. Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
          iconCode: 2,
        },
        {
          eventType: 1,
          eventTime: [1662737400000, 1662888600000],
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
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
body > div,
.app {
  height: 100%;
}

.app {
  padding: 20px;
}
</style>
