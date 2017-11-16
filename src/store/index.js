/* eslint global-require: 0 */

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

if (module.hot) {
  module.hot.accept([
    './state',
    './getters',
    './mutations',
    './actions',
  ], () => {
    const newState = require('./state').default;
    const newGetters = require('./getters').default;
    const newMutations = require('./mutations').default;
    const newActions = require('./actions').default;

    store.hotUpdate({
      state: newState,
      getters: newGetters,
      mutations: newMutations,
      actions: newActions,
    });
  });
}

export default store;
