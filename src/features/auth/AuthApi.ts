import { ApiClient } from 'services/ApiService'

export const requestLogin = (payload: any) =>
  ApiClient.post('v1/auth/login', payload)
export const requestSignin = (payload: any) =>
  ApiClient.post('v1/auth/register', payload)
export const requestLogout = () => ApiClient.put('/manager/auth/logout')
export const requestChangeAccountPass = (payload: any) =>
  ApiClient.put('v1/auth/change-password', payload)
// export const requestGetUserInfo = () => ApiClient.get('/user/manager/info')
// export const roleAdmin = () => ApiClient.get('/role/admin')
// export const rolePetrolStore = () => ApiClient.get('/role/petrol-store')
