import { getToken } from '@/utils/auth'

export default ({ store }) => {
  const token = getToken() || ''
  store.commit('user/SET_TOKEN', token)
}