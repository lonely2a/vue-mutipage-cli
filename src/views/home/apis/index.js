import post from '../../../api/post'
import get from '../../../api/get'

export function getTestData () {
  return get('/mockjsdata/14621/api/comments')
}
