<template>
  <div class="app">
    <WidgetMain />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetMain from "./components/WidgetMain.vue";

export default defineComponent({
  components: {
    WidgetMain,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
body > div,
.app {
  height: 100%;
}

.app {
  padding: 20px;
}
</style>
