<template>
  <div class="climate">
    <ClimateWidgetNavbar :date="getClimateData.date" />
    <ClimateWidgetList :values="getClimateData.values" />
    <div class="btn-block">
      <button class="btn">Подробнее</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
import ClimateWidgetList from "./ClimateWidgetList.vue";
import { GetterClimateData } from "@/types/typesClimate";

export default defineComponent({
  components: {
    ClimateWidgetNavbar,
    ClimateWidgetList,
  },
  computed: {
    getClimateData(): GetterClimateData {
      return this.$store.getters["climate/getClimateData"];
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.climate {
  padding: 12px 13px 20px 22px;
  border-radius: 12px;
  min-width: 438px;
  height: 100%;
  background: $color-white;
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
}
.btn-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
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
