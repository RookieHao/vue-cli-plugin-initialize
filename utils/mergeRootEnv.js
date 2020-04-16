const { resolve } = require("path");

const {
  getEnvs,
  parseEnvFile,
  copyFile,
  writeFile,
  unlinkFile,
  isExists
} = require("./file-tool");

module.exports = context => {
  // 读取根目录下的env文件类容,与environments下的文件合并

  let orinalEnv = getEnvs(context); // 根目录下环境变量文件
  let environmentsDir = isExists(resolve(context, "environments"));
  let environments = environmentsDir && getEnvs(environmentsDir); // environments目录下环境变量文件
  if (orinalEnv && environments) {
    mergeOriginalEnvFiles(orinalEnv, environments);
  }
};

function compareEnv(orinalPath, envPath) {
  let { parsed: orinalParsed } = parseEnvFile(orinalPath);
  let { parsed: envParsed } = parseEnvFile(envPath);
  let mergeRet = { ...orinalParsed, ...envParsed };
  let mergeString = Object.entries(mergeRet).reduce((result, [key, value]) => {
    return `${result}${key} = ${value}\n`;
  }, "");
  writeFile(envPath, mergeString, error => {
    if (error) return;
    unlinkFile(orinalPath);
  });
}

function mergeOriginalEnvFiles(orinalEnv, environments) {
  [...orinalEnv.locals, ...orinalEnv.envs].forEach(orinal => {
    let merged = false;
    let orinalPath = resolve(orinalEnv.context, orinal);
    [...environments.locals, ...environments.envs].forEach(env => {
      let envPath = resolve(environments.context, env);
      if (env === orinal) {
        compareEnv(orinalPath, envPath);
        merged = true;
      }
    });
    !merged && copyFile(orinalPath, resolve(environments.context, orinal));
  });
}
