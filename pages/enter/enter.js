// pages/enter/enter.js
var app = getApp();

const requestTools = require('../../utils/requestTools.js');

let setRoomInf = (roomId, roomPassword) => {
  app.globalData.roomId = roomId;
  app.globalData.roomPassword = roomPassword;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "create",
    createRoomId: '',
    createRoomPassword: '',
    joinRoomId: '',
    joinRoomPassword: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('globalData', app.globalData);
    console.log('enter-onLond-options', options)
    this.setData({
      type: options.type
    })
    console.log("after-load-data", this.data)
  },
  
  /**
   * bind input
   */
  bindKeyInput(e) {
    console.log('input',e)
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  },

  createRoomReq() {
    let that = this;
    console.log('createRoomReq', this.data.createRoomId, this.data.createRoomPassword)

    // wx.request({
    //   url: 'https://rp.nladuo.cn/rp_api/game/create_room', 
    //   data: {
    //     session_key: app.globalData.userSession.session_key,
    //     openid: app.globalData.userSession.openid,
    //     nickname: app.globalData.userInfo.nickName,
    //     avatar_url: app.globalData.userInfo.avatarUrl,
    //     room_id: this.data.createRoomId,
    //     passwd: this.data.createRoomPassword
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   },
    //   fail() {
    //     wx.showToast({
    //       title: '请求错误，请检查网络',
    //       icon: 'none',
    //       duration: 1000
    //     })
    //   }
    // })
    requestTools.requestUnify({
      path: 'rp_api/game/create_room',
      data: {
        room_id: this.data.createRoomId,
        passwd: this.data.createRoomPassword
      },
      success(res) {
        console.log(res.data)
        if (res.data.success === true) {
          setRoomInf(that.data.createRoomId, that.data.createRoomPassword);
          console.log('成功创建逻辑');
          console.log(app.globalData);
          wx.navigateTo({
            url: '../room/room?role=owner'
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })

  },

  joinRoomReq() {  
    console.log('joinRoomReq')
    let that = this;
    requestTools.requestUnify({
      path: 'rp_api/game/enter_room',
      data: {
        room_id: this.data.joinRoomId,
        passwd: this.data.joinRoomPassword
      },
      success(res) {
        console.log(res.data)
        console.log(this)
        if (res.data.success === true) {
          setRoomInf(that.data.joinRoomId, that.data.joinRoomPassword);
          console.log(app.globalData);
          console.log('成功进入逻辑');
          wx.navigateTo({
            url: '../room/room?role=member'
          })

        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })

    // wx.request({
    //   url: 'https://rp.nladuo.cn/rp_api/game/enter_room',
    //   data: {
    //     session_key: app.globalData.userSession.session_key,
    //     openid: app.globalData.userSession.openid,
    //     nickname: app.globalData.userInfo.nickName,
    //     avatar_url: app.globalData.userInfo.avatarUrl,
    //     room_id: this.data.joinRoomId,
    //     passwd: this.data.joinRoomPassword
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     if (res.data.success === true) {
    //       console.log(res.data)
    //     }
    //     else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //   },
    //   fail() {
    //     wx.showToast({
    //       title: '请求错误，请检查网络',
    //       icon: 'none',
    //       duration: 1000
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})