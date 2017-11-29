import Vue from 'vue';
import Root from '@/components/Root';

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: h => h(Root),
});
