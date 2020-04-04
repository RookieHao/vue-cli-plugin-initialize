module.exports = (api) => {
  
  function clearOriginalEnv() {
    const prefixRE = /^VUE_APP_/;
    Object.keys(process.env).forEach(key => {
      if (prefixRE.test(key)) {
        delete process.env[key]
      }
    });
  }
  
  function loadEnv(mode) {
    clearOriginalEnv();
    api.service.loadEnv(mode);
  }
  
  api.registerCommand('check::env', {
    description: 'build project for "--service" service with production mode',
    usage: 'vue-cli-service check::env [options]',
    options: {
      '--service': '指定生产模式构建项目时使用用的环境变量'
    }
  }, args => {
    loadEnv(args.service);
  });
};
