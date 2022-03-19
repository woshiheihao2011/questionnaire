import map from 'server/route/map'
import axios from '@/util/http'

class ServerHttp {
  constructor () {
    this.map = map
    this.axios = axios
  }

  /**
   * 替换路由中的 {0}/{1}
   * */
  urlFormat (url, ...arg) {
    let argLength = arg.length
    for (var i = 0; i < argLength; i++) {
      url = url.replace('{' + i + '}', arg[i])
    }
    return url
  }
}

export default ServerHttp
