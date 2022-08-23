// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


import Vue from "vue";
// import * as Vue from 'vue';
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
  Vue.config.productionTip = false;
  Vue.use(BootstrapVue);
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");