Page({
  data: {
    content: '',
    shredding: false,
    showPile: false,
    strips: [],
    confetti: [],
    pileItems: []
  },

  onLoad() {
    this.generateParts();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  generateParts() {
    // 碎纸条 — 均匀分布在机器底部
    const strips = [];
    for (let i = 0; i < 15; i++) {
      strips.push({
        left: 8 + i * 17,
        delay: Math.floor(Math.random() * 200)
      });
    }

    // 飘落碎纸片
    const confetti = [];
    for (let i = 0; i < 18; i++) {
      confetti.push({
        left: Math.floor(Math.random() * 290),
        delay: 300 + Math.floor(Math.random() * 800),
        rotate: Math.floor(Math.random() * 360)
      });
    }

    // 碎纸堆
    const pileItems = [];
    for (let i = 0; i < 30; i++) {
      pileItems.push({
        left: Math.floor(Math.random() * 320),
        bottom: Math.floor(Math.random() * 50),
        w: 12 + Math.floor(Math.random() * 24),
        h: 10 + Math.floor(Math.random() * 20),
        r: Math.floor(Math.random() * 360)
      });
    }

    this.setData({ strips, confetti, pileItems });
  },

  onInput(e) {
    this.setData({ content: e.detail.value });
  },

  onShred() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '先写下你的焦虑吧', icon: 'none' });
      return;
    }

    this.setData({ shredding: true, showPile: false });
    this.generateParts();

    // 碎纸堆出现
    setTimeout(() => {
      this.setData({ showPile: true });
    }, 1000);

    // 动画完成后重置
    setTimeout(() => {
      this.setData({ content: '', shredding: false });
      wx.showToast({ title: '焦虑已粉碎', icon: 'success' });
    }, 2000);
  },

  onShareAppMessage() {
    return {
      title: '释放你的焦虑，把它粉碎掉',
      path: '/pages/release/index'
    };
  }
});
