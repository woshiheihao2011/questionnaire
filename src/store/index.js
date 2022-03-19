import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import * as actions from './actions'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    token: '',
    loginUser: null
  },
  mutations,
  actions
})
