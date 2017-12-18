import axios from 'axios'
/**
 * 请求的参数可以拼在url里，也可以作为params传入get方法
 * url 请求的路径可以是
 *     /split/bid/deal
 *     也可以带参数/split/bid/deal/?name=zhangsan
 * params
 */
export default function get (url, params) {
  params.timeStamp = Date.now()
  return axios.get(url, params)
}
