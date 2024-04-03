// jsdoc.config.js

module.exports = {
    source: {
      include: ["src"],
      exclude: ["node_modules"],
    },
    plugins: ["plugins/markdown"],
    templates: {
      cleverLinks: true,
      monospaceLinks: true,
      default: {
        outputSourceFiles: true,
      },
    },
    opts: {
      destination: "./docs",
      recurse: true,
    },
  };
  