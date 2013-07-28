/*
 * grunt-contrib-tslint
 * https://github.com/palantir/grunt-contrib-tslint
 *
 * Copyright (c) 2013 Ashwin Ramaswamy
 * Licensed under the Apache license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    // Configuration to be run (and then tested).
    tslint: {
      errors: {
        options: {
          configuration: grunt.file.readJSON(".tslintrc")
        },
        files: {
          src: [
            "test/fixtures/correctFile.ts",
            "test/fixtures/errorFile1.ts",
            "test/fixtures/errorFile2.ts"
        ]}
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", ["tslint"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};
