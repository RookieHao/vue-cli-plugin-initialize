const mergeRootEnv = require("../utils/mergeRootEnv");
const extendScript = require("../utils/extend-scripts");

module.exports = (api, options) => {
  if (options.enable) {
    extendScript(api, options);
    mergeRootEnv(api.generator.context);
  }
};
