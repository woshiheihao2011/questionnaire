import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Customer extends ServiceHttp {
  getList () {
    return new Promise((resolve, reject) => {
      resolve(demoData.customer)
    })
  }
  /*增加和编辑客户*/
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (!data.id) {
          // 新增
          let last = demoData.customer[demoData.customer.length - 1]
          data.id = last.id + 1
          demoData.customer.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.customer.findIndex(item => {
            return item.id === data.id
          })
          demoData.customer[index] = data
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /*
  * 获取指定id的客户信息
  * */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      try {
        let temp = demoData.customer.find(item => {
          return item.id == id
        })
        resolve(temp)
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
        _.remove(demoData.customer, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default new Customer()
