import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from './router'
import VueEllipseProgress from 'vue-ellipse-progress';
import VueLuxon from "vue-luxon";

import '../src/assets/css/styles.css';
// Vue.use(VueLuxon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueEllipseProgress);
Vue.use(VueLuxon, {
    input: {
        zone: "utc",
        format: "iso"
    },
    output: "full"
});
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");