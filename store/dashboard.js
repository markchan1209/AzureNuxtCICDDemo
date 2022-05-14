export const state = () => ({
  storeList: []
})

export const mutations = {
  SET_STORE_LIST(state, list) {
    state.storeList = list.sort((a, b) => Number(a.currencyType) - Number(b.currencyType))
  }
}

export const actions = {
  // 取得交易所幣種存量
  async getExchangeInfo({ commit }) {
    try {
      const queryData = {
        // exchangeId: '', // 目前寫死不傳
        currencyType: 0,
        startDate: '',
        endDate: '',
        pageIndex: 0,
        pageSize: 0,
        sortKey: '',
        order: ''
      }
      const res = await this.$api.dashboard.getExchangeInfo(queryData)
      commit('SET_STORE_LIST', res)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
