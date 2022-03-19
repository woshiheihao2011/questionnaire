import $ from 'jquery'
require('@ztree/ztree_v3/js/jquery.ztree.all.js')
export default {
  /*
  * 创建缓存
  * */
  created () {
    this._cacheZtreeInstanceArr = []
  },

  /*
  * 集中销毁ztree实例
  * */
  destroyed () {
    this._cacheZtreeInstanceArr.forEach((v, i) => {
      if (v && v.destroy) {
        v.destroy()
      }
    })
  },
  methods: {
    /*
    * 创建ztree实例
    * */
    zTreeInit (...args) {
      const zTree = $.fn.zTree.init(...args)
      this._cacheZtreeInstanceArr.push(zTree)
      return zTree
    }
  }
}
