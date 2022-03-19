import ServiceHttp from './http'
import demoData from '../../data/demo_data'
import _ from 'lodash'
class Set extends ServiceHttp {
  get () {
    return new Promise((resolve, reject) => {
      resolve(_.cloneDeep(demoData.set))
    })
  }
  /*增加和编辑客户*/
  save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (data) {
          demoData.set = data
        } else {
          demoData.set = {
            removeTime: 120,
            urgeTime: 60,
            isAutofilter: '1',
            isScreencap: '1'
          }
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default new Set()
