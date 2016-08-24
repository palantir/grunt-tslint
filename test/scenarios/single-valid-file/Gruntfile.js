"use strict";

module.exports = function(grunt) {

	var cwd = process.cwd();
	grunt.file.setBase("../../..");
	grunt.loadTasks(".");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.file.setBase(cwd);

	grunt.initConfig({

		tslint: {
			default: {
				options: {
					configuration: grunt.file.readJSON("tslint.json")
				},
				files: {
					src: ["validFile.ts"]
				}
			}
		}

	});

	grunt.registerTask("default", ["tslint"]);

};
