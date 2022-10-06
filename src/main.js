import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from './router'
import VueEllipseProgress from 'vue-ellipse-progress';
import VueLuxon from "vue-luxon";
// import AWS from 'aws-sdk';
// import { createAuth0 } from '@auth0/auth0-vue';


import '../src/assets/css/styles.css';
// Vue.use(VueLuxon);

// Import the Auth0 configuration and plugin
import { domain, clientId} from '../auth_config.json';
import { Auth0Plugin } from '@/auth/auth0-plugin';
// import AWS from 'aws-sdk';
// import { AWS } from 'aws-sdk';


// Vue.use(AWS)
Vue.use(BootstrapVue);
Vue.use(VueEllipseProgress);
Vue.use(VueLuxon, {
    input: {
        zone: "utc",
        format: "iso"
    },
    output: "full"
});
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      );
    },
  });
//   Vue.use(AWS)
// Vue.use(AWS.config.update({
//     accessKeyId: `${process.env.VUE_APP_AWS_ACCESS_KEY_ID}`,
//     secretAccessKey: `${process.env.VUE_APP_AWS_SECRET_ACCESS_KEY}`,
// }));

  Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");