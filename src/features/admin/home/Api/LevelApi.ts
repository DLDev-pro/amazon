import { ApiClient } from 'services'

export const requestLevelList = () => ApiClient.get('v1/level')
export const requestLevelDetail = (key: string) =>
  ApiClient.get(`v1/level/${key}`)
export const requestLevelCategory = (key: string) =>
  ApiClient.get(`v1/level/${key}/category`)
