export default axios => ({
  // 上傳圖檔轉換 url
  uploadFile: data =>
    axios({
      url: '/api/Common/UploadFile',
      method: 'POST',
      data
    }),
  // 首頁資訊
  getHomePageInfo: () =>
    axios({
      url: '/api/Index/GetIndexPageInfo',
      method: 'GET'
    })
})
