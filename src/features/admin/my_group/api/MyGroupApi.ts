import { ApiClient } from 'services'

export const requestMyGroup = (key: any) => {
  console.log('key', key)
  return ApiClient.get(`/v1/profile/${key}/referral`)
}
