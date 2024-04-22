import { ApiClient } from 'services/ApiService'

export const getUserInfor = () => ApiClient.get(`v1/profile`)
export const requestUpdateBankInfor = (payload: any) =>
  ApiClient.put('v1/profile/bank', payload)

export const requestUpdateOrderAddress = (payload: any) =>
  ApiClient.put('v1/profile/address', payload)
