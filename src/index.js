import Vue from 'vue';
import Application from '@/components/Application';

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: h => h(Application),
});
