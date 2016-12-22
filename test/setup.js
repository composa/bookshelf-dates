// eslint-disable-next-line immutable/no-mutation
process.env.TZ = 'Europe/Amsterdam';

// Make mocha output clean
require('mocha-clean');

// Use unexpected assertation library
global.expect = require('unexpected'); // eslint-disable-line immutable/no-mutation
