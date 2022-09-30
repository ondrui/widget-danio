<template>
  <div class="filters-list">
    <!--
      Кнопки фильтров поддерживают управление с клавиатуры.
    -->
    <div
      v-for="(filter, index) in filters"
      @click="isClick(index, filter)"
      @keyup.enter="isClick(index, filter)"
      @keyup.space="isClick(index, filter)"
      :class="{
        'filter-item': 'filter-item',
        active: isAppliedFilter(filter),
        disable: isDisabledFilter(filter),
      }"
      :key="`fw-${filter}`"
      :tabindex="isDisabledFilter(filter) ? '' : 0"
      :title="titleForLastFilter(filter) ? 'Нельзя отключить все фильтры!' : ''"
    >
      <div>{{ filter.name }}</div>
      <span class="filter-count">{{ filter.amount }}</span>
      <div class="filter-icon-block">
        <div class="filter-icon-open" v-if="filter.status !== 0">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="#C4C4C4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.5 4.5L3.5 8H4.5L4.5 4.5H8L8 3.5L4.5 3.5L4.5 0L3.5 0L3.5 3.5L0 3.5L0 4.5L3.5 4.5Z"
            />
          </svg>
        </div>
        <div class="filter-icon-close" v-else>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="#C4C4C4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.07115 4.7784L7.25309 7.96033L7.9602 7.25323L4.77826 4.07129L7.9602 0.88935L7.25309 0.182244L4.07115 3.36418L0.889129 0.18216L0.182022 0.889267L3.36404 4.07129L0.182022 7.25331L0.889129 7.96042L4.07115 4.7784Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <!--
      Кнопка 'Показать все'
    -->
    <div
      @click="$store.commit('changeFilterStatus', 100)"
      @keyup.enter="$store.commit('changeFilterStatus', 100)"
      @keyup.space="$store.commit('changeFilterStatus', 100)"
      :class="{
        'show-all': 'show-all',
        /**
         *  Кнопка 'Показать все' активна если количество примененных фильтров меньше трех.
         */
        disable: isDisabledShowAll,
      }"
      :tabindex="isDisabledShowAll ? '' : 0"
    >
      Показать все
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { Filters, Filter } from "@/types/types";
import { FilterStatus } from "@/basic";

export default defineComponent({
  props: {
    /**
     * Массив объектов, которые определяют состояние фильтра и его отображение.
     */
    filters: {
      type: Object as PropType<Filters>,
      required: true,
    },
    /**
     * totalAppliedFilters - Общее количество примененных фильтров
     */
    totalAppliedFilters: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isDisabledShowAll() {
      const totalDisabledFilters = Object.keys(this.filters).reduce(
        (previousValue, currentValue) =>
          this.filters[+currentValue].status === FilterStatus.Disabled
            ? previousValue + 1
            : previousValue,
        0
      );
      return (
        this.totalAppliedFilters ===
        Object.keys(this.filters).length - totalDisabledFilters
      );
    },
  },
  methods: {
    isAppliedFilter(filter: Filter) {
      return filter.status === FilterStatus.Applied;
    },
    isDisabledFilter(filter: Filter) {
      return filter.status === FilterStatus.Disabled;
    },
    titleForLastFilter(filter: Filter) {
      return (
        this.totalAppliedFilters === 1 && filter.status === FilterStatus.Applied
      );
    },

    isClick(index: number, filter: Filter) {
      /**
       * Нельзя изменить состояние фильтра при следующих условиях:
       * - общее количество предупреждений для данного фильтра равно нулю
       * или
       * - применен только один данный фильтр
       */
      if (filter.status !== FilterStatus.Disabled) {
        this.$store.commit("changeFilterStatus", index);
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
  gap: 10px 10px;

  .show-all {
    color: $color-filter-font-shadow;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    border-radius: 20px;
    margin: auto 0;
    padding: 6px 8px 6px 14px;
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
  padding: 6px 8px 6px 14px;
  gap: 3px;
  border-radius: 20px;
  border: 1px solid $color-filters-day-dark;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: $color-filter-font-default;
  cursor: pointer;

  &.disable {
    pointer-events: none;
    cursor: none;
  }
  .filter-count {
    opacity: 70%;
  }

  &:hover {
    color: $color-filter-font-default-hover;
    border: 1px solid $color-filter-font-shadow;

    .filter-icon-open svg {
      fill: $color-filter-font-default-hover;
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

  &:hover {
    background: #eaeef2;
    border: 1px solid $color-filters-day-dark;

    .filter-icon-close svg {
      fill: $color-filters-day-darker;
    }
  }

  &:active {
    box-shadow: 0px 0px 4px $color-filter-font-shadow;
  }
}
</style>
