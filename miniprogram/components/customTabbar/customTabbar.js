Component({
    data: {
        selected: 0,
        color: "#AAABB8",
        selectedColor: "#3F72AF",
        backgroundColor: "#fbf7ef",
        list: [
            {
                pagePath: "/miniprogram/pages/clarity/index",
                text: "清醒",
                iconPath: "/images/icons/moon.png",
                selectedIconPath: "/images/icons/moon_active.png"
            },
            {
                pagePath: "/miniprogram/pages/release/index",
                text: "释放",
                iconPath: "/images/icons/file-shred-line.png",
                selectedIconPath: "/images/icons/file-shred-line-active.png"
            },
            {
                pagePath: "/miniprogram/pages/breathe/index",
                text: "呼吸",
                iconPath: "/images/icons/col_seal_tuihui.png",
                selectedIconPath: "/images/icons/col_seal_tuihui_active.png"
            },
            {
                pagePath: "/miniprogram/pages/profile/index",
                text: "我的",
                iconPath: "/images/icons/mine.png",
                selectedIconPath: "/images/icons/mine_active.png"
            }
        ]
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path;

            // 更新选中状态
            this.setData({ selected: data.index });

            // 跳转页面
            wx.switchTab({
                url: url
            });

            // 触发父组件的事件（如果需要）
            this.triggerEvent('tabChange', { index: data.index, path: url });
        }
    }
})
