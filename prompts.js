module.exports = [
  {
    name: "addEnv",
    message: '设置项目环境,多个环境以(,)分隔。例: "production,development"',
    default: "production,development,test,vf",
    filter(input){return input.split(',').map(s => s.trim()).filter((v,i,arr)=> Boolean(v) && i === arr.indexOf(v)&&!(['production','development','test','vf'].indexOf(v)>=0))}
  }
];