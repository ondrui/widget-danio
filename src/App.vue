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
import { DataClimate } from "@/types/typesClimate";
import { DataAlerts } from "@/types/typesAlerts";

export default defineComponent({
  components: {
    AlertsWidget,
    ClimateWidget,
  },
  created() {
    /**
     * Fake data for testing app.
     */

    const {
      filters,
      events,
    }: {
      filters: { [index: number]: { name: string } };
      events: DataAlerts[];
    } = {
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
    };

    setTimeout(() => {
      this.$store.commit("setDataAlerts", { filters, events });
    }, 1000);

    const dataClimate: DataClimate[] = [
      {
        title: {
          ru: "Температура",
          en: "Temperature",
        },
        value: [
          {
            dim: "°",
            data: [
              {
                time: "10",
                avgmin: "-3.6",
                avgmax: "5.1",
                extmin: "-10.3",
                extmax: "11.5",
                avg: "2.4",
              },
              {
                time: "20",
                avgmin: "-4.3",
                avgmax: "6.4",
                extmin: "-11.3",
                extmax: "14.5",
                avg: "3.4",
              },
              {
                time: "30",
                avgmin: "-5.7",
                avgmax: "6.5",
                extmin: "-13.8",
                extmax: "17.9",
                avg: "4.4",
              },
            ],
          },
        ],
      },
      {
        title: {
          ru: "Давление",
          en: "Pressure",
        },
        value: [
          {
            dim: "мм рт. ст.",
            data: [
              {
                time: "10",
                avgmin: "741",
                avgmax: "773",
                extmin: "733",
                extmax: "771",
                avg: "760",
              },
              {
                time: "20",
                avgmin: "738",
                avgmax: "778",
                extmin: "730",
                extmax: "780",
                avg: "760",
              },
              {
                time: "30",
                avgmin: "735",
                avgmax: "780",
                extmin: "730",
                extmax: "783",
                avg: "763",
              },
            ],
          },
        ],
      },
      {
        title: {
          ru: "Осадки",
          en: "Precipitation",
        },
        def: { ru: "вероятность" },
        value: [
          {
            dim: "%",
            data: [
              {
                time: "10",
                avgmin: "0",
                avgmax: "100",
                extmin: "0",
                extmax: "100",
                avg: "45",
              },
              {
                time: "20",
                avgmin: "0",
                avgmax: "100",
                extmin: "0",
                extmax: "100",
                avg: "50",
              },
              {
                time: "30",
                avgmin: "0",
                avgmax: "100",
                extmin: "0",
                extmax: "100",
                avg: "52",
              },
            ],
          },
        ],
      },
      {
        title: {
          ru: "Высота снега",
          en: "Snow depth",
        },

        value: [
          {
            dim: "см",
            data: [
              {
                time: "10",
                avgmin: "8",
                avgmax: "21",
                extmin: "5",
                extmax: "25",
                avg: "15",
              },
              {
                time: "20",
                avgmin: "8",
                avgmax: "25",
                extmin: "4",
                extmax: "26",
                avg: "14",
              },
              {
                time: "30",
                avgmin: "4",
                avgmax: "26",
                extmin: "4",
                extmax: "30",
                avg: "14",
              },
            ],
          },
        ],
      },
    ];

    setTimeout(() => {
      this.$store.commit("climate/setDataClimate", {
        climate: dataClimate,
        format: "d F",
      });
    }, 1000);

    setTimeout(() => {
      this.$store.commit("climate/setTimestampClimate", 1664514900000);
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

// html,
// body {
//   height: 100%;
// }

*:focus-visible {
  outline: 2px solid $color-filter-font-focus;
}

.app {
  padding: 50px;
}
</style>
