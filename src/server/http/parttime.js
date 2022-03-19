import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Parttime extends ServiceHttp {
  getList () {
    // api返回数据结果最好是children级联的
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.parttime))
    })
  }
  /*增加和编辑组织机构*/
  save (arg) {
    let data = _.cloneDeep(arg)
    return new Promise((resolve, reject) => {
      try {
        if (!data.id) {
          // 新增
          let last = demoData.parttime[demoData.parttime.length - 1]
          data.id = last.id + 1
          demoData.parttime.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.parttime.findIndex(item => {
            return item.id === data.id
          })
          demoData.parttime[index] = data
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /*
  * 获取指定id的组织机构信息
  * */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      try {
        let temp = demoData.parttime.find(item => {
          return item.id == id
        })
        resolve(_.cloneDeep(temp))
      } catch (error) {
        reject(error)
      }
    })
  }
  /*
  * 要删除的数据的id集合
  * */
  del (ids) {
    return new Promise((resolve, reject) => {
      if (ids.constructor.name !== 'Array') {
        ids = [ids]
      }
      try {
        _.remove(demoData.parttime, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default new Parttime()
