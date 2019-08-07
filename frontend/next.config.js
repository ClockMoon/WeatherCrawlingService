const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer(
  withCSS(
    withSass({
      cssModules: false,
      distDir: ".next",
      webpack(config) {
        const prod = process.env.NODE_ENV === "production";
        const plugins = [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)
        ];
        if (prod) {
          plugins.push(new CompressionPlugin());
        }
        return {
          ...config,
          mode: prod ? "production" : "development",
          devtool: prod ? "hidden-source-map" : "eval",
          module: {
            ...config.module,
            rules: [...config.module.rules]
          },
          plugins
        };
      }
    })
  )
);
