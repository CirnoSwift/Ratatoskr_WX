// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      loginUrl:"http://127.0.0.1/ratatoskr/user/logincheck"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //页面初始化

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

  // 用户登录
  formSub:function(e){
    var that = this;
    //使用e.detail.value获取input中元素的值
    var formData = e.detail.value;
    if(formData.username == "" || formData.password == ""){
      wx.showToast({
        title: '用户名及密码不能为空！',
        icon:'warn',
        duration:2000
      });
      return;
    }
    var url = that.data.loginUrl;
    wx.request({
      url: url,
      data:{
        "username":formData.username,
        "password":formData.password
      },
      method:'GET',
      success:function(res){
        var result = res.data.success;
        var msg = res.data.msg;
        if(result!=true){
          wx.showToast({
            title: msg,
            icon:'warn',
            duration:2000
          });
          return;
        }else{
          wx.showToast({
            title: msg,
            icon:'',
            duration:2000
          });
          //成功登录后将uid插入缓存中
          wx.setStorage({
            key: 'uid',
            data: res.data.uid
          });
          wx.navigateTo({
            url: '../list/list'
          });
        }
      }
    })
  }
})