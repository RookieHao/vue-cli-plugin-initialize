module.exports = apiMode => {
  let mode = process.env.NODE_ENV || apiMode;
  if (
    process.env.npm_config_service &&
    process.env.npm_config_service !== "true"
  ) {
    mode = process.env.npm_config_service;
  } else {
    const { program } = require("commander");
    program.option("-S --service <String>", "serviceMode:环境变量");
    program.parse(process.argv);
    mode = program.service || mode;
  }
  return mode;
};
