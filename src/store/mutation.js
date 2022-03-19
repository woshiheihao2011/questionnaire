import * as types from './mutation-types'
const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_USER] (state, user) {
    state.loginUser = user
  },
  [types.SET_CONFIG] (state, config) {
    state.config = config
  },
  [types.PERMISSIONS] (state, permissions) {
    state.permissions = permissions
  }
  // [types.NAV] (state, nav) {
  //   state.nav = nav
  // },
  // [types.BREADCRUMB] (state, breadcrumb) {
  //   state.breadcrumb = breadcrumb
  // }
}
export default mutations
