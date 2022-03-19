// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import _ from 'lodash'
import $ from 'jquery'
import routeMap from './server/route/map' // todo连接正式api后需删除此处代码
import globalComponents from './components/global_components' // 注册全局组建
import 'iview/dist/styles/iview.css'
// require('@ztree/ztree_v3/css/zTreeStyle/zTreeStyle.css')
require('@ztree/ztree_v3/css/metroStyle/metroStyle.css')
// require('@ztree/ztree_v3/css/awesomeStyle/awesome.css')
// require('@ztree/ztree_v3/css/demo.css')
require('static/css/tree.css')
// import './my-theme/index.less'
Vue.prototype.routeMap = routeMap // todo 连接正式api后需删除此处代码
Vue.prototype._ = _
Vue.prototype.$ = Vue.prototype.jQuery = window.$ = $

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(globalComponents)
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
