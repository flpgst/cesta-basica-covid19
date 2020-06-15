import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import api from "./plugins/api";
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';


Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
});

Vue.config.productionTip = false;

Vue.prototype.$http = api;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
