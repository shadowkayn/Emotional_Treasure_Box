const { checkLoginWithTip, formatDate } = require('../../utils/index');

Page({
  data: {
    // 今日情绪
    todayMood: null,
    todayNote: '',
    todayRecorded: false,
    
    // 情绪选项
    moods: [
      { id: 'happy', name: '开心', emoji: '😊', color: '#74ff3d' },
      { id: 'calm', name: '平静', emoji: '😌', color: '#A8E6CF' },
      { id: 'anxious', name: '焦虑', emoji: '😰', color: '#272525' },
      { id: 'sad', name: '低落', emoji: '😔', color: '#C7CEEA' },
      { id: 'angry', name: '愤怒', emoji: '😠', color: '#c81f2c' }
    ],
    
    // 统计数据
    totalRecords: 0,
    recentMoods: [], // 最近7天的情绪
    moodStats: {} // 情绪统计
  },

  onLoad() {
    this.checkTodayRecord();
    this.loadStatistics();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.checkTodayRecord();
  },

  // 检查今天是否已记录
  checkTodayRecord() {
    if (!checkLoginWithTip({ content: '情绪记录需要登录后使用' })) {
      return;
    }

    const db = wx.cloud.database();
    const today = formatDate(new Date());
    
    db.collection('MoodRecords')
      .where({
        date: today
      })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          const record = res.data[0];
          this.setData({
            todayRecorded: true,
            todayMood: record.mood,
            todayNote: record.note || ''
          });
        } else {
          this.setData({
            todayRecorded: false,
            todayMood: null,
            todayNote: ''
          });
        }
      })
      .catch(err => {
        console.error('检查今日记录失败', err);
      });
  },

  // 选择情绪
  selectMood(e) {
    if (this.data.todayRecorded) {
      wx.showToast({ title: '今天已记录过了', icon: 'none' });
      return;
    }

    const moodId = e.currentTarget.dataset.id;
    this.setData({ todayMood: moodId });
    
    // 震动反馈
    wx.vibrateShort({ type: 'light' });
  },

  // 输入备注
  onNoteInput(e) {
    this.setData({ todayNote: e.detail.value });
  },

  // 保存记录
  saveMood() {
    if (!this.data.todayMood) {
      wx.showToast({ title: '请选择今天的心情', icon: 'none' });
      return;
    }

    if (!checkLoginWithTip({ content: '保存情绪记录需要登录' })) {
      return;
    }

    wx.showLoading({ title: '保存中...' });

    const db = wx.cloud.database();
    const today = formatDate(new Date());
    
    db.collection('MoodRecords').add({
      data: {
        mood: this.data.todayMood,
        note: this.data.todayNote,
        date: today,
        createdAt: db.serverDate()
      }
    }).then(() => {
      wx.hideLoading();
      wx.vibrateShort({ type: 'medium' });
      
      this.setData({ todayRecorded: true });
      
      wx.showToast({ 
        title: '记录成功', 
        icon: 'success',
        duration: 2000
      });
      
      // 重新加载统计
      this.loadStatistics();
    }).catch(err => {
      wx.hideLoading();
      console.error('保存失败', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    });
  },

  // 加载统计数据
  loadStatistics() {
    if (!checkLoginWithTip({ content: '' })) {
      return;
    }

    const db = wx.cloud.database();
    
    // 加载总记录数
    db.collection('MoodRecords')
      .count()
      .then(res => {
        this.setData({ totalRecords: res.total });
      });

    // 加载最近7天的情绪
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    db.collection('MoodRecords')
      .where({
        createdAt: db.command.gte(sevenDaysAgo)
      })
      .orderBy('createdAt', 'desc')
      .limit(7)
      .get()
      .then(res => {
        // 格式化日期显示
        const formattedData = res.data.map(item => {
          const date = new Date(item.date);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return {
            ...item,
            date: `${month}/${day}`
          };
        });
        this.setData({ recentMoods: formattedData });
        this.calculateMoodStats(res.data);
      })
      .catch(err => {
        console.error('加载统计失败', err);
      });
  },

  // 计算情绪统计
  calculateMoodStats(records) {
    const stats = {};
    let total = 0;
    records.forEach(record => {
      stats[record.mood] = (stats[record.mood] || 0) + 1;
      total++;
    });
    this.setData({ 
      moodStats: stats,
      totalRecords: total
    });
  },

  // 查看历史
  viewHistory() {
    if (!checkLoginWithTip({ content: '查看历史需要登录' })) {
      return;
    }
    wx.navigateTo({ url: '/pages/mood-history/index' });
  },

  // 获取情绪信息
  getMoodInfo(moodId) {
    return this.data.moods.find(m => m.id === moodId) || {};
  },

  onShareAppMessage() {
    return {
      title: '记录情绪，觉察自己',
      path: '/pages/breathe/index'
    };
  }
});
