import Vue from 'vue';
import Root from './components/Root.vue';

const app = new Vue({
  render: h => h(Root),
});

app.$mount('#app');
