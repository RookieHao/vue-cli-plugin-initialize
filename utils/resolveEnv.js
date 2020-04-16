module.exports = options => {
  let processEvns = {};
  const prefixRE = /^VUE_APP_/;
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || key === "NODE_ENV") {
      processEvns[key] = process.env[key];
    }
  });
  processEvns.BASE_URL = options.publicPath;
};
