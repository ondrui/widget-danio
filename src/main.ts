import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";

// Optional, since every component imports their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App).use(router);
app.use(BootstrapVue3);
app.use(store).mount("#app");
