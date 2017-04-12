// Error.stackTraceLimit = Infinity;

// // require('core-js/es6');
// // require('core-js/es7/reflect');

// require('../node_modules/zone.js/dist/zone');
// require('../node_modules/zone.js/dist/long-stack-trace-zone');
// require('../node_modules/zone.js/dist/proxy');
// require('../node_modules/zone.js/dist/sync-test');
// require('../node_modules/zone.js/dist/jasmine-patch');
// require('../node_modules/zone.js/dist/async-test');
// require('../node_modules/zone.js/dist/fake-async-test');

// var appContext = require.context('../src', true, /\.spec\.ts/);

// appContext.keys().forEach(appContext);

// var testing = require('@angular/core/testing');
// var browser = require('@angular/platform-browser-dynamic/testing');

// testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('reflect-metadata');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());