import Vue from 'vue';
import Application from '@/components/Application';
import 'd3-transition';

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: h => h(Application),
});
