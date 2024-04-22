import { ApiClient } from 'services'

export const requestAddOrder = (key: string, productId: any) =>
  ApiClient.put(`v1/user-order/${key}/process/${productId}`)

export const requestAnOrder = (key: string) =>
  ApiClient.put(`v2/user-order/${key}/process`)

export const sendOrder = (id: string) =>
  ApiClient.put(`v2/user-order/${id}/purchase`)
