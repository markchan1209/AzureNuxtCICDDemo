import { setToken, removeToken } from '@/utils/auth'

export  const state = () => ({
  token: '',
  userInfo: {},
  bindStores: []
})

export const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  SET_BIND_STORES(state, stores) {
    state.bindStores = stores
  }
}

export const actions = {
  // user login
  async login({ commit }, loginData) {
    try {
      const res = await this.$api.user.login(loginData)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // remove token
  async resetToken({ commit }) {
    try {
      commit('REMOVE_TOKEN')
      commit('SET_USER_INFO', {})
      return 'done'
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // get user info
  async getUserInfo({ commit }) {
    try {
      const res = await this.$api.user.getUserInfo()
      commit('SET_USER_INFO', res)
      return 'done'
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // user logout
  async logout({ dispatch }) {
    try {
      await this.$api.user.logout()
      dispatch('resetToken')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 取得已綁定交易所清單(需登入)
  async getBindStores({ commit }) {
    try {
      const res = await this.$api.user.getBindCoinStores()
      commit('SET_BIND_STORES', res.data)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
