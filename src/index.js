/* eslint-disable no-new */

import Vue from 'vue';
import App from './components/Application';

Vue.config.productionTip = false;

Vue.filter('zeroify', x => `0${x}`.slice(-2));

new Vue({
  el: '#root',
  render: h => h(App),
});
