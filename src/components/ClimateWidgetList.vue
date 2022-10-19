<template>
  <div class="wrapper">
    <div class="container-main">
      <ClimateWidgetItem
        v-for="value in values"
        :key="value.title.en?.slice(0, 4)"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ClimateWidgetItem from "./ClimateWidgetItem.vue";
import { DataClimate } from "@/types/typesClimate";

export default defineComponent({
  components: { ClimateWidgetItem },
  props: {
    values: {
      type: Array as PropType<DataClimate[]>,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding-left: 5px;
  max-height: 160px;
  display: flex;
  margin-bottom: 32px;
}

.container-main {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 6px;
  flex-basis: 100%;
}
</style>
