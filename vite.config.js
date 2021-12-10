const path = require('path');
const { defineConfig } = require('vite');
const pkg = require('./package.json');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: pkg.name,
      fileName: (format) => `index.${format}.js`
    },
  }
});
