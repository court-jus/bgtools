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
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-i18n/angular-locale_fr-fr.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-utils/ui-utils.js',
      'bower_components/highcharts-ng/dist/highcharts-ng.js',
      'bower_components/highcharts.com/adapters/standalone-framework.src.js',
      'bower_components/highcharts.com/highcharts.src.js',
      'bower_components/highcharts.com/highcharts-more.src.js',
      'bower_components/highcharts.com/themes/grid-light.js',
      'bower_components/highcharts.com/modules/exporting.js',
      'bower_components/highcharts.com/modules/offline-exporting.js',
      'bower_components/tinycolor/dist/tinycolor-min.js',
      'bower_components/momentjs/min/moment-with-locales.js',
      'bower_components/ngstorage/ngStorage.min.js',
      'bower_components/angular-touch/angular-touch.min.js',
      'bower_components/snapjs/snap.min.js',
      'bower_components/fabric/dist/fabric.min.js',
      'bower_components/checklist-model/checklist-model.js',
      'bower_components/raven-js/dist/raven.js',
      'bower_components/angular-raven/angular-raven.js',
      'bower_components/event-source-polyfill/eventsource.min.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/ng-file-upload/angular-file-upload.min.js',
      'bower_components/ng-file-upload/angular-file-upload-shim.min.js',
      'bower_components/FileSaver/FileSaver.js',
      'bower_components/jszip/dist/jszip.js',
      'bower_components/js-xlsx/dist/xlsx.js',
      'bower_components/clys-daterange-picker/clys-daterange-picker.js',
      'bower_components/pdfmake/build/pdfmake.js',
      'bower_components/csv/lib/csv.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/ng-tags-input/ng-tags-input.js',
      'bower_components/angular-bindonce/bindonce.js'
    ],
    css: [
    ],
    assets: [
      'bower_components/angular-ui-grid/ui-grid.woff',
      'bower_components/angular-ui-grid/ui-grid.ttf',
      'bower_components/bootstrap/img/glyphicons-halflings.png',
      'bower_components/bootstrap/img/glyphicons-halflings-white.png',
      'bower_components/font-awesome/fonts/FontAwesome.otf',
      'bower_components/font-awesome/fonts/fontawesome-webfont.eot',
      'bower_components/font-awesome/fonts/fontawesome-webfont.svg',
      'bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
      'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
      'bower_components/font-awesome/css/font-awesome.min.css'
    ],
    assets_noflat: [
      'fonts/glyphicons-halflings-regular.woff',
      'fonts/glyphicons-halflings-regular.woff2',
      'fonts/glyphicons-halflings-regular.ttf',
      'fonts/glyphicons-halflings-regular.eot',
      'fonts/glyphicons-halflings-regular.svg',
      'images/white.png'
    ]
  },
};
