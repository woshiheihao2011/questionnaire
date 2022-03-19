import ServiceHttp from './http'

/*
* 通用接口，包括登录，配置，权限等
* */
class Common extends ServiceHttp {
  login (user) {
    return new Promise((resolve, reject) => {
      this.axios.post(this.map.login, {'telephone': user.telephone, 'password': user.password, 'lg': 'zh'})
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.error)
        })
    })
  }
}
export default new Common()
