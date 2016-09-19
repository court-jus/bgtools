/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  theme_name: 'pnpdeliver',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/**/*/*.e2e.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    // e2e: [ 'src/**/*.e2e.js' ],
    // scenario: [ 'src/**/*.scenario.js' ],
    
    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html', 'src/bootstrap_ng.html'],
    less_dir: 'src/less',
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'bower_components/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference bower_components code (`bower_components/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. bower_components-related) files are handled
   * appropriately in `bower_components_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'bower_components/file-saver/FileSaver.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-gettext/dist/angular-gettext.min.js',
      'bower_components/lodash/lodash.js'
    ],
    css: [
    ],
    assets: [
      'bower_components/angular-ui-grid/ui-grid.woff',
      'bower_components/angular-ui-grid/ui-grid.ttf',
      'bower_components/bootstrap/img/glyphicons-halflings.png',
      'bower_components/bootstrap/img/glyphicons-halflings-white.png',
      'bower_components/font-awesome/css/font-awesome.min.css'
    ],
    assets_noflat: [
      'fonts/FontAwesome.otf',
      'fonts/fontawesome-webfont.eot',
      'fonts/fontawesome-webfont.svg',
      'fonts/fontawesome-webfont.ttf',
      'fonts/fontawesome-webfont.woff',
      'fonts/fontawesome-webfont.woff2',
      'fonts/glyphicons-halflings-regular.woff',
      'fonts/glyphicons-halflings-regular.woff2',
      'fonts/glyphicons-halflings-regular.ttf',
      'fonts/glyphicons-halflings-regular.eot',
      'fonts/glyphicons-halflings-regular.svg',
      'images/transparent.png',
      'images/white.png'
    ]
  },
};
