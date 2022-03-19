import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Role extends ServiceHttp {
  getList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.role))
    })
  }
  /**
   * 增加和编辑角色
   * */
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (!data.id) {
          // 新增
          let last = demoData.role[demoData.role.length - 1]
          data.id = last.id + 1
          data.enable = 1
          demoData.role.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.role.findIndex(item => {
            return item.id === data.id
          })
          demoData.role[index] = data
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
  * 获取指定id的角色信息
  * */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      try {
        let temp = demoData.role.find(item => {
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
        _.remove(demoData.role, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 设置角色的可用性
   * */
  enable (id, flag) {
    return new Promise((resolve, reject) => {
      try {
        let index = demoData.role.findIndex(item => {
          return item.id === id
        })
        if (index !== -1) {
          demoData.role[index]['enable'] = flag
          console.log(JSON.stringify(demoData.role[index]))
          resolve()
        } else {
          reject(new Error('该角色不存在'))
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default new Role()
