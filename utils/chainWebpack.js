module.exports = function (api, options) {
  api.chainWebpack(config => {
    config.plugin("define").tap(args => {
      for (let key in require("./resolveEnv")(options)) {
        args[0]["process.env"][key] = JSON.stringify(processEvns[key]);
      }
      return args;
    });
  });
};
