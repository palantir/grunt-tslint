/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.initConfig({
        eslint: {
            target: [
                "Gruntfile.js",
                "tasks/*.js",
            ],
        },

        tslint: {
            errors: {
                options: {
                    configuration: "tslint.json",
                    force: true,
                },
                files: {
                    src: [
                        "test/fixtures/correctFile.ts",
                        "test/fixtures/errorFile1.ts",
                        "test/fixtures/errorFile2.ts",
                    ],
                },
            },
        },

        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    quiet: false,
                    log: true,
                },
                src: ["test/tasks/**/*.js"],
            },
        },
    });

    // actually load this plugin's task(s)
    grunt.loadTasks("tasks");

    // by default, lint and run all tests
    grunt.registerTask("default", ["eslint", "test"]);

    // run unit tests
    grunt.registerTask("test", ["mochaTest"]);
};
