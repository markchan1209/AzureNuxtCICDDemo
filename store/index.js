export const getters = {
  deviceWidth: state => state.app.deviceWidth,
  hasInfo: state => Object.keys(state.user.userInfo).length > 0
}