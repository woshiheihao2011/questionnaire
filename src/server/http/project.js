import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Project extends ServiceHttp {
  getList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.project))
    })
  }
  /*增加和编辑客户*/
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (!data.id) {
          // 新增
          let last = demoData.project[demoData.project.length - 1]
          data.id = last.id + 1
          demoData.project.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.project.findIndex(item => {
            return item.id === data.id
          })
          demoData.project[index] = data
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
  * 获取指定id的客户信息
  * */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      try {
        let temp = demoData.project.find(item => {
          return item.id == id
        })
        resolve(_.cloneDeep(temp))
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
        _.remove(demoData.project, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 获取项目类型列表
   * */
  getProjectTypeList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.projectType))
    })
  }

  /**
   * 获取项目负责人
   * */
  getProjectManager () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.staff))
    })
  }

  /**
   * 获取客户列表
   * */
  getCustomerList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.customer))
    })
  }

  /**
   * 为项目添加成员
   * */
  saveProjectMember (id, data) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('不能为空项目添加成员'))
      }
      try {
        let temp = demoData.project.find(item => {
          return item.id == id
        })
        if (temp) {
          temp.manager = data.manager
          temp.trainer = data.trainer
          temp.groupLeader = data.groupLeader
          resolve()
        } else {
          reject(new Error('所选择的项目不存在'))
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default new Project()
