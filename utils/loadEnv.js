module.exports = function loadEnv(context, mode) {
  const { resolve } = require("path");
  const dotenv = require("dotenv");
  const dotenvExpand = require("dotenv-expand");
  const basePath = resolve(
    context,
    "environments",
    `.env${mode ? `.${mode}` : ``}`
  );
  const localPath = `${basePath}.local`;

  const load = envPath => {
    try {
      const env = dotenv.config({ path: envPath, debug: true });
      dotenvExpand(env);
    } catch (err) {
      if (err.toString().indexOf("ENOENT") < 0) {
        console.error(err);
      }
    }
  };
  load(basePath);
  load(localPath);
};
