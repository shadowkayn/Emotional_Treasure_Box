const bgAudioManager = wx.getBackgroundAudioManager();

// 音乐列表 - 上传到云存储后把 URL 填这里
const MUSIC_LIST = [
  { title: 'sacred play secret place', url: 'https://636c-cloud1-7g27vhf9d8bd5dbb-1415544021.tcb.qcloud.la/Matryoshka%20-%20Sacred%20Play%20Secret%20Place.mp3?sign=00f44ee227b5ce56389e14f55443855c&t=1774842505' },
];

// 日签背景图列表 - Unsplash 精选（治愈系、自然风光、柔和色调）
const CARD_BG_LIST = [
  // 天空云彩系列
  'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80', // 粉紫色天空
  'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=800&q=80', // 蓝天白云
  'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80', // 日落天空
  'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80', // 柔和云层
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', // 山间云海
  
  // 海洋水面系列
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', // 平静海面
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', // 海滩浅蓝
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80', // 海浪纹理
  'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800&q=80', // 深蓝海洋
  'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&q=80', // 海天一线
  
  // 雾气山峦系列
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', // 雾中山峰
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', // 晨雾山谷
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', // 瀑布山林
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // 雪山云雾
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80', // 山脉剪影
  
  // 森林自然系列
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', // 绿色森林
  'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80', // 阳光树林
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80', // 独立大树
  'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&q=80', // 迷雾森林
  'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800&q=80', // 竹林小径
  
  // 极简抽象系列
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80', // 紫色渐变
  'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80', // 蓝绿渐变
  'https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80', // 粉蓝渐变
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', // 彩色渐变
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80', // 流体艺术
  
  // 花卉植物系列
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80', // 粉色花朵
  'https://images.unsplash.com/photo-1462275646964-a0e3571f4f83?w=800&q=80', // 薰衣草田
  'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&q=80', // 白色雏菊
  'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80', // 绿叶特写
  'https://images.unsplash.com/photo-1518882605630-8b17b9c1d406?w=800&q=80', // 樱花枝头
];

Page({
  data: {
    quote: '世界只是志向和表象，你的痛苦来源于对不可控之物的过度执着。',
    author: '叔本华',
    bgImage: 'https://res.cloudinary.com/kayn-admin-cloud/image/upload/v1774504376/clarity-n-bk_vwvqmq.png',
    musicPlaying: false,
    currentMusic: null,
    // 日签相关
    showCardModal: false,
    cardImagePath: '',
    cardFlipped: false
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
    wx.showLoading({ title: '生成中...' });

    const today = this.formatDate(new Date());
    const quote = this.data.quote;
    const author = this.data.author;
    // 随机选择背景图
    const cardBgImage = CARD_BG_LIST[Math.floor(Math.random() * CARD_BG_LIST.length)];

    // 卡片布局：全幅背景 + 底部渐变遮罩 + 文字
    const wxml = `
<view class="card">
  <image class="bg" src="${cardBgImage}"></image>
  <view class="overlay"></view>
  <view class="content">
    <text class="quote">"${quote}"</text>
    <text class="author">—— ${author}</text>
    <text class="date">${today}</text>
  </view>
</view>`;

    // 样式：9:16 竖版比例，更大更醒目
    const style = {
      card: {
        width: 450,
        height: 800,
        position: 'relative',
      },
      bg: {
        width: 450,
        height: 800,
        position: 'absolute',
        top: 0,
        left: 0,
      },
      overlay: {
        width: 450,
        height: 800,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.25)',
      },
      content: {
        width: 450,
        height: 800,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
      },
      quote: {
        width: 370,
        height: 280,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        lineHeight: 48,
        textAlign: 'center',
      },
      author: {
        width: 370,
        height: 44,
        fontSize: 20,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 36,
        textAlign: 'right',
      },
      date: {
        width: 150,
        height: 32,
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 80,
        textAlign: 'center',
      }
    };

    const widget = this.selectComponent('#dailyCard');
    
    widget.renderToCanvas({ wxml, style })
      .then((res) => {
        console.log('渲染成功', res);
        return widget.canvasToTempFilePath();
      })
      .then(res => {
        wx.hideLoading();
        this.setData({
          cardImagePath: res.tempFilePath,
          showCardModal: true,
          cardFlipped: false
        });
        // 延迟翻牌
        setTimeout(() => {
          this.setData({ cardFlipped: true });
        }, 300);
      })
      .catch(err => {
        wx.hideLoading();
        console.error('生成日签失败', err);
        wx.showToast({ title: '生成失败', icon: 'none' });
      });
  },

  // 格式化日期
  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  },

  // 关闭日签弹窗
  closeCardModal() {
    this.setData({ showCardModal: false, cardFlipped: false });
  },

  // 保存到相册
  saveCardToAlbum() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.cardImagePath,
      success: () => {
        wx.showToast({ title: '已保存到相册', icon: 'success' });
        this.setData({ showCardModal: false });
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '提示',
            content: '需要授权保存图片到相册',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.quote,
      path: '/pages/clarity/index'
    };
  }
});
