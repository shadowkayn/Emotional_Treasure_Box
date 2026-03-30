/**
 * 常量配置
 */

// 日签背景图列表 - Unsplash 精选
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

  // 精选系列
  'https://images.unsplash.com/photo-1530912780732-0d2507ded3e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW1hbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D?w=800&q=80',
  'https://images.unsplash.com/photo-1502790671504-542ad42d5189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWluaW1hbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1521433849537-1d4ead3ddaf9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1659775675138-b550c102bff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbmltYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1625633720107-5b537b6457ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbmltYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',

  // 花卉植物系列
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80', // 粉色花朵
  'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80', // 绿色植物
  'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=800&q=80', // 白色雏菊
  'https://images.unsplash.com/photo-1495231916356-a86217efff12?w=800&q=80', // 粉色玫瑰
  'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80', // 野花草地
];

/**
 * 获取随机背景图
 * @returns {String} 背景图 URL
 */
function getRandomBgImage() {
  return CARD_BG_LIST[Math.floor(Math.random() * CARD_BG_LIST.length)];
}

module.exports = {
  CARD_BG_LIST,
  getRandomBgImage
};
