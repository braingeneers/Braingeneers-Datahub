import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from './router'
import VueEllipseProgress from 'vue-ellipse-progress';
import VueLuxon from "vue-luxon";
// import { createAuth0 } from '@auth0/auth0-vue';


import '../src/assets/css/styles.css';
// Vue.use(VueLuxon);

// Import the Auth0 configuration and plugin
import { domain, clientId, audience, serverUrl} from '../auth_config.json';
import { Auth0Plugin } from '@/auth/auth0-plugin';

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
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    serverUrl,
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      );
    },
  });
// Vue.use(createAuth0({
//       "domain": "dev-zp88n4zn.us.auth0.com",
//       "clientId": "e2Ahwi6tTVehcx4z50sTs0Uc76kwxIrD",
//       redirect_uri: window.location.origin
//     })
//   );

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");