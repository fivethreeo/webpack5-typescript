"use strict";

const hostparts = process.env.HOSTNAME.match(/(\w+)-\w+-(\w+)/);
const publichost = `${hostparts[2]}.${hostparts[1]}.codesandbox.io`;

module.exports = {
  // plugins: ["typescript"],
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;

    if (opts.env.target === "web" && opts.env.dev) {
      config.devServer.public = `${publichost}:443`;
      config.devServer.proxy = {
        context: () => true,
        target: "http://localhost:3000"
      };
      config.devServer.index = "";
    }

    return config;
  },
  modifyWebpackOptions({
    env: {
      target, // the target 'node' or 'web'
      dev // is this a development build? true or false
    },
    webpackObject, // the imported webpack node module
    options: {
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths // the modified paths that will be used by Razzle.
  }) {
    webpackOptions.definePluginOptions["CODESANDBOX_HOST"] = JSON.stringify(
      publichost
    );
    /*
    webpackOptions.notNodeExternalResMatch = (request, context) => {
      return /stitches/.test(request);
    };
    webpackOptions.babelRule.include = webpackOptions.babelRule.include.concat([
      /stitches/
    ]);
    */
    return webpackOptions;
  }
};
