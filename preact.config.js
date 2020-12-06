  
export default (config, env, helpers) => {
  config.output.publicPath = "./";
  config.output.filename = "[name].js";

  config.resolve.modules.push(env.src)
  delete config.output.chunkFilename;
  config.module.rules[4].use[1].options.url = false;

  let { plugin } = helpers.getPluginsByName(config, "MiniCssExtractPlugin")[0];
  plugin.options.filename = '[name].css';

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};