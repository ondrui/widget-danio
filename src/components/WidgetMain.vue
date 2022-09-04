<!-- eslint-disable prettier/prettier -->
<template>
  <div class="wrapper">
    <h1>Главное</h1>
    <div class="sort">
      Упорядочить по важности / <strong>по времени</strong>
    </div>
    <div class="container-main">
      <WidgetMainItem :dataItem="dataItem1"/>
      <WidgetMainItem :dataItem="dataItem2"/>
      <WidgetMainItem :dataItem="dataItem3"/>
      <WidgetMainItem :dataItem="dataItem4"/>
      <WidgetMainItem :dataItem="dataItem5"/>
      <WidgetMainItem :dataItem="dataItem6"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetMainItem from "./WidgetMainItem.vue";

export default defineComponent({
  components: {
    WidgetMainItem,
  },
  data() {
    return {
      dataItem1: {
        eventType: 1,
        eventTime: [1662192000000, 1662298200000],
        timeFormat: `year, month, day`,
        titleText: `внимание`,
        eventText: `Максимальный уровень ультрофиолетового излучения за день`,
        iconCode: 1,
      },
      dataItem2: {
        eventType: 3,
        eventTime: 1662312180000,
        timeFormat: `year, month, day`,
        titleText: `заход солнца`,
        eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
      },
      dataItem3: {
        eventType: 2,
        eventTime: 1662224400000,
        timeFormat: `year, month, day`,
        titleText: `сильный ветер`,
        eventText: `В Москве и области ожидается усиление ветра с порывами до 22 м/с`,
        iconCode: 2,
      },
      dataItem4: {
        eventType: 1,
        eventTime: [1662192000000, 1662298200000],
        timeFormat: `year, month, day`,
        titleText: `внимание`,
        eventText: `Максимальный уровень ультрофиолетового излучения за день. Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
        iconCode: 1,
      },
      dataItem5: {
        eventType: 3,
        eventTime: 1662312180000,
        timeFormat: `year, month, day`,
        titleText: `заход солнца`,
        eventText: `Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.). Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
      },
      dataItem6: {
        eventType: 2,
        eventTime: 1662224400000,
        timeFormat: `year, month, day`,
        titleText: `сильный ветер`,
        eventText: `В Москве и области ожидается усиление ветра с порывами до 22 м/с. Заход солнца сегодня в 20:23, на 5 минут позже чем вчера, продолжительность дня составила 12 ч. 43 мин. (+ 15 мин.)`,
        iconCode: 2,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.container-main {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 25px;
  overflow: scroll;
  height: 80%;
}
.wrapper {
  width: 352px;
  border: 2px solid lightblue;
  border-radius: 12px;
  padding: 10px;
  height: 500px;
}
</style>
