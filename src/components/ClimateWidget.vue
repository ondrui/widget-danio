<template>
  <div class="climate">
    <ClimateWidgetNavbar
      :date="getDate"
      :options="getNavbarSelectOptions"
      :radioValues="radioValues"
      v-model:radio="options.radio"
      v-model:select="options.select"
      @select="select"
      :locales="getLocales"
    />
    <ClimateWidgetList :values="getClimateData" :locales="getLocales" />
    <div class="link-block">
      <router-link class="link-custom" to="/climate">{{
        expression[getLocales].navBarLink
      }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
import ClimateWidgetList from "./ClimateWidgetList.vue";
import { ExpressionLocales, WidgetClimateData } from "@/types/typesClimate";
import { expression } from "@/constants/climate";

export default defineComponent({
  components: {
    ClimateWidgetNavbar,
    ClimateWidgetList,
  },
  data() {
    return {
      /**
       * Свойства передаваемые в store для изменения данных для отображения.
       * Значения определяются выбранными радио кнопками и селектом
       * в компоненте ClimateWidgetNavbar.vue.
       */
      options: {
        /**
         * Свойство содержит значение атрибута value радиокнопки
         * в компоненте Navbar.vue.
         */
        radio: "usually",
        /**
         * Свойство содержит значение интервала времени, который задается
         * выбором опции элемента select в компоненте Navbar.vue.
         */
        select: "",
      },
      /**
       * Массив с данными для отрисовки радио кнопок.
       */
      radioValues: [] as string[][],
      /**
       * Определяем импортированные строковые константы с учетом локали
       * для применения в шаблоне компоненты.
       */
      expression: expression,
    };
  },
  created() {
    this.radioValues = [
      ["usually", expression[this.getLocales].radioBtnCaption[0]],
      ["records", expression[this.getLocales].radioBtnCaption[1]],
    ];
    /**
     * Функция следит за строкой URL и выводит сообщение в консоль
     * при определенном совпадении части строки в URL.
     */
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
    /**
     * Возвращает из store массив временных интервалов для отображения в меню опций
     * элемента select.
     */
    getNavbarSelectOptions(): string[] {
      return this.$store.getters["climate/getNavbarSelectOptions"];
    },
    /**
     * Возвращает массив объектов с данными передаваемые из
     * store в компоненты для отображения.
     */
    getClimateData(): WidgetClimateData[] {
      return this.$store.getters["climate/getClimateData"](this.options);
    },
    /**
     * Возвращает из store дату в виде строки в заданном формате.
     */
    getDate(): string {
      return this.$store.getters["climate/getDate"];
    },
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales(): keyof ExpressionLocales {
      return this.$store.getters["climate/getLocales"];
    },
  },
  methods: {
    /**
     * Обработчик для радио кнопок.
     * @param val - содержит значение атрибута value радиокнопки
     * в компоненте Navbar.vue.
     */
    radio(val: string): void {
      this.options.radio = val;
    },
    /**
     * Обработчик для селекта.
     * @param val - содержит значение интервала времени, который задается
     * выбором опции элемента select в компоненте Navbar.vue.
     */
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
.link-custom::first-letter {
  text-transform: capitalize;
}
</style>
