/**
 * 工具函数统一导出
 */

const auth = require('./auth');
const date = require('./date');
const canvas = require('./canvas');
const constants = require('./constants');

module.exports = {
  // 认证相关
  ...auth,
  
  // 日期相关
  ...date,
  
  // Canvas 相关
  ...canvas,
  
  // 常量
  ...constants
};
