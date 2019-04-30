// pages/room/room.js

let app = getApp();

let self = null;

const requestTools = require('../../utils/requestTools.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        role: 'member',
        ready: 0,
        roomId: '',
        roomPassword: '',
        playerList: [],
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        this.setData({
            role: options.role,
            roomId: app.globalData.roomId,
            roomPassword: app.globalData.roomPassword,
            userInfo: app.globalData.userInfo
        })
        console.log(this.data);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.showToast({
            title: '您已成功进入房间',
            icon: 'success',
            duration: 1000
        });

        let pollReqMsgs = {
            path: '/rp_api/game/get_msgs',
            data: {
                room_id: this.data.roomId,
                passwd: this.data.roomPassword
            },
            success(res) {
                if (res.data.success === true) {
                    console.log('what the fuck', res.data);
                }
                else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                }
            }
        }

        let pollReqPlayer = {
            path: 'rp_api/game/get_players',
            data: {
                room_id: this.data.roomId,
                passwd: this.data.roomPassword
            },
            success(res) {
                if (res.data.success === true) {
                    console.log('lunxun', res.data);
                    self.setData({
                        playerList: res.data.data
                    });
                }
                else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                }
            }
        }

        let intervalPlayerID = setInterval(function () {
            requestTools.requestUnify(pollReqPlayer)
        }
            , 2000);

        let intervalMsgsID = setInterval(function () {
            requestTools.requestUnify(pollReqMsgs)
        }
            , 2000);
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

    },

    tapToReady: function () {
        requestTools.requestUnify({

            path: 'rp_api/game/update_player_status',
            data: {
                status: 1
            },
            success(res) {
                console.log(res.data)
                if (res.data.success === true) {
                    console.log('readyyyyyy', res.data);
                    self.setData({
                        ready: 1
                    });
                }
                else {
                }
            }

        })
    },
    tapToStart: function () {
        wx.navigateTo({
            url: '../game/game?result=0'
        })
        // requestTools.requestUnify({
        //     path: 'rp_api/game/start_game',
        //     data: {
        //         room_id: this.data.roomId,
        //         passwd: this.data.roomPassword
        //     },
        //     success(res) {
        //         if (res.data.success === true) {
        //             console.log('开始游戏')
        //         }
        //         else {
        //             wx.showToast({
        //                 title: res.data.msg,
        //                 icon: 'none',
        //                 duration: 1000
        //             })
        //         }
        //     }
        // })
    }
})