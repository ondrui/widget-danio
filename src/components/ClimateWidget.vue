<template>
  <div class="widget">
    <ClimateWidgetNavbar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClimateWidgetNavbar from "./ClimateWidgetNavbar.vue";
export default defineComponent({
  components: {
    ClimateWidgetNavbar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped></style>
