<template>
  <div class="container-nav">
    <div class="date-nav">{{ date }}</div>
    <div class="radio-btn-nav">
      <input
        type="radio"
        name="radios"
        id="usually"
        value="usually"
        v-model="picked"
        @change="radio"
      />
      <label for="usually" tabindex="0">{{ radioBtnCaption[0] }}</label>
      <input
        type="radio"
        name="radios"
        id="records"
        value="records"
        v-model="picked"
        @change="radio"
      />
      <label for="records" tabindex="0">{{ radioBtnCaption[1] }}</label>
    </div>
    <div class="select-nav">
      <div>{{ selectCaptions[0] }}</div>
      <select name="select" v-model="selected" @change="select">
        <option
          v-for="(option, index) in options"
          :key="option"
          :value="option"
          :selected="index === 0"
        >
          {{ `${option} ${selectCaptions[1]}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import {
  radioBtnValue,
  radioBtnCaptionRu,
  selectCaptionsRu,
} from "@/constants/climate";

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
  },
  emits: ["radio", "select"],
  data() {
    return {
      radioBtnValue: radioBtnValue,
      radioBtnCaption: radioBtnCaptionRu,
      selectCaptions: selectCaptionsRu,
      picked: "usually",
      selected: "",
    };
  },
  // watch: {
  //   options(newValue) {
  //     console.log("watch");
  //     this.selected = newValue[0];
  //   },
  // },
  methods: {
    radio() {
      this.$emit("radio", this.picked);
    },
    select() {
      this.$emit("select", this.selected);
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

  & input[type="radio"] {
    display: none;
    appearance: none;
  }

  & label {
    padding: 2px 8px;
    color: $color-navbar-font;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
  }

  & input[type="radio"]:checked + label {
    background: $color-white;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
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
