// pages/profile/index.js
Page({
  data: {
    userInfo: null,
    isLogin: false
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const app = getApp();
    this.setData({
      isLogin: app.checkLogin(),
      userInfo: app.globalData.userInfo
    });
  },

  // 处理登录
  handleLogin() {
    if (this.data.isLogin) return;

    const app = getApp();
    
    // 先确保有 openid
    if (!app.globalData.openid) {
      wx.showLoading({ title: '初始化中...' });
      app.autoLogin().then(() => {
        wx.hideLoading();
        this.getUserInfo();
      }).catch(() => {
        wx.hideLoading();
        wx.showToast({ title: '登录失败', icon: 'none' });
      });
    } else {
      this.getUserInfo();
    }
  },

  // 获取用户信息
  getUserInfo() {
    const app = getApp();
    app.getUserProfile().then(userInfo => {
      this.setData({
        userInfo: userInfo,
        isLogin: true
      });
      wx.showToast({ title: '登录成功', icon: 'success' });
    }).catch(err => {
      console.error('获取用户信息失败', err);
    });
  },

  goToFavorites() {
    if (!this.data.isLogin) {
      wx.showModal({
        title: '需要登录',
        content: '查看收藏需要先登录',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.handleLogin();
          }
        }
      });
      return;
    }
    wx.navigateTo({ url: '/pages/favorites/index' });
  },

  goToHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goToBreathStats() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goToMoodChart() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goToSettings() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  onShareAppMessage() {
    return {
      title: '情绪宝藏盒 - 你的情绪观察员',
      path: '/pages/clarity/index'
    };
  }
})