import { ApiClient } from 'services'

export const requestHistory = (payload: any) =>
  ApiClient.get('/v1/user-order', payload)

export const purchaseOrder = (id: any) =>
  ApiClient.put(`/v1/user-order/${id}/purchase`)
