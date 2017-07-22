import Vue from 'vue';
import App from './components/Application';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
});
