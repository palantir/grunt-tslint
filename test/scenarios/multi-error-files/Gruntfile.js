"use strict";

module.exports = function(grunt) {

    var cwd = process.cwd();
    grunt.file.setBase("../../..");
    grunt.loadTasks(".");
    grunt.file.setBase(cwd);

    grunt.initConfig({

        tslint: {
            stdout: {
                options: {
                    configuration: grunt.file.readJSON("tslint.json"),
                },
                files: {
                    src: ["*.ts"],
                },
            },
            file: {
                options: {
                    configuration: grunt.file.readJSON("tslint.json"),
                    outputFile: "tmp/outputFile",
                },
                files: {
                    src: ["*.ts"],
                },
            }
        },

    });

    grunt.registerTask("default", ["tslint"]);

};
