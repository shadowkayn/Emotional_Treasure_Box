const { checkLogin, formatDate } = require('../../utils/index');

Page({
  data: {
    records: [],
    loading: true,
    isEmpty: false,
    moodInfo: {},
    
    // 情绪选项
    moods: [
      { id: 'happy', name: '开心', emoji: '/images/icons/happy.png', color: '#74ff3d' },
      { id: 'calm', name: '平静', emoji: '/images/icons/calm.png', color: '#A8E6CF' },
      { id: 'anxious', name: '焦虑', emoji: '/images/icons/anxious.png', color: '#272525' },
      { id: 'sad', name: '低落', emoji: '/images/icons/sad.png', color: '#C7CEEA' },
      { id: 'angry', name: '愤怒', emoji: '/images/icons/angry.png', color: '#c81f2c' }
    ],
    
    // 统计数据
    moodStats: {},
  },

  onLoad() {
    this.loadHistory();
  },

  // 加载历史记录
  loadHistory() {
    if (!checkLogin()) {
      wx.showModal({
        title: '需要登录',
        content: '查看历史记录需要先登录',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({ url: '/pages/profile/index' });
          } else {
            wx.navigateBack();
          }
        }
      });
      return;
    }

    this.setData({ loading: true });
    const db = wx.cloud.database();
    
    db.collection('MoodRecords')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()
      .then(res => {
        const records = res.data.map(item => ({
          ...item,
          dateStr: this.formatDateTime(item.createdAt)
        }));
        
        this.setData({
          records,
          loading: false,
          isEmpty: records.length === 0
        });
        
        this.calculateStats(records);
      })
      .catch(err => {
        console.error('加载历史失败', err);
        this.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
  },

  // 计算统计数据
  calculateStats(records) {
    const stats = {};
    records.forEach(record => {
      stats[record.mood] = (stats[record.mood] || 0) + 1;
    });
    
    // 找出最频繁的情绪
    let maxCount = 0;
    let mostFrequent = null;
    Object.keys(stats).forEach(mood => {
      if (stats[mood] > maxCount) {
        maxCount = stats[mood];
        mostFrequent = mood;
      }
    });
    
    this.setData({ 
      moodStats: stats,
      moodInfo: this.getMoodInfo(mostFrequent)
    });
  },

  // 格式化日期时间
  formatDateTime(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${month}月${day}日`;
  },

  // 查看详情
  viewDetail(e) {
    const item = e.currentTarget.dataset.item;
    const moodInfo = this.getMoodInfo(item.mood);
    
    const content = item.note ? item.note : '没有备注';
    
    wx.showModal({
      title: `${moodInfo.emoji} ${moodInfo.name} - ${item.dateStr}`,
      content: content,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 删除记录
  deleteRecord(e) {
    const item = e.currentTarget.dataset.item;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const db = wx.cloud.database();
          db.collection('MoodRecords')
            .doc(item._id)
            .remove()
            .then(() => {
              wx.showToast({ title: '已删除', icon: 'success' });
              this.loadHistory();
            })
            .catch(err => {
              console.error('删除失败', err);
              wx.showToast({ title: '删除失败', icon: 'none' });
            });
        }
      }
    });
  },

  // 获取情绪信息
  getMoodInfo(moodId) {
    return this.data.moods.find(m => m.id === moodId) || {};
  },

  onShareAppMessage() {
    return {
      title: '我在记录情绪，觉察自己',
      path: '/pages/breathe/index'
    };
  }
});
