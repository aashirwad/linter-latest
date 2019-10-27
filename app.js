const purify = require('purify-css');

const content = ['./src/js/*.js', '*.html', '*.jsp'];
const css = ['./src/css/*.css'];

const options = {
  // Will write purified CSS to this file.
  output: './dist/purified.css',
  register: true,
  info: true,
  minify: true,
};

purify(content, css, options);
