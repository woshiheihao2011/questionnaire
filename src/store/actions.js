// import axios from 'axios'
import * as types from './mutation-types.js'
// import API from '@/server/route/common'
// export const ajaxConfig = ({ commit, state }) => {
//   return new Promise(function (resolve, reject) {
//     axios.get(API.CONFIG + '?version=' + state.config.VERSION).then(function (response) {
//       if (response.data.status === 1) {
//         commit(types.SET_CONFIG, response.data.config)
//       }
//       resolve()
//     })
//       .catch(function (response) {
//         reject()
//       })
//   })
// }
//
// export const initConfig = ({ dispatch, commit }) => {
//   dispatch('ajaxConfig').then((config) => {
//     // commit(types.SET_CONFIG, localStorage.valueOf())
//   })
// }
// 面包屑导航
export const breadcrumb = ({ commit }, breadcrumb) => {
  commit(types.BREADCRUMB, breadcrumb)
}
