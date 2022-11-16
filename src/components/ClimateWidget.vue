<template>
  <div class="climate">
    <ClimateWidgetNavbar
      :date="getDate"
      :options="getNavbarSelectOptions"
      :radioValues="getRadioValues"
      v-model:radio="options.radio"
      v-model:select="options.select"
      @select="select"
      :expressions="getExpressions"
    />
    <ClimateWidgetList :values="getClimateData" :expressions="getExpressions" />
    <div class="btn-block">
      <button class="btn-custom" @click="detail">
        {{ getExpressions.navBarLink }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
import ClimateWidgetList from "./ClimateWidgetList.vue";
import {
  ExpressionsLocales,
  KeysExpressionsLocales,
  WidgetClimateData,
} from "@/types/typesClimate";

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
       * Параметры маршрута, которые передаются через адресную строку.
       * @param locales - определяет языковую локаль.
       * @param addition - дополнительный параметр. Если принимает значение
       * "detail", то выводит предварительно заданное сообщение.
       */
      pathParams: {
        locales: "",
        addition: "",
      } as {
        locales: string;
        addition?: string;
      },
    };
  },
  watch: {
    /**
     * Функция следит за параметром locales в строке URL и вызывает
     * мутацию стора, в которую передается значение locales.
     */
    "$route.params.locales"(val: string): void {
      this.$store.commit("climate/setLocales", val);
    },
    /**
     * Функция следит за параметром addition в строке URL и выводит
     * предварительно заданное сообщение, если он принимает значение
     * "detail".
     */
    "$route.params.addition"(): void {
      if (this.$route.params.addition === "detail") {
        console.log(
          "Позже здесь будет размещена подробная инфа по каждому параметру!"
        );
      }
    },
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
    getLocales(): keyof ExpressionsLocales {
      return this.$store.getters["climate/getLocales"];
    },
    /**
     * Возвращает строковые константы с учетом локали.
     * @example {
     *   prepositions: ["от","до"],
     *   changeDimensionLocale: ["см"],
     *   radioBtnCaption: ["обычно","рекорды"],
     *   selectCaptions: ["в среднем за","лет"],
     *   noData: "н/д",
     *   navBarLink: "подробнее"}
     */
    getExpressions(): KeysExpressionsLocales {
      return this.$store.getters["climate/getExpressions"];
    },
    /**
     * Возвращает настройки отрисовки радио кнопок в компоненте Navbar.vue.
     */
    getRadioValues(): string[][] {
      return [
        ["usually", this.getExpressions.radioBtnCaption[0]],
        ["records", this.getExpressions.radioBtnCaption[1]],
      ];
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
    /**
     * Функция обработчик для установки параметру @param addition значения
     * "detail".
     */
    detail(): void {
      this.$router.push({
        name: "main",
        params: { locales: this.getLocales, addition: "detail" },
      });
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
.btn-custom::first-letter {
  text-transform: capitalize;
}
</style>
