<template>
  <div class="wrapper">
    <div class="container-main">
      <ClimateWidgetItem
        v-for="(event, index) in 5"
        :key="`wn-${index}`"
        :event="event"
        :index="+index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetItem from "./ClimateWidgetItem.vue";
export default defineComponent({
  components: { ClimateWidgetItem },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 10px 13px 32px 27px;
  // height: calc(100% - 101px);
  max-height: 448px;
  display: flex;
}

.container-main {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 6px 1px 0;
  flex-basis: 100%;
}
</style>
