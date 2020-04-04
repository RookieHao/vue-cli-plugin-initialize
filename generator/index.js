const defaultEnv = {addEnv: ['production', 'development', 'test', 'vf']};

module.exports = (api, options, rootOptions) => {
  let originalScripts = api.generator.originalPkg.scripts;
  let scripts = {...originalScripts, ...resolveEnvScripts(defaultEnv), ...resolveEnvScripts(options)};
  api.extendPackage({scripts});
};

function resolveEnvScripts(options = {}) {
  if (!options.addEnv || !options.addEnv.length) return {};
  return options.addEnv.reduce((r, n) => {
    let scriptName = charEnvKey(n);
    let command = charEnvValue(n);
    let script = `vue-cli-service ${command}`;
    if (scriptName !== 'build') {
      script += ' && npm run build';
    }
    return {...r, [scriptName]: script}
  }, {})
}

function charEnvKey(env) {
  return serialize(env, 'command');
}

function charEnvValue(env) {
  return serialize(env, 'script');
}

function serialize(env, type) {
  if (type === 'command') {
    const alias = {
      development: 'dev',
      production: ''
    };
    let afterFix = alias[env] === undefined ? env : alias[env];
    return afterFix.trim() ? 'build:' + afterFix.trim() : 'build';
  } else {
    return env === 'production' ? 'build' : 'check::env --service ' + env;
  }
}
