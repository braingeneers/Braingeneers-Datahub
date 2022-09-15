import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from './router'
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueEllipseProgress);
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");