
import axios from 'axios';

// 共通のヘッダーを設定したaxiosのインスタンス作成
const gasApi = axios.create({
  //header: { 'content-type': 'application/x-www-form-urlencoded'}
  header: { 'content-type': 'text/plain'}
})
//gasApi.defaults.baseURL = 'https://script.google.com/macros'

// response共通処理
// errorが含まれていたらrejectする
gasApi.interceptors.response.use(res => {
  if (res.data.error) {
    return Promise.reject(res.data.error)
  }
  return Promise.resolve(res)
}, err => {
  return Promise.reject(err)
})

/**
 * APIのURLを設定します
 * @param {String} url
 */
let apiUrl = ''
const setUrl = url => {
  //gasApi.defaults.baseURL = url
  apiUrl = url
}

/**
 * AuthTokenを設定します
 * @param {String} token
*/
let authToken = ''
const setAuthToken = token => {
  authToken = token
}

/**
 * 指定年月のデータを取得します
 * @param {String} yearMonth
 * @return {Promise}
*/
const fetch = yearMonth => {
  return gasApi.post(apiUrl, {
    method: 'GET',
    authToken,
    params: {
      yearMonth
    }
  })
}

/**
 * データを追加します
 * @param {Object} item
 * @return {Promise}
 */
const add = item => {
    return gasApi.post('', {
        method: 'post',
        authToken,
        params: {
            item
        }
    })
}

/**
 * 指定年月&idのデータを削除します
 * @param {String} yearMonth
 * @param {String} id
 * @return {Promise} 
 */
const $delete = (yearMonth, id) => {
    return gasApi.post('', {
        method: 'DELETE',
        authToken,
        params: {
            yearMonth,
            id
        }
    })
}

/**
 * データを更新します
 * @param {String} beforeYM
 * @param {Object} item
 * @return {Promise}
 */
const update = (beforeYM, item) => {
    return gasApi.post('', {
        method: 'PUT',
        authToken,
        params: {
            beforeYM,
            item
        }
    })
}

export default {
    setUrl,
    setAuthToken,
    fetch,
    add,
    delete: $delete,
    update
}