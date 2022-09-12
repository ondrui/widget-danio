<template>
  <div class="filters-list">
    <div
      @click="$emit('filtered', filter)"
      class="filter-item"
      v-for="filter in filters"
      :key="`fw-${filter}`"
    >
      <div>{{ filtersName[filter] }}</div>
      3
      <img
        @click.stop="$emit('remove', filter)"
        src="../assets/images/filter-close.svg"
        alt="icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Filters {
  [index: string]: string;
}

export default defineComponent({
  data() {
    return {
      filtersName: {
        100: "Все",
        3: "Общие",
        1: "Внимание",
        2: "Опасно",
        5: "Очень опасно",
        6: "Неблагоприятно",
      } as Filters,
    };
  },
  emits: ["filtered", "remove"],
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
  cursor: pointer;
}
.img {
  display: block;
}
</style>
