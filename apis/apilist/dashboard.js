export default axios => ({
  // 讀取 dashboard
  getDashboardChart: data =>
    axios({
      url: '/api/DashBoard/GetDashBoard',
      method: 'POST',
      data
    }),
  // 交易所 您的盈利
  getExchangeInfo: data =>
    axios({
      url: '/api/DashBoard/GetStoreInfo',
      method: 'POST',
      data
    }),
  // 您的佣金異動紀錄
  getCommissionTransaction: data =>
    axios({
      url: '/api/DashBoard/GetYourPointChangeLog',
      method: 'POST',
      data
    }),
  // 個人反佣
  getPersonalFeedback: data =>
    axios({
      url: '/api/DashBoard/GetPersonRebatLog',
      method: 'POST',
      data
    }),
  // 推薦人反佣
  getRecommender: data =>
    axios({
      url: '/api/DashBoard/GetReferrerRebatLog',
      method: 'POST',
      data
    }),
  // 出金
  getWithdrawal: data =>
    axios({
      url: '/api/DashBoard/GetWithdrawal',
      method: 'POST',
      data
    }),
  // 出金申請
  withdrawalOrder: data =>
    axios({
      url: '/api/DashBoard/WithdrawalOrder',
      method: 'POST',
      data
    })
})
