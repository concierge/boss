// var webpackConfig = require('./webpack.test');

// module.exports = function (config) {
//   var _config = {
//     basePath: '',

//     frameworks: ['jasmine'],

//     files: [
//       {pattern: './karma-test-shim.js', watched: true},
//       // 'src/test.spec.ts',

//       'src/*.spec.ts',
//       'src/**/*.spec.ts',
//     ],

//     preprocessors: {
//       'src/*.spec.ts': ['webpack'],
//       'src/**/*.spec.ts': ['webpack']
//     },

//     webpack: {},

//     webpackMiddleware: {
//       stats: 'errors-only'
//     },

//     webpackServer: {
//       noInfo: true
//     },

//     reporters: ['progress'],
//     port: 9876,
//     colors: true,
//     logLevel: config.LOG_INFO,
//     autoWatch: true,
//     browsers: ['Chrome'],
//     singleRun: true,
//   };
//   config.set(_config);
// };

// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.ts': ['typescript']
    },
     frameworks: ['jasmine'],

    typescriptPreprocessor: {
      // options passed to the typescript compiler
      options: {
        sourceMap: false, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      },
      singleRun: false,
      autoWatch:true,
      files:[
  '../src/*.spec.ts',
       '../src/**/*.spec.ts',
      ],
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    }
  });
};