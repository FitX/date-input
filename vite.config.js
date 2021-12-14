const path = require('path');
const { defineConfig } = require('vite');
const pkg = require('./package.json');

module.exports = defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs', 'umd'],
      entry: path.resolve(__dirname, 'index.mjs'),
      name: pkg.name,
      fileName: (format) => `index.${format}.js`
    },
  }
});
