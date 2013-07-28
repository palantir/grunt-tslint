'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tslint = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  errors1: function(test) {
    test.expect(1);

    var actual = grunt.file.readJSON('tmp/errors1');
    actual.output = JSON.parse(actual.output);
    var expected = grunt.file.readJSON('test/expected/errors1');
    test.equal(JSON.stringify(actual), JSON.stringify(expected), 'failed to catch expected linting errors.');

    test.done();
  },
};
