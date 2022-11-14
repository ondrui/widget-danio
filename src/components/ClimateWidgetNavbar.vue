<template>
  <div class="container-nav">
    <div class="date-nav">{{ date }}</div>
    <div class="radio-btn-nav">
      <label
        :class="{ checked: isChecked(value[0]) }"
        :for="value[0]"
        v-for="value in radioValues"
        :key="value[0]"
      >
        <input
          type="radio"
          name="radios"
          :id="value[0]"
          :value="value[0]"
          @change="radioHandler"
        />
        {{ value[1] }}
      </label>
    </div>
    <div class="select-nav">
      <div>
        {{ expressions.selectCaptions[0] }}
      </div>
      <select name="select" @change="selectHandler">
        <option v-for="option in options" :key="option" :value="option">
          {{ `${option} ${expressions.selectCaptions[1]}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { ExpressionsLocales } from "@/types/typesClimate";

export default defineComponent({
  props: {
    /**
     * Массив временных интервалов для отображения в меню опций элемента select.
     * @example ["10","20","30"]
     */
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    /**
     * Дата в виде строки в заданном формате.
     * @example "30 сентября"
     */
    date: {
      type: String,
      required: true,
    },
    /**
     * Массив с данными для отрисовки радио кнопок.
     * @example [["usually","обычно"],["records","рекорды"]]
     */
    radioValues: {
      type: Array as PropType<string[][]>,
      required: true,
    },
    /**
     * входной параметр modelValue options.radio определенный в родителе.
     */
    radio: {
      type: String,
      required: true,
    },
    /**
     * входной параметр modelValue options.select определенный в родителе.
     */
    select: {
      type: String,
      required: true,
    },
    /**
     * Строковые константы с учетом локали.
     */
    expressions: {
      type: Object as PropType<ExpressionsLocales[keyof ExpressionsLocales]>,
      required: true,
    },
  },
  /**
   * Аннотация типов для событий.
   */
  emits: {
    radio(payload: string): string {
      return payload;
    },
    select(payload: string): string {
      return payload;
    },
    "update:radio": String,
    "update:select": String,
  },
  watch: {
    /**
     * Устанавливаем первоначальное значение селекта, после получения
     * массива временных интервалов для отображения в меню опций.
     */
    options() {
      this.$emit("select", this.options[0]);
    },
  },
  methods: {
    /**
     * Используется для указания стилей внешнего вида кнопок при их выборе.
     * @param value - содержит значение атрибута value радиокнопки.
     */
    isChecked(value: string): boolean {
      return this.radio === value;
    },
    /**
     * Обработчик события для радио кнопок.
     * Отправляет значение атрибута value радиокнопки в родительский компонент.
     * @param e - объект Event.
     */
    radioHandler(e: Event): void {
      this.$emit("update:radio", (e.target as HTMLInputElement).value);
    },
    /**
     * Обработчик события для элемента select.
     * Отправляет значение атрибута value опции элемента select
     * в родительский компонент.
     * @param e - объект Event.
     */
    selectHandler(e: Event): void {
      this.$emit("update:select", (e.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style lang="scss" scoped>
.container-nav {
  display: flex;
  align-items: flex-start;
  column-gap: 12px;
  margin: 12px 28px 0 22px;
}
.date-nav {
  white-space: nowrap;
  padding-top: 3px;
  margin-right: auto;
  color: $color-black;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
}
.radio-btn-nav {
  display: flex;
  justify-content: space-around;
  gap: 6px;
  padding: 4px;
  align-items: center;
  background: $color-progress-bg;
  border-radius: 10px;

  &:focus-within {
    outline: 2px solid #6ec0fc;
  }

  & label {
    padding: 2px 8px;
    color: $color-navbar-font;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;

    & input[type="radio"] {
      appearance: none;
      margin: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    &.checked {
      background: $color-white;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  }
}

.select-nav {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 5px;
  align-items: flex-end;
  & > div {
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: $color-navbar-font;
  }

  & > div::first-letter {
    text-transform: capitalize;
  }

  & select {
    padding: 3px 1px;
    border: none;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    background: $color-progress-bg;
    color: $color-navbar-font;
    border-radius: 3.8134px;
  }
}
</style>
