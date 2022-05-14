export const state = () => ({
  groupList: []
})

export const mutations = {
  SET_GROUP_LIST(state, list) {
    state.groupList = list
  }
}
export const actions = {
  async getRecGroup({ commit }) {
    try {
      const res = await this.$api.recommender.getRecGroup()
      commit('SET_GROUP_LIST', res.data)
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
