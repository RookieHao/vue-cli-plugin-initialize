const {
  defaultScriptAlias,
  gerneEnvConfig
} = require("../config/command.options");
const [{ filter: inputFilter }] = require("../prompts");
module.exports = (api, options, rootOptions) => {
  let originalScripts = api.generator.originalPkg.scripts;
  let scripts = {
    ...originalScripts,
    ...resolveScripts(options)
  };
  api.extendPackage({ scripts });
};

function resolveScripts(options = {}) {
  if (!options.addEnv || !options.addEnv.length) return {};
  if (typeof options.addEnv === "string") {
    options.addEnv = inputFilter(options.addEnv);
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
