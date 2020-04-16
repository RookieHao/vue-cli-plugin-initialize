const fs = require("fs");
const path = require("path");
const { config } = require("dotenv");
// const dotenvExpand = require("dotenv-expand");
let getContextFiles = contextFiles(); // 根目录文件列表

function contextFiles() {
  let contextRecords = {};
  return function (context) {
    if (contextRecords[context]) return contextRecords[context];
    let result = fs.readdirSync(path.resolve(context));
    contextRecords[context] = result.filter(file =>
      fs.statSync(path.resolve(context, file)).isFile()
    );
    return contextRecords[context];
  };
}

function getEnvs() {
  let contextEnvs = {};
  return function (context) {
    if (contextEnvs[context]) return contextEnvs[context];
    let contextFiles = getContextFiles(context);
    let regLocal = /^(\.env)(\.[a-zA-z]+)?(\.local)$/;
    let regEnv = /^(\.env)(\.[a-zA-z]+)?$/;
    let locals = contextFiles.filter(file => regLocal.test(file));
    let envs = contextFiles.filter(
      file => regEnv.test(file) && !locals.includes(file)
    );
    contextEnvs[context] = { locals, envs, context };
    return contextEnvs[context];
  };
}

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

function appendFile(path, data, callback = () => {}) {
  fs.appendFile(path, "\n" + data, { encoding: "utf-8" }, callback);
}

function copyFile(src, dest, deleteOrignal = true) {
  fs.copyFileSync(src, dest);
  if (deleteOrignal) {
    unlinkFile(src);
  }
}

function unlinkFile(path) {
  fs.unlinkSync(path);
}

function writeFile(path, data, cb = () => {}) {
  fs.writeFile(path, data, { encoding: "utf-8" }, cb);
}

function isExists(path, create = true) {
  try {
    let stat = fs.statSync(path);
    if (stat && stat.isDirectory()) return path;
    throw new Error(path + ":必须是一个目录");
  } catch (error) {
    if (create) {
      fs.mkdirSync(path);
    }
    return path;
  }
}

module.exports.parseEnvFile = function parseEnvFile(path) {
  return config({ path });
};

module.exports.readFile = readFile;
module.exports.appendFile = appendFile;
module.exports.copyFile = copyFile;
module.exports.unlinkFile = unlinkFile;
module.exports.writeFile = writeFile;
module.exports.isExists = isExists;
module.exports.getContextFiles = getContextFiles;
module.exports.getEnvs = getEnvs();
