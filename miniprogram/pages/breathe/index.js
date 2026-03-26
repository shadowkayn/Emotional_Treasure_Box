Page({
  data: {
    breathing: false,
    phase: 'inhale',       // inhale | exhale
    durations: [1, 3, 5],
    durationIndex: 1,      // 默认3分钟
  },

  _timer: null,
  _phaseTimer: null,
  _elapsed: 0,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  onHide() {
    this.stopBreathing();
  },

  onUnload() {
    this.stopBreathing();
  },

  selectDuration(e) {
    if (this.data.breathing) return;
    this.setData({ durationIndex: e.currentTarget.dataset.index });
  },

  toggleBreathing() {
    if (this.data.breathing) {
      this.stopBreathing();
    } else {
      this.startBreathing();
    }
  },

  startBreathing() {
    const totalSeconds = this.data.durations[this.data.durationIndex] * 60;
    this._elapsed = 0;

    this.setData({ breathing: true, phase: 'inhale' });

    // 呼吸节奏：4秒吸气 + 4秒呼气 = 8秒一个周期
    this._phaseTimer = setInterval(() => {
      this.setData({
        phase: this.data.phase === 'inhale' ? 'exhale' : 'inhale'
      });
    }, 4000);

    // 总计时
    this._timer = setInterval(() => {
      this._elapsed++;
      if (this._elapsed >= totalSeconds) {
        this.stopBreathing();
        wx.showToast({ title: '呼吸练习完成', icon: 'success' });
      }
    }, 1000);
  },

  stopBreathing() {
    clearInterval(this._timer);
    clearInterval(this._phaseTimer);
    this._timer = null;
    this._phaseTimer = null;
    this._elapsed = 0;
    this.setData({ breathing: false, phase: 'inhale' });
  },

  onShareAppMessage() {
    return {
      title: '和我一起做极简呼吸练习吧',
      path: '/pages/breathe/index'
    };
  }
});
