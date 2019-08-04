const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
module.exports =
  /* config options here */

  module.exports = withCSS(
    withSass({
      cssModules: false
    })
  );
