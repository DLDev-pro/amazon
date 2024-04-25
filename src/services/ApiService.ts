import { create } from 'apisauce'
import Cookie from 'js-cookie'

import { message } from 'antd'
import { SESSION_KEY } from 'common/config'
import queryString from 'query-string'
import { API_STATUS } from 'utils/constants'
import history from 'utils/history'
import Swal from 'sweetalert2'
import R from 'assets'

const URL_DEV = 'https://api.targeet.site/api'

const createAPI = () => {
  const APIInstant = create({
    // baseURL: URL_DEV,
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
  })

  APIInstant.setHeader('token', Cookie.get(SESSION_KEY.SESSION) || '')

  APIInstant.axiosInstance.interceptors.request.use(
    async config => {
      config.headers.token = Cookie.get(SESSION_KEY.SESSION)
      config.headers.Authorization = `Bearer ${Cookie.get(SESSION_KEY.SESSION)}`
      return config
    },
    error => Promise.reject(error)
  )
  APIInstant.axiosInstance.interceptors.response.use(
    response => {
      const data = response.data

      if (
        (data && data.code === API_STATUS.RE_LOGIN) ||
        data.code === API_STATUS.NOT_FOUND
      ) {
        Cookie.set(SESSION_KEY.SESSION, '')
        localStorage.setItem('token', '')
      } else if (data.status && data.status !== 1) {
        message.error(data?.message)
      }
      // else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'Something went wrong!',
      //   })
      // }
      return response
    },
    error => {
      message.error(error.response.data.message)
      if (error.response.data.code == API_STATUS.RE_LOGIN) {
        message.error('Phiên đăng nhập đã hết hạn')
        Cookie.set(SESSION_KEY.SESSION, '')
        history.replace('/login')
      }
    }
  )
  return APIInstant
}
const axiosInstance = createAPI()

/* Support function */
function handleResult(api: any) {
  return api.then((res: { data: { status: number; code: number } }) => {
    // if (!res?.data?.status) {
    //   message.error(`Đã có lỗi xảy ra, vui lòng thử lại`)
    //   return Promise.reject(res?.data)
    // }
    return Promise.resolve(res?.data)
  })
}

function parseUrl(url: string, query: any) {
  return queryString.stringifyUrl({ url: url, query })
}

export const ApiClient = {
  get: (url: string, payload?: any) =>
    handleResult(axiosInstance.get(parseUrl(url, payload))),
  post: (url: string, payload: any) =>
    handleResult(axiosInstance.post(url, payload)),
  put: (url: string, payload?: any) =>
    handleResult(axiosInstance.put(url, payload)),
  path: (url: string, payload: any) =>
    handleResult(axiosInstance.patch(url, payload)),
  delete: (url: string, payload: any) =>
    handleResult(axiosInstance.delete(url, {}, { data: payload })),
}

export default axiosInstance
