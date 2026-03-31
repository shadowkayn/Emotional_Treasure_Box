// 云函数：内容安全检测
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { content } = event;
  
  // 检查内容是否为空
  if (!content || content.trim() === '') {
    return {
      success: true,
      safe: true,
      message: '内容为空'
    };
  }

  try {
    // 调用微信内容安全检测API
    const result = await cloud.openapi.security.msgSecCheck({
      content: content,
      version: 2,
      scene: 2, // 场景值：2-资料；3-评论；4-论坛
      openid: cloud.getWXContext().OPENID
    });

    console.log('内容安全检测结果:', result);

    // 检测结果判断
    if (result.errCode === 0) {
      // result.result.suggest: 'pass'-通过, 'review'-需人工审核, 'risky'-违规
      const suggest = result.result?.suggest || 'pass';
      
      if (suggest === 'pass') {
        return {
          success: true,
          safe: true,
          message: '内容安全'
        };
      } else if (suggest === 'review') {
        return {
          success: true,
          safe: false,
          message: '内容需要人工审核，暂时无法提交',
          suggest: 'review'
        };
      } else {
        return {
          success: true,
          safe: false,
          message: '内容包含敏感信息，请修改后重试',
          suggest: 'risky'
        };
      }
    } else {
      // 检测失败，为了安全起见，返回不通过
      return {
        success: false,
        safe: false,
        message: '内容检测失败，请稍后重试',
        error: result.errMsg
      };
    }
  } catch (err) {
    console.error('内容安全检测异常:', err);
    
    // 如果是接口调用失败，返回错误信息
    return {
      success: false,
      safe: false,
      message: '内容检测服务异常，请稍后重试',
      error: err.message || err.errMsg
    };
  }
};
