Page({
  data: {
    content: '',
    shredding: false,
    showPile: false,
    strips: []
  },

  onLoad() {
    this.generateStrips();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  // 生成碎纸条数据
  generateStrips() {
    const strips = [];
    for (let i = 0; i < 14; i++) {
      strips.push({
        delay: Math.floor(Math.random() * 300),
        left: 10 + i * 20,
        height: 140 + Math.floor(Math.random() * 80)
      });
    }
    this.setData({ strips });
  },

  onInput(e) {
    this.setData({ content: e.detail.value });
  },

  // 点击粉碎
  onShred() {
    if (!this.data.content.trim()) {
      wx.showToast({ title: '先写下你的焦虑吧', icon: 'none' });
      return;
    }

    this.setData({ shredding: true, showPile: false });
    this.generateStrips();

    // 碎纸条动画结束后显示碎纸堆
    setTimeout(() => {
      this.setData({ showPile: true });
    }, 800);

    // 动画完成后重置
    setTimeout(() => {
      this.setData({
        content: '',
        shredding: false
      });
      wx.showToast({ title: '焦虑已粉碎', icon: 'success' });
    }, 1500);
  },

  onShareAppMessage() {
    return {
      title: '释放你的焦虑，把它粉碎掉',
      path: '/pages/release/index'
    };
  }
});
