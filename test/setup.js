// eslint-disable-next-line immutable/no-mutation
process.env.NODE_ENV = 'test';

// Make mocha output clean
require('mocha-clean');

// Use unexpected assertation library
global.expect = require('unexpected'); // eslint-disable-line immutable/no-mutation
