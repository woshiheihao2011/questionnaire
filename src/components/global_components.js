import dataTable from './data_table.vue'
import urlTable from './url_table.vue'
export default (Vue) => {
  Vue.component('DataTable', dataTable)
  Vue.component('UrlTable', urlTable)
}
