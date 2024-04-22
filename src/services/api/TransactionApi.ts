import { ApiClient } from 'services/ApiService'

export const getListTransaction = (payload?: any) =>
  ApiClient.get('v1/user-transaction', payload)

export const getDetailTransaction = (payload: any) =>
  ApiClient.get(`v1/user-transaction/${payload.id}`)

export const requestConductTransaction = (payload: any) =>
  ApiClient.post('v1/user-transaction', payload)
