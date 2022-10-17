<template>
  <div class="app">
    <ClimateWidget />
    <AlertsWidget />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertsWidget from "@/components/AlertsWidget.vue";
import ClimateWidget from "@/components/ClimateWidget.vue";

export default defineComponent({
  components: {
    AlertsWidget,
    ClimateWidget,
  },
  created() {
    /**
     * Fake data for testing app.
     */
    setTimeout(() => {
      this.$store.commit("setData", {
        filters: {
          3: { name: "Общие" },
          1: { name: "Внимание" },
          2: { name: "Опасно" },
          5: { name: "Очень опасно" },
          6: { name: "Неблагоприятно" },
        },
        events: [
          {
            eventType: 1,
            eventTime: [
              new Date().setHours(11, 0, 0, 0) + 86400000,
              new Date().setHours(16, 30, 0, 0) + 86400000 * 2,
            ],
            timeFormat: `H:i`,
            titleText: `внимание`,
            eventText: `вчера, 11:00:30 am Максимальный уровень ультрофиолетового излучения за день`,
            iconCode: 1,
          },
          {
            eventType: 2,
            eventTime: new Date().setHours(9, 20, 0, 0) + 86400000,
            timeFormat: `H:i`,
            titleText: `сильный ветер`,
            eventText: `завтра, 9:20:00 am 10 сентября 2022 года, с 10 часов до 21 часов в Москве и ТиНАО и в Московской области ожидается сильный ветер с порывами 12 - 15 м/с.`,
            iconCode: 2,
          },
          {
            eventType: 3,
            eventTime: new Date().setHours(8, 23, 0, 0),
            timeFormat: `H:i`,
            titleText: `заход солнца`,
            eventText: `сегодня, 8:23:00 am Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
          },
          {
            eventType: 2,
            eventTime: new Date().setHours(8, 0, 0, 0),
            timeFormat: `H:i`,
            titleText: `сильный ветер`,
            eventText: `сегодня, 8:00:00 am Сегодня в Москве и области ожидается усиление ветра с порывами до 22 м/с`,
            iconCode: 2,
          },
          {
            eventType: 1,
            eventTime: [
              new Date().setHours(8, 15, 0, 0),
              new Date().setHours(17, 0, 0, 0) + 86400000,
            ],
            timeFormat: `H:i`,
            titleText: `внимание`,
            eventText: `сегодня, 8:15:00 am Максимальный уровень ультрофиолетового излучения за день.`,
            iconCode: 1,
          },
          {
            eventType: 3,
            eventTime: new Date().setHours(10, 3, 8, 0) + 86400000,
            timeFormat: `D-d-F-Y H:i:S`,
            titleText: `заход солнца`,
            eventText: `завтра, 10:00:00 pm Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.). Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
          },
          {
            eventType: 2,
            eventTime: new Date().setHours(19, 30, 0, 0) + 86400000 * 2,
            timeFormat: `H:i`,
            titleText: `сильный ветер`,
            eventText: `послезавтра, 7:30:00 pm В Москве и области ожидается усиление ветра с порывами до 22 м/с. Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
            iconCode: 2,
          },
          {
            eventType: 1,
            eventTime: [
              new Date().setHours(8, 0, 0, 0) - 86400000,
              new Date().setHours(16, 30, 0, 0) + 86400000 * 2,
            ],
            timeFormat: `H:i`,
            titleText: `внимание`,
            eventText: `вчера, 8:00:00 am Максимальный уровень ультрофиолетового излучения за день.`,
            iconCode: 1,
          },
          {
            eventType: 2,
            eventTime: new Date().setHours(8, 40, 0, 0),
            timeFormat: `H:i`,
            titleText: `сильный ветер`,
            eventText: `сегодня, 8:40:00 am 9 сентября 2022 года, с 10 часов до 20 часов в Москве и ТиНАО и в Московской области ожидается сильный ветер с порывами 12 - 17 м/с.`,
            iconCode: 2,
          },
          {
            eventType: 2,
            eventTime: new Date().setDate(new Date().getDate() - 1),
            timeFormat: `H:i`,
            titleText: `сильный ветер`,
            eventText: `вчера, 8:00:00 am в Москве и области ожидается усиление ветра с порывами до 22 м/с`,
            iconCode: 2,
          },
        ],
      });
    }, 1000);

    setTimeout(() => {
      this.$store.commit("setDataClimate", {
        climate: [
          {
            title: {
              ru: "Температура",
              en: "Temperature",
            },

            value: [
              {
                dimension: "°",
                10: {
                  avgmin: -3.6,
                  avgmax: 5.1,
                  extmin: -10.3,
                  extmax: 11.5,
                  avg: 2.4,
                },
                20: {
                  avgmin: -4.3,
                  avgmax: 6.4,
                  extmin: -11.3,
                  extmax: 14.5,
                  avg: 3.4,
                },
                30: {
                  avgmin: -5.7,
                  avgmax: 6.5,
                  extmin: -13.8,
                  extmax: 17.9,
                  avg: 4.4,
                },
              },
            ],
          },
        ],
      });
    }, 1000);
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /** styling scrollbar component*/

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 4px solid #cfd6e4;
  }
}
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #cfd6e4;
}

html,
body,
body > div {
  height: 100%;
}

*:focus-visible {
  outline: 2px solid $color-filter-font-focus;
}

.app {
  padding: 20px;
}
</style>
