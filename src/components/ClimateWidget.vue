<template>
  <div class="climate">
    <ClimateWidgetNavbar
      :date="getDate"
      :options="getNavbarSelectOptions"
      @radio="radio"
      @select="select"
    />
    <ClimateWidgetList :values="getClimateData" :maxWidth="getMaxWidth" />
    <div class="btn-block">
      <button class="btn-custom">Подробнее</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
import ClimateWidgetList from "./ClimateWidgetList.vue";
import { WidgetClimateData } from "@/types/typesClimate";

export default defineComponent({
  components: {
    ClimateWidgetNavbar,
    ClimateWidgetList,
  },
  data() {
    return {
      options: {
        radio: "usually",
        select: "10",
      },
    };
  },
  computed: {
    getNavbarSelectOptions(): string[] {
      return this.$store.getters["climate/getNavbarSelectOptions"];
    },
    getClimateData(): WidgetClimateData[] {
      return this.$store.getters["climate/getClimateData"](this.options);
    },
    getDate(): string {
      return this.$store.getters["climate/getDate"];
    },
    getMaxWidth(): number {
      return this.$store.getters["climate/getMaxWidth"];
    },
  },
  methods: {
    radio(val: string): void {
      this.options.radio = val;
    },
    select(val: string): void {
      this.options.select = val;
    },
  },
});
</script>

<style lang="scss" scoped>
.climate {
  background: $color-white;
  min-width: 475px;
  max-width: 900px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}
.btn-block {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  margin-bottom: 20px;
}
.btn-custom {
  padding: 10px 95px;
  color: $color-black;
  background: none;
  border: 1px solid $color-progress-meter;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
}
</style>
