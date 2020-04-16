const {
  defaultScriptAlias,
  gerneEnvConfig
} = require("../config/command.options");
const prompts = require("../prompts");

module.exports = (api, options) => {
  let originalScripts = api.generator.originalPkg.scripts;
  api.extendPackage({
    scripts: { ...originalScripts, ...resolveScripts(options) }
  });
};

function resolveScripts(options = {}) {
  if (!options.addEnv || !options.addEnv.length) return {};
  if (typeof options.addEnv === "string") {
    options.addEnv = prompts[1].inputFilter(options.addEnv);
  }
  return options.addEnv.reduce((r, n) => {
    let envConfig = defaultScriptAlias[n] || gerneEnvConfig(n);
    let scripts = {};
    scripts = envConfig.reduce((c, n) => {
      let commandName = n.commandName;
      let script = n.scripts
        .map(
          ({ command, options }) =>
            `vue-cli-service ${command}${parseOptions(options)}`
        )
        .join(" && ");
      return { ...c, [commandName]: script };
    }, scripts);
    return { ...r, ...scripts };
  }, {});
}

function parseOptions(options = {}) {
  let arrOptions = Object.entries(options);
  if (!arrOptions.length) return "";
  return (
    arrOptions
      .map(([key, value]) => ` --${key} ${value}`)
      .join("")
      .trimEnd() || ""
  );
}
