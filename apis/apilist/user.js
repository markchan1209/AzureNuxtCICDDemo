export default axios => ({
  // 會員登入
  login: data =>
    axios({
      url: '/api/User/Login',
      method: 'POST',
      data
    }),
  // 會員登出
  logout: () =>
    axios({
      url: '/api/User/Logout',
      method: 'POST'
    }),
  // 補發驗證信
  reSendCheckMail: data =>
    axios({
      url: '/api/User/ReSendCheckMail',
      method: 'POST',
      data
    }),
  // 會員註冊
  register: data =>
    axios({
      url: '/api/User/Register',
      method: 'POST',
      data
    }),
  // 取得使用者資訊
  getUserInfo: () =>
    axios({
      url: '/api/User/GetUsers',
      method: 'GET'
    }),
  // 取得圖形驗證碼
  getCaptchaImage: () =>
    axios({
      url: '/api/User/GetCaptchaImage',
      method: 'GET'
    }),
  // 編輯基本個人資料
  updateUserData: data =>
    axios({
      url: '/api/User/UpdateUserData',
      method: 'POST',
      data
    }),
  // 重置密碼
  resetPassword: data =>
    axios({
      url: '/api/User/ForgetPassword',
      method: 'POST',
      data
    }),
  // 設定新密碼
  setNewPassword: data =>
    axios({
      url: '/api/User/SetNewPassword',
      method: 'POST',
      data
    }),
  // 取得交易所清單-不需登入
  getCoinStoreGroup: () =>
    axios({
      url: '/api/User/GetFDB_CoinStoreGroup',
      method: 'GET'
    }),
  // 綁定交易所資訊
  bindCoinStoreData: data =>
    axios({
      url: '/api/User/BindCoinStoreData',
      method: 'POST',
      data
    }),
  // 取得已綁定交易所清單(需登入)
  getBindCoinStores: () =>
    axios({
      url: '/api/User/GetCoinStores',
      method: 'GET'
    }),
  // 取得出金地址資訊
  getAllWithdrawalAddress: () =>
    axios({
      url: '/api/User/GetAllWithdrawalAddressData',
      method: 'GET'
    }),
  // 更新出金地址資訊-發驗證信
  withdrawalDataUpdate: data =>
    axios({
      url: '/api/User/WithdrawalDataUpdate',
      method: 'POST',
      data
    }),
  // 驗證並且更新出金地址資訊
  validWithdrawalData: data =>
    axios({
      url: '/api/User/ValidWithdrawalData',
      method: 'POST',
      data
    })
})
