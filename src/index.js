/* eslint-disable no-new */

import Vue from 'vue';
import App from './components/Application';

Vue.config.productionTip = false;

new Vue({
  el: '#root',
  render: h => h(App),
});
