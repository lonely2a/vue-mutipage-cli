import querystring from 'querystring'
import axios from 'axios'

export default function post (url, params, { csrf }) {
  return axios.post(url,
    querystring.stringify(params), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'X-CSRF-TOKEN': csrf
      }
    })
}
