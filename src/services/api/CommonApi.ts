import { ApiClient } from 'services/ApiService'

export const getListMethod = () => ApiClient.get('v1/methob')

export const requestChangeDepositPass = (payload: any) =>
  ApiClient.put('v1/auth/change-tfa-password', payload)
export const getListLevel = () => ApiClient.get('v1/level')
export const getUserAnalytic = () => ApiClient.get('v1/profile/analytic')
