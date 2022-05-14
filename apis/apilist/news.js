export default axios => ({
  // 取得最新消息列表
  getNews: data =>
    axios({
      url: '/api/News/GetNews',
      method: 'POST',
      data
    }),
  // 取得置頂文章
  getTopNews: () =>
    axios({
      url: '/api/News/GetTopNews',
      method: 'GET'
    }),
  // 取的文章詳細資訊
  getNewsDetail: data =>
    axios({
      url: '/api/News/GetNewsDetail',
      method: 'POST',
      data
    })
})
