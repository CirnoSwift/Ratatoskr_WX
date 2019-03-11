// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    uid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //首先从缓存中获取到当前用户的uid
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        that.setData({ uid: res.data })
      }
    });
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
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/ratatoskr/user/listuser',
      method:'GET',
      data:{},
      success:function(res){
        var list = res.data.userList;
        if(list == null){
          var toastText = "获取数据失败，错误信息为："+res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon:'warn',
            duration:2000
          });
        }else{
          that.setData({list:list})
        }
      }
    })
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

  clockon:function(e){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/ratatoskr/user/clockon',
      method:'GET',
      data:{"uid":this.data.uid},
      success:function(res){
        var result = res.data.success;
        var toastText = "操作成功";
        if(result!=true){
          toastText = "操作失败！"+res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon:'',
          duration:2000
        });
        //成功后重新为list注入数据，刷新页面
        that.setData({
          list:that.data.list
        });
        //注入完数据后调用onshow方法重新加载页面数据
        that.onShow();
      }
    })
  },

  // 请假按钮方法
  leave:function(e){
    wx.navigateTo({
      url: '../addLeave/addLeave',
    })
  }
})