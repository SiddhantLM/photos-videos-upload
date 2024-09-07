module.exports = function override(config, env) {
  config.module.rules.forEach((rule) => {
    if (rule.use) {
      rule.use.forEach((useEntry) => {
        if (useEntry.loader && useEntry.loader.includes("source-map-loader")) {
          useEntry.options = {
            ...useEntry.options,
            exclude: [
              /node_modules\/@patternfly\/react-core/,
              /node_modules\/@patternfly\/react-icons/,
            ],
          };
        }
      });
    }
  });
  return config;
};
