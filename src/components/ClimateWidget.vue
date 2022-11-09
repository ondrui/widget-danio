<template>
  <div class="climate">
    <ClimateWidgetNavbar
      :date="getDate"
      :options="getNavbarSelectOptions"
      :radioValues="radioValues"
      v-model:radio="options.radio"
      v-model:select="options.select"
      @select="select"
    />
    <ClimateWidgetList :values="getClimateData" />
    <div class="link-block">
      <router-link class="link-custom" to="/climate">{{
        expression.ru.navBarLink.replace(
          /^./,
          expression.ru.navBarLink[0].toUpperCase()
        )
      }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
import ClimateWidgetList from "./ClimateWidgetList.vue";
import { WidgetClimateData } from "@/types/typesClimate";
import { expression } from "@/constants/climate";

export default defineComponent({
  components: {
    ClimateWidgetNavbar,
    ClimateWidgetList,
  },
  data() {
    return {
      options: {
        radio: "usually",
        select: "",
      },
      radioValues: [
        ["usually", expression.ru.radioBtnCaption[0]],
        ["records", expression.ru.radioBtnCaption[1]],
      ],
      expression: expression,
    };
  },
  created() {
    this.$watch(
      () => this.$route,
      () => {
        if (this.$route.path === "/climate") {
          console.log(
            "Позже здесь будет размещена подробная инфа по каждому параметру!"
          );
        }
      }
    );
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
.link-block {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  margin-bottom: 20px;
}
.link-custom {
  padding: 10px 95px;
  color: $color-black;
  background: none;
  border: 1px solid $color-progress-meter;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  cursor: pointer;
}
</style>
