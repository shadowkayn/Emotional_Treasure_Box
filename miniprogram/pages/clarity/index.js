Page({
  data: {
    quote: '世界只是志向和表象，你的痛苦来源于对不可控之物的过度执着。',
    author: '叔本华',
    bgImage: '/images/clarity-n-bk.png',
    musicPlaying: true
  },

  onLoad() {
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
