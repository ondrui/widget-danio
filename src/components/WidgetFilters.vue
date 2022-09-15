<template>
  <div class="filters-list">
    <div
      @click="
        (filter.amount > 0 && condition > 1) || filter.isActive !== true
          ? $emit('filtered', filter)
          : null
      "
      class="filter-item"
      :class="{
        active: filter.isActive && filter.amount > 0,
        disable: filter.amount === 0,
      }"
      v-for="filter in filters"
      :key="`fw-${filter.code}`"
    >
      <div>{{ filter.name }}</div>
      <span class="filter-count">{{ filter.amount }}</span>
      <span class="icon"></span>
      <!-- <img

        src="../assets/images/filter-open.svg"
        alt="icon"
      /> -->
    </div>
    <div
      @click="$emit('filtered', 100)"
      class="show-all"
      :class="{ disable: condition === 3 }"
    >
      Показать все
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

interface Filters {
  code: number;
  amount: number;
  name: string;
  isActive: boolean;
}

export default defineComponent({
  props: {
    filters: {
      type: Array as PropType<Filters[]>,
      requare: true,
    },
    counters: {
      type: Array as PropType<number[]>,
      require: true,
    },
  },
  emits: ["filtered", "remove"],
  computed: {
    condition(): number {
      if (this.counters !== undefined) {
        return this.counters[0] - this.counters[1];
      } else {
        return 1;
      }
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

  .show-all {
    color: $color-filter-font-shadow;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    margin: auto 0;
    padding-left: 7px;
    cursor: pointer;

    &.disable {
      pointer-events: none;
      cursor: none;
      color: $color-filter-font-disabled;
    }

    &:hover {
      text-decoration-line: underline;
    }

    &:active {
      color: #1f54b7;
    }
  }
}
.filter-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 6px 4px 12px;
  gap: 3px;
  border-radius: 20px;
  border: 1px solid $color-filters-day-dark;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: $color-filter-font-default;
  cursor: pointer;

  &.disable {
    pointer-events: none;
    cursor: none;
  }
  .icon {
    display: inline-block;
    background-size: cover;
    background-image: url(../assets/images/filter-open.svg);
    width: 8px;
    height: 8px;
  }

  .filter-count {
    opacity: 70%;
  }

  &:hover {
    color: $color-filter-font-default-hover;
    border: 1px solid $color-filter-font-shadow;

    .icon {
      background-image: url(../assets/images/filter-open-hover.svg);
    }
  }
  &:active {
    box-shadow: 0px 0px 4px $color-filter-font-shadow;
  }
}
.filter-item.active {
  background-color: $color-filters-day-dark;
  color: $color-filters-day-darker;
  // border: none;

  .icon {
    background-image: url(../assets/images/filter-close.svg);
  }

  &:hover {
    background: #eaeef2;
    border: 1px solid $color-filters-day-dark;

    .icon {
      background-image: url(../assets/images/filter-close-hover.svg);
    }
  }

  &:active {
    box-shadow: 0px 0px 4px $color-filter-font-shadow;
  }
}
.img {
  display: block;
}
</style>
