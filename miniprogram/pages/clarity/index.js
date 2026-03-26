Page({
  data: {
    quote: '世界只是志向和表象，你的痛苦来源于对不可控之物的过度执着。',
    author: '叔本华',
    bgImage: 'https://res.cloudinary.com/kayn-admin-cloud/image/upload/v1774504376/clarity-n-bk_vwvqmq.png',
    musicPlaying: true
  },

  onLoad() {
    // 确保字体已加载
    if (!getApp().globalData.fontLoaded) {
      wx.loadFontFace({
        global: true,
        family: 'ZCool',
        source: 'url("https://636c-cloud1-7g27vhf9d8bd5dbb-1415544021.tcb.qcloud.la/ZCOOLXiaoWei-Regular.ttf?sign=be4f7acf59284a3b5664207d93f7be6b&t=1774507304")',
        success: () => console.log('页面级字体加载成功'),
        fail: (err) => console.error('页面级字体加载失败', err)
      });
    }
    this.fetchQuote();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
  },

  // 获取每日语录
  fetchQuote() {
    wx.cloud.callFunction({
      name: 'getDailyQuoteFunctions'
    }).then(res => {
      if (res.result && res.result.data && res.result.data.length > 0) {
        const item = res.result.data[0];
        this.setData({
          quote: item.content || this.data.quote,
          author: item.author || this.data.author
        });
      }
    }).catch(err => {
      console.error('获取语录失败', err);
    });
  },

  // 切换音乐
  toggleMusic() {
    const playing = !this.data.musicPlaying;
    this.setData({ musicPlaying: playing });
    // TODO: 实现背景音乐播放/暂停
  },

  // 生成日签分享
  generateDailyCard() {
    // TODO: 实现日签生成与分享
    wx.showToast({ title: '日签生成中...', icon: 'loading' });
  },

  onShareAppMessage() {
    return {
      title: this.data.quote,
      path: '/pages/clarity/index'
    };
  }
});
