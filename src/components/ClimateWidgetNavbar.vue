<template>
  <div class="container-nav">
    <div class="date-nav">9 Января</div>
    <div class="radio-btn-nav">
      <input type="radio" name="radios" id="usually" checked />
      <label for="usually">обычно</label>
      <input type="radio" name="radios" id="records" />
      <label for="records">рекорды</label>
    </div>
    <div class="select-nav">
      <div>В среднем за</div>
      <select name="select">
        <option value="10">10 лет</option>
        <option value="20">20 лет</option>
        <option value="30">30 лет</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.container-nav {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-right: 13px;
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
  gap: 5px;
  align-items: flex-end;

  & > div {
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: $color-navbar-font;
  }

  & > select {
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
