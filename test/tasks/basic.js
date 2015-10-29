var expect = require('chai').expect;
var path = require('path');
var ChildProcess = require('cover-child-process').ChildProcess;
var Blanket = require('cover-child-process').Blanket;
var childProcess = new ChildProcess(new Blanket());

var gruntExec = 'node ' + path.resolve('node_modules/grunt-cli/bin/grunt --no-color');

var execGrunt = function(parameters, callback) {
  parameters = parameters || [];
  childProcess.exec([gruntExec].concat(parameters).join(' '), {
  	cwd: path.resolve(__dirname)
  }, callback);
};

var fixture = function(file, scenario) {
	var dir = path.join(__dirname, '../../test', (scenario ? 'scenarios/' + scenario : 'fixtures'));
	return path.join(dir, file);
};

describe('grunt-tslint on a single file', function() {
	it('should find errors in single invalid .ts file', function(done) {
		execGrunt('--gruntfile ' + fixture('Gruntfile.js', 'single-error-file'), function(error, stdout, stderr) {
			expect(stdout).to.match(/1 error in 1 file/);
			done();
		});
	});

	it('should not find errors in a single valid .ts file', function(done) {
		execGrunt('--gruntfile ' + fixture('Gruntfile.js', 'single-valid-file'), function(error, stdout, stderr) {
			expect(stdout).to.match(/1 file lint free/);
			done();
		});
	});
});
