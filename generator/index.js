const mergeRootEnv = require("../utils/mergeRootEnv");
const extendScript = require("../utils/extend-scripts");

module.exports = (api, options) => {
  if (options.enable) {
    extendScript(api, options);
    mergeRootEnv(api.generator.context);
  }
  if (options.addAxios) {
    api.extendPackage({
      dependencies: {
        axios: "^0.19.2"
      }
    });
    api.render({
      "src/utils/request.js": "./template/utils/request.js"
    });
  }
  if (options.addApiPlugin) {
    api.extendPackage({
      devDependencies: {
        "vue-project-plugin": "^1.0.0"
      }
    });
    api.render({
      "src/plugins/vue-plugin.js": "./template/plugins/vue-plugin.js",
      "src/api/demo-api.js": "./template/api/demo-api.js"
    });
    api.onCreateComplete(() => {
      const fs = require("fs");
      const mainPath = api.resolve("./src/main.js");
      let apiPluginLines = `\nimport { ApiServicePlugin } from "@/plugins/vue-plugin";\n\nVue.use(ApiServicePlugin);`;
      let contentMain = fs.readFileSync(mainPath, { encoding: "utf-8" });
      const lines = contentMain.split(/\r?\n/g).reverse();
      const lastImportIndex = lines.findIndex(line => line.match(/^import/));
      lines[lastImportIndex] += apiPluginLines;
      contentMain = lines.reverse().join("\n");
      fs.writeFileSync(mainPath, contentMain, { encoding: "utf-8" });
    });
  }
};
