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
        {{ expression.ru.selectCaptions[0] }}
      </div>
      <select name="select" @change="selectHandler">
        <option v-for="option in options" :key="option" :value="option">
          {{ `${option} ${expression.ru.selectCaptions[1]}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { expression } from "@/constants/climate";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    radioValues: {
      type: Array as PropType<string[][]>,
      required: true,
    },
    radio: {
      type: String,
      required: true,
    },
    select: {
      type: String,
      required: true,
    },
  },
  emits: {
    radio(payload: string) {
      return payload;
    },
    select(payload: string) {
      return payload;
    },
    "update:radio": String,
    "update:select": String,
  },
  data() {
    return {
      expression: expression,
      defaultCheckedRadioBtn: this.radioValues[0][0],
    };
  },
  watch: {
    options() {
      this.$emit("select", this.options[0]);
    },
  },
  methods: {
    isChecked(value: string): boolean {
      return this.radio === value;
    },
    radioHandler(e: Event) {
      this.$emit("update:radio", (e.target as HTMLInputElement).value);
    },
    selectHandler(e: Event) {
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
