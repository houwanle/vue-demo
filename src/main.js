import Vue from "vue";
import App from "./App.vue";
import{ router } from "./router/index";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount("#app");
