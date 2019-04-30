var app = getApp();

const domain = 'https://rp.nladuo.cn/';

let requestUnify = reqObj => {

  // 请求参数加上必带项
  console.log(app.globalData.userSession)
  reqObj.data.session_key = app.globalData.userSession.session_key;
  reqObj.data.openid = app.globalData.userSession.openid;
  reqObj.data.nickname = app.globalData.userInfo.nickName;
  reqObj.data.avatar_url = app.globalData.userInfo.avatarUrl;

  wx.request({
    url: domain + reqObj.path,
    data: reqObj.data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      reqObj.success(res);
    },
    fail() {
      wx.showToast({
        title: '请求错误，请检查网络',
        icon: 'none',
        duration: 1000
      })
    }
  })
}




module.exports = {
  requestUnify: requestUnify
}
