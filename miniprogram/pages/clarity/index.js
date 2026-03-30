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
  'https://images.unsplash.com/photo-1530912780732-0d2507ded3e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D?w=800&q=80', // 紫色渐变
  'https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWluaW1hbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D', // 蓝绿渐变
  'https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWluaW1hbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D?w=800&q=80', // 粉蓝渐变
  'https://images.unsplash.com/photo-1659775675138-b550c102bff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbmltYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D', // 彩色渐变
  'https://images.unsplash.com/photo-1625633720107-5b537b6457ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbmltYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D', // 流体艺术

  // 花卉植物系列
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80', // 粉色花朵
  'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80', // 绿色植物
  'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&q=80', // 白色雏菊
  'https://images.unsplash.com/photo-1495231916356-a86217efff12?w=800&q=80', // 粉色玫瑰
  'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80', // 野花草地
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
    cardFlipped: false,
    // 收藏相关
    isFavorited: false
  },

  onLoad() {
    // 确保字体已加载（包含 native scope 以支持 Canvas）
    if (!getApp().globalData.fontLoaded) {
      wx.loadFontFace({
        global: true,
        family: 'ZCool',
        source: 'url("https://636c-cloud1-7g27vhf9d8bd5dbb-1415544021.tcb.qcloud.la/ZCOOLXiaoWei-Regular.ttf?sign=f22d2dd0454db96a8f58cc4843fd1d77&t=1774856385")',
        scopes: ['webview', 'native'],
        success: () => console.log('页面级字体加载成功'),
        fail: (err) => console.error('页面级字体加载失败', err)
      });
    }
    this.fetchQuote();
    this.initBgMusic();
    this.checkFavoriteStatus();
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
        this.checkFavoriteStatus();
      }
    }).catch(err => {
      console.error('获取语录失败', err);
    });
  },

  // 检查当前语录是否已收藏
  checkFavoriteStatus() {
    const favorites = wx.getStorageSync('favorites') || [];
    const isFavorited = favorites.some(item => 
      item.quote === this.data.quote && item.author === this.data.author
    );
    this.setData({ isFavorited });
  },

  // 切换收藏状态
  toggleFavorite() {
    const favorites = wx.getStorageSync('favorites') || [];
    const currentQuote = {
      quote: this.data.quote,
      author: this.data.author,
      timestamp: Date.now(),
      date: this.formatDate(new Date())
    };

    const index = favorites.findIndex(item => 
      item.quote === currentQuote.quote && item.author === currentQuote.author
    );

    if (index > -1) {
      // 已收藏，取消收藏
      favorites.splice(index, 1);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
      this.setData({ isFavorited: false });
    } else {
      // 未收藏，添加收藏
      favorites.unshift(currentQuote);
      wx.showToast({ title: '收藏成功', icon: 'success' });
      this.setData({ isFavorited: true });
    }

    wx.setStorageSync('favorites', favorites);
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

  // 生成日签分享 - 使用原生 Canvas 2D API
  generateDailyCard() {
    wx.showLoading({ title: '生成中...' });

    const today = this.formatDate(new Date());
    const quote = this.data.quote;
    const author = this.data.author;
    const cardBgImage = CARD_BG_LIST[Math.floor(Math.random() * CARD_BG_LIST.length)];

    const query = wx.createSelectorQuery();
    query.select('#dailyCardCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) {
          wx.hideLoading();
          wx.showToast({ title: '画布初始化失败', icon: 'none' });
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        // 设置画布尺寸
        canvas.width = 450 * dpr;
        canvas.height = 800 * dpr;
        ctx.scale(dpr, dpr);

        // 加载背景图
        const bgImg = canvas.createImage();
        bgImg.onload = () => {
          // 绘制背景图（cover模式）
          this.drawImageCover(ctx, bgImg, 0, 0, 450, 800);
          
          // 绘制半透明遮罩
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(0, 0, 450, 800);

          // 绘制文字
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // 引号和语录
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 28px ZCool, sans-serif';
          const quoteText = `"${quote}"`;
          this.wrapText(ctx, quoteText, 225, 340, 370, 44);

          // 作者
          ctx.font = '20px ZCool, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillText(`—— ${author}`, 225, 520);

          // 日期
          ctx.font = '15px sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fillText(today, 225, 700);

          // 导出图片
          wx.canvasToTempFilePath({
            canvas: canvas,
            success: (res) => {
              wx.hideLoading();
              this.setData({
                cardImagePath: res.tempFilePath,
                showCardModal: true,
                cardFlipped: false
              });
              setTimeout(() => {
                this.setData({ cardFlipped: true });
              }, 300);
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('导出图片失败', err);
              wx.showToast({ title: '生成失败', icon: 'none' });
            }
          });
        };

        bgImg.onerror = (err) => {
          wx.hideLoading();
          console.error('背景图加载失败', err);
          wx.showToast({ title: '图片加载失败', icon: 'none' });
        };

        bgImg.src = cardBgImage;
      });
  },

  // 绘制图片（cover模式，居中裁剪）
  drawImageCover(ctx, img, x, y, w, h) {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let sx, sy, sw, sh;

    if (imgRatio > canvasRatio) {
      sh = img.height;
      sw = sh * canvasRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  },

  // 文字换行绘制
  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let lines = [];

    for (let i = 0; i < chars.length; i++) {
      const testLine = line + chars[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line) {
        lines.push(line);
        line = chars[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((l, idx) => {
      ctx.fillText(l, x, startY + idx * lineHeight);
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
