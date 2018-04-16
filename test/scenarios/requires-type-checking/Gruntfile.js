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
                    // load using file name
                    configuration: "tslint.json",
                    project: "tsconfig.json"
                },
                files: {
                    src: ["errorFileWithTypeChecking.ts"]
                }
            }
        }

    });

    grunt.registerTask("default", ["tslint"]);

};