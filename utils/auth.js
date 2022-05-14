const TokenKey = 'fdb-user-token'
export function getToken() {
  // 處理ssr 沒有 localStorage
  if (typeof localStorage === 'undefined') {
    return ''
  }
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // 處理ssr 沒有 localStorage
  if (typeof localStorage === 'undefined') {
    return
  }
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // 處理ssr 沒有 localStorage
  if (typeof localStorage === 'undefined') {
    return
  }
  return localStorage.removeItem(TokenKey)
}
