<template>
  <div class="filters-list">
    <div class="filter-item" v-for="filter in filters" :key="`fw-${filter}`">
      <div>{{ filter }}</div>
      3
      <img src="../assets/images/filter-close.svg" alt="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    filters() {
      return this.$store.state.filters;
    },
  },
});
</script>

<style lang="scss" scoped>
.filters-list {
  display: flex;
  flex-wrap: wrap;
  margin: 18px 12px 0 14px;
  gap: 5px 6px;
}
.filter-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 6px 4px 12px;
  gap: 3px;
  border-radius: 20px;
  background-color: $color-filters-day-dark;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-filters-day-darker;
}
.img {
  display: block;
}
</style>
