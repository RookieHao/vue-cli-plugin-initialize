module.exports = [
  {
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
  }
];
