const bgAudioManager = wx.getBackgroundAudioManager();

// 音乐列表 - 上传到云存储后把 URL 填这里
const MUSIC_LIST = [
  { title: 'sacred play secret place', url: 'https://636c-cloud1-7g27vhf9d8bd5dbb-1415544021.tcb.qcloud.la/Matryoshka%20-%20Sacred%20Play%20Secret%20Place.mp3?sign=e543edd8876bd4a60b311da26f4fc397&t=1774839236' },
  // { title: '轻音乐2', url: '' },
  // { title: '轻音乐3', url: '' },
  // 可以继续添加更多...
];

Page({
  data: {
    quote: '世界只是志向和表象，你的痛苦来源于对不可控之物的过度执着。',
    author: '叔本华',
    bgImage: 'https://res.cloudinary.com/kayn-admin-cloud/image/upload/v1774504376/clarity-n-bk_vwvqmq.png',
    musicPlaying: true,
    currentMusic: null
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
    this.initBgMusic();
  },

  // 随机选一首音乐
  getRandomMusic() {
    const validList = MUSIC_LIST.filter(m => m.url);
    if (validList.length === 0) return null;
    const idx = Math.floor(Math.random() * validList.length);
    return validList[idx];
  },

  // 初始化背景音乐
  initBgMusic() {
    bgAudioManager.onPlay(() => {
      this.setData({ musicPlaying: true });
    });
    bgAudioManager.onPause(() => {
      this.setData({ musicPlaying: false });
    });
    bgAudioManager.onStop(() => {
      this.setData({ musicPlaying: false });
    });
    bgAudioManager.onEnded(() => {
      // 播放完随机换一首
      this.playRandomMusic();
    });
    bgAudioManager.onError((err) => {
      console.error('音乐播放错误', err);
      this.setData({ musicPlaying: false });
    });

    // 检查当前是否正在播放
    if (bgAudioManager.paused === false) {
      this.setData({ musicPlaying: true });
    }
  },

  // 播放随机音乐
  playRandomMusic() {
    const music = this.getRandomMusic();
    if (!music) {
      wx.showToast({ title: '暂无音乐', icon: 'none' });
      return;
    }
    this.setData({ currentMusic: music });
    bgAudioManager.title = music.title;
    bgAudioManager.epname = '情绪宝藏盒';
    bgAudioManager.singer = '轻音乐';
    bgAudioManager.coverImgUrl = this.data.bgImage;
    bgAudioManager.src = music.url;
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
    if (this.data.musicPlaying) {
      bgAudioManager.pause();
    } else {
      // 如果之前暂停了，继续播放；否则随机播放新的
      if (bgAudioManager.src && bgAudioManager.paused) {
        bgAudioManager.play();
      } else {
        this.playRandomMusic();
      }
    }
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
