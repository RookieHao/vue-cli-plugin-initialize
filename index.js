const mergeRootEnv = require("./utils/mergeRootEnv");
const chainWebpack = require("./utils/chainWebpack");
const loadEnv = require("./utils/loadEnv");
module.exports = (api, options) => {
  const context = api.getCwd();
  // 1. 合并环境变量文件
  mergeRootEnv(context);

  // 2. 确定mode
  let mode = require("./utils/resolveMode")(api.service.mode);

  // 3. 读取环境变量
  loadEnv(context, undefined); // 公共
  loadEnv(context, mode); // 环境变量

  // 4. 写入define
  chainWebpack(api, options);
};
