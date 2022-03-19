import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Staff extends ServiceHttp {
  getList () {
    return new Promise((resolve, reject) => {
      resolve(demoData.staff)
    })
  }
  /*增加和编辑客户*/
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (!data.id) {
          // 新增
          let last = demoData.staff[demoData.staff.length - 1]
          data.id = last.id + 1
          demoData.staff.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.staff.findIndex(item => {
            return item.id === data.id
          })
          demoData.staff[index] = data
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
  * 获取指定id的人员信息
  * */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      try {
        let temp = demoData.staff.find(item => {
          return item.id == id
        })
        resolve(temp)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
  * 要删除的数据的id集合
  * */
  del (ids) {
    return new Promise((resolve, reject) => {
      if (ids.constructor.name !== 'Array') {
        ids = [ids]
      }
      try {
        _.remove(demoData.staff, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 获取角色列表
   * */
  getRoleList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.role))
    })
  }
}
export default new Staff()
