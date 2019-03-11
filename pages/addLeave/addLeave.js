// pages/addLeave/addLeave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    leaveDesc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //同理，先从缓存获取uid
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        that.setData({
          uid:res.data 
        })
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

  // 提交按钮方法
  descSub:function(e){
    var that = this;
    if(e.detail.value.desc == ""){
      wx.showToast({
        title: '请假说明不能为空！',
        duration:2000
      });
      return;
    }
    that.setData({
      leaveDesc:e.detail.value.desc
    })
    wx.request({
      url: 'http://127.0.0.1/ratatoskr/user/leaveup',
      data:{
        uid:that.data.uid,
        leaveDesc:that.data.leaveDesc
      },
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        var result = res.data.success;
        var toastText = "提交成功！离被踢近了一步";
        if(result != true){
          toastText = "提交失败，网络不稳定";
        }
        wx.showToast({
          title: toastText,
          duration:2000
        });
        wx.redirectTo({
          url: '../list/list',
        })
      }
    })
  }


})