import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
import {dateTimeFormat} from '../../util/datetime_format.js'
class Questionnaire extends ServiceHttp {
  getList () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.questionnaire))
    })
  }
  /*增加和编辑客户*/
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        data.creater = '管理员'
        data.createTime = dateTimeFormat(new Date())
        console.log('save:', data)
        if (!data.id) {
          // 新增
          let last = demoData.questionnaire[demoData.questionnaire.length - 1]
          data.id = last.id + 1
          demoData.questionnaire.push(data)
          resolve()
        } else {
          // 修改
          let index = demoData.questionnaire.findIndex(item => {
            return item.id === data.id
          })
          demoData.questionnaire[index] = data
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
        let temp = demoData.questionnaire.find(item => {
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
        _.remove(demoData.questionnaire, item => {
          return ids.includes(item.id)
        })
        resolve()
      } catch (error) {
        reject(error)
      }
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
   * 获取客户和项目的级联结构*/
  getProjectList () {
    return new Promise((resolve, reject) => {
      let list = _.cloneDeep(demoData.customer)
      list.forEach(item => {
        item['value'] = item.name
        item['label'] = item.name
        let temp = demoData.project.filter(pro => {
          return pro.customerId == item.name // 此处原本是根据id进行筛选的，
        })
        console.log('temp:', temp)
        if (temp && temp.length) {
          temp.forEach(t => {
            t['value'] = t.name
            t['label'] = t.name
          })
          item['children'] = temp
        }
      })
      resolve(list)
    })
  }

  /**
   * 获取问卷状态*/
  getQuestionState () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.questionnaireState))
    })
  }
}
export default new Questionnaire()
