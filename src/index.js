import Vue from 'vue';
import Application from '@/components/Application';

Vue.config.productionTip = false;

Vue.filter('zeroify', x => `0${x}`.slice(-2));

export default new Vue({
  el: '#app',
  render: h => h(Application),
});
