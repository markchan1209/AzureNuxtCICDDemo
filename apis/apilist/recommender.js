export default axios => ({
  // 取得推薦人群組
  getRecGroup: () =>
    axios({
      url: '/api/User/GetReferrerGroup',
      method: 'GET'
    }),
  // 取得推薦人列表
  getRecList: data =>
    axios({
      url: '/api/User/GetReferrerLog',
      method: 'POST',
      data
    }),
  // 推薦人綁定群組
  insertGroup: data =>
    axios({
      url: '/api/User/BindReferrerGroup',
      method: 'POST',
      data
    }),
  // 編輯推薦人組別
  editGroup: data =>
    axios({
      url: '/api/User/SetReferrerGroup',
      method: 'POST',
      data
    })
})
