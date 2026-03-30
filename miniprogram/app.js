// app.js
App({
  onLaunch: function () {
    this.globalData = {
      // env 参数说明：
      // env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会请求到哪个云环境的资源
      // 此处请填入环境 ID, 环境 ID 可在微信开发者工具右上顶部工具栏点击云开发按钮打开获取
      env: "cloud1-7g27vhf9d8bd5dbb",
      fontLoaded: false
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }

    // 加载自定义字体（scopes 包含 native 以支持 Canvas 2D）
    wx.loadFontFace({
      global: true,
      family: 'ZCool',
      source: 'url("https://636c-cloud1-7g27vhf9d8bd5dbb-1415544021.tcb.qcloud.la/ZCOOLXiaoWei-Regular.ttf?sign=f22d2dd0454db96a8f58cc4843fd1d77&t=1774856385")',
      scopes: ['webview', 'native'],
      success: (res) => {
        console.log('✅ 字体加载成功', res);
        this.globalData.fontLoaded = true;
      },
      fail: (err) => {
        console.error('❌ 字体加载失败', err);
        this.globalData.fontLoaded = false;
      }
    });
  },
});
