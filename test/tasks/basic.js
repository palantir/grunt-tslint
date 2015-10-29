var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
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

describe('grunt-tslint on multiple files', function() {

	var scenario = 'multi-error-files',
		tmpDir = fixture('tmp', scenario),
		tmpOutput;

	beforeEach(function(next) {
		mkdirp(tmpDir, next);
	});

	afterEach(function(next) {
		rimraf(tmpDir, next);
	});

	it('should find errors in multiple invalid .ts files', function(done) {

		execGrunt([
			'--gruntfile ', fixture('Gruntfile.js', scenario),
			'tslint:stdout'
		].join(' '), function(error, stdout, stderr) {
			
			expect(stdout).to.contain('Task "tslint:stdout" failed');
			
			tmpOutput = stdout.split('\n')
			.filter(function(line) {
				var isOutputLine = (line.indexOf('>> ') === 0);
				var isSummaryLine = /[0-9]+ error(s?) in [0-9]+ file(s?)/.test(line);
				return isOutputLine && !isSummaryLine;
			})
			.map(function(line) {
				return line.substr(3);
			})
			.join('\n');

			done();
		});

	});

	it('should write output of multiple invalid .ts files into a single outputFile', function(done) {

		expect(tmpOutput).to.not.be.empty;

		execGrunt([
			'--gruntfile ', fixture('Gruntfile.js', scenario),
			'tslint:file'
		].join(' '), function(error, stdout, stderr) {
			expect(
				fs.readFileSync(path.join(tmpDir, 'outputFile')).toString().trim()
			).to.be.equal(tmpOutput);

			done();
		});

	});
});
