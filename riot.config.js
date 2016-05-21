const console = require("better-console");
const sass = require('node-sass');

export default {
  from: 'frontends/page8/tags',
  to: 'frontends/page8/js/app.js',
  // html parser
  template: 'pug',
  // css parser
  style: 'scss',
  parsers: {
    css: {
      scss: (tagName, css, opts, url) => {
        return sass.renderSync({
          data: css,
          outputStyle: 'compressed'
        }).css.toString();         
      },
    }
  }
};
