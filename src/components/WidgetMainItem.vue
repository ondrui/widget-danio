<template>
  <div class="container-item" :class="setEvent">
    <div class="topInfo">
      <div class="time">{{ setTime }}</div>
      <div class="title">{{ dataItem.titleText }}</div>
    </div>
    <div class="block">
      <div v-if="dataItem.iconCode" class="icon">
        <img :src="setUrlIcon" alt="icon" />
      </div>
      <div class="text">{{ dataItem.eventText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

interface Data {
  eventType: number;
  eventTime: number | number[];
  timeFormat: string;
  titleText: string;
  eventText: string;
  iconCode?: number;
}

interface CodeColor {
  [index: number]: string;
}

interface IconItem {
  [index: number]: string;
}

export default defineComponent({
  props: {
    dataItem: {
      type: Object as PropType<Data>,
      required: true,
    },
  },
  data() {
    return {
      codeColor: {
        3: "primary",
        1: "warning",
        2: "danger",
      } as CodeColor,
      iconItem: {
        2: "wind",
        1: "uv-index",
      } as IconItem,
    };
  },
  computed: {
    setEvent(): string {
      return this.dataItem.eventType
        ? this.codeColor[this.dataItem.eventType]
        : (console.log("несуществующий код eventType"), "primary");
    },
    setUrlIcon(): string {
      return this.dataItem.iconCode
        ? require(`@/assets/images/${
            this.iconItem[this.dataItem.iconCode]
          }.svg`)
        : (console.log("нет иконки"), "#");
    },
    setTime() {
      if (typeof this.dataItem.eventTime === "number") {
        let date = new Date(this.dataItem.eventTime).toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        // return `${date.getHours()}:${date.getMinutes()}`;
        return date;
      } else {
        let date1 = new Date(this.dataItem.eventTime[0]).toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
        let date2 = new Date(this.dataItem.eventTime[1]).toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        //let dateNow = Date.now();

        //et diff =  - dateNow;
        let dayWord = "завтра";

        return `с ${date1} до ${date2} ${dayWord}`;
        // return `с ${date1.getHours()}:${date1.getMinutes()} до ${date2.getHours()}:${date2.getMinutes()}`;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container-item {
  border-radius: 10px;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0.2px;
}
.topInfo,
.time,
.title {
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
}
.time {
  line-height: 16px;
  text-align: center;
  padding: 2px 8px 2px 8px;
}
.title {
  padding: 2px 15px 3px 11px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.block {
  display: flex;
  margin: 16px 21px 15px 16px;
}
.icon {
  display: flex;
  align-items: center;
}
.text {
  text-align: justify;
}
</style>
