module.exports = [
  {
    name: "enable",
    type: "confirm",
    message: "开启多环境以生产模式打包",
    default: false
  },
  {
    when({ enable }) {
      return enable;
    },
    name: "addEnv",
    message: '设置项目环境,多个环境以(,)分隔。例: "production,development"',
    default: "production,development,test,vf",
    filter(input) {
      let defaultInput = ["production", "development", "test", "vf"];
      let filterInput = input
        .split(",")
        .map(s => s.trim())
        .filter(
          (v, i, arr) =>
            Boolean(v) &&
            i === arr.indexOf(v) &&
            !(defaultInput.indexOf(v) >= 0)
        );
      return [...defaultInput, ...filterInput];
    }
  },
  {
    name: "addAxios",
    message: "Use axios for http request?",
    type: "confirm",
    default: false
  }
];
