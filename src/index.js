import Vue from 'vue';
import Application from '@/components/Application';
import store from '@/store';

Vue.config.productionTip = false;
Vue.filter('zeroify', x => `0${x}`.slice(-2));

export default new Vue({
  store,
  el: '#app',
  render: h => h(Application),
});
