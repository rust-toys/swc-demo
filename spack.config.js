const { config } = require('@swc/core/spack');
const ConsoleStripper = require('./plugin/index');

module.exports = config({
  entry: {
    web: './src/index.js',
  },
  output: {
    path: './bundle/',
  },
  // options: {
  //   plugin: (m) => new ConsoleStripper().visitProgram(m),
  // },
});
