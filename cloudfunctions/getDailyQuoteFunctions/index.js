const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV});
const db = cloud.database();

exports.main = async (event, context) => {
    try {
        // 随机获取一条语录（MVP版本先随机抽取）
        const countResult = await db.collection('Quotes').count();
        const total = countResult.total;
        const batch = Math.floor(Math.random() * total);

        return await db.collection('Quotes').skip(batch).limit(1).get();
    } catch (e) {
        console.error(e)
    }
}