import apis from '@/apis/index'
export default (ctx, inject) => {
  const apiObject = {}
  for (let i in apis) {
    apiObject[i] = apis[i](ctx.$axios)
  }

  // 注入到服務端 vue 實例及, vuex 實例
  inject('api', apiObject)
}