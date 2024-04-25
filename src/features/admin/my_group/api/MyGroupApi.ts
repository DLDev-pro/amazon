import { ApiClient } from 'services'

export const requestMyGroup = (key: any) => {
  return ApiClient.get(`/v1/profile/${key}/referral`)
}
