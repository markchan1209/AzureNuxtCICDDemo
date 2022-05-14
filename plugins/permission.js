import { getToken } from '@/utils/auth' // get token from cookie

export default ({ store, $i18n }) => {
  // 會員可造訪名单
  const memberPermissionList = ['lang-personal', 'lang-dashboard', 'lang-take-cash']

  window.onNuxtReady(() => {
    // nuxt 好的時候不會觸發 beforeEach 要先做一些處理
    const hasToken = getToken()
    if (hasToken && Object.keys(store.state.user.userInfo).length === 0) {
      store.dispatch('user/getUserInfo')
    }

    // 路由守衛
    store.$router.beforeEach(async (to, from, next) => {
      const hasToken = getToken()
      // 沒有登入不能造訪會員權限頁面
      if (!hasToken && memberPermissionList.indexOf(to.name) !== -1) {
        next({ name: 'lang-home', params: { lang: to.params.lang } })
        return
      }
    
      // 判断登入状态
      if (hasToken) {
        // 確認 user info 是否存在
        const hasGetUserInfo = Object.keys(store.state.user.userInfo).length === 0
        if (hasGetUserInfo) {
          try {
            await store.dispatch('user/getUserInfo')
            next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            next({ name: 'Login', params: { lang: to.params.lang } })
          }
          return
        }
      }
    
      next()
    })

    // 儀表板導轉
    const dashboardRoute = store.$router.matcher.getRoutes().find(item => item.name === 'lang-dashboard')
    dashboardRoute.beforeEnter = async (to, from, next) => {
      store.commit('app/SET_G_LOADING', true)
      // 沒有綁定交易所 不要讓她到 dashboard 讓它到 綁定交易所頁面並提示 (在提供綁定交易所提示文案)
      try {
        const stores = await store.dispatch('user/getBindStores')
        // 沒有綁定清單或是清單內沒有驗證完成的交易所
        if (stores.length === 0 || !stores.find(item => item.status === 1)) {
          next({ name: 'lang-personal', params: { lang: from.params.lang } })
          Message({
            type: 'warning',
            duration: 10 * 1000,
            message: $i18n.t('exchange_not_yet_bound')
          })
          store.commit('app/SET_G_LOADING', false)
          return
        }
      } catch (error) {
        console.error(error)
        next({ name: 'lang-personal', params: { lang: from.params.lang } })
        store.commit('app/SET_G_LOADING', false)
        return
      }
      store.commit('app/SET_G_LOADING', false)
      next()
    }
  })
}

