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

module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        tslint: {
            errors: {
                options: {
                    configuration: "tslint.json"
                },
                files: {
                    src: [
                        "test/fixtures/correctFile.ts",
                        "test/fixtures/errorFile1.ts",
                        "test/fixtures/errorFile2.ts"
                    ]
                }
            }
        }
    });

    // actually load this plugin's task(s)
    grunt.loadTasks("tasks");

    grunt.registerTask("test", ["tslint"]);

    // by default, lint and run all tests
    grunt.registerTask("default", ["jshint", "test"]);
};
