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

/* eslint-disable no-invalid-this, no-use-before-define */
module.exports = function (grunt) {
    var Linter = require("tslint");

    grunt.registerMultiTask("tslint", "A linter for TypeScript.", function () {
        var options = this.options({
            configuration: null,
            formatter: "prose",
            outputFile: null,
            outputReport: null,
            appendToOutput: false,
            force: false,
        });

        var specifiedConfiguration = options.configuration;
        var done = this.async();
        var failed = 0;
        var results = [];

        var force = options.force;
        var outputFile = options.outputFile;
        var appendToOutput = options.appendToOutput;

        // Iterate over all specified file groups, async for 'streaming' output on large projects
        grunt.util.async.reduce(this.filesSrc, true, function (success, filepath, callback) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
            } else {
                var configuration = specifiedConfiguration;
                if (configuration == null || typeof configuration === "string") {
                    configuration = Linter.findConfiguration(configuration, filepath);
                }
                options.configuration = configuration;

                var contents = grunt.file.read(filepath);
                var linter = new Linter(filepath, contents, options);
                var result = linter.lint();

                if (result.failureCount > 0) {
                    var outputString = "";

                    failed += result.failureCount;

                    if (outputFile != null && grunt.file.exists(outputFile)) {
                        if (appendToOutput) {
                            outputString = grunt.file.read(outputFile);
                        } else {
                            grunt.file.delete(outputFile);
                        }
                    }
                    result.output.split("\n").forEach(function (line) {
                        if (line !== "") {
                            results = results.concat(
                                (options.formatter.toLowerCase() === "json") ? JSON.parse(line) : line
                            );
                            if (outputFile != null) {
                                outputString += line + "\n";
                            } else {
                                grunt.log.error(line);
                            }
                        }
                    });
                    if (outputFile != null) {
                        grunt.file.write(outputFile, outputString);
                        appendToOutput = true;
                    }
                    success = false;
                }
            }

            // Using setTimout as process.nextTick() doesn't flush
            setTimeout(function () {
                callback(null, success);
            }, 1);
        }, function (err, success) {
            if (err) {
                done(err);
            } else if (success) {
                var okMessage = this.filesSrc.length + " " +
                    grunt.util.pluralize(this.filesSrc.length, "file/files") + " lint free.";
                grunt.log.ok(okMessage);
                report();
                done();
            } else {
                var errorMessage = failed + " " + grunt.util.pluralize(failed, "error/errors") + " in " +
                    this.filesSrc.length + " " + grunt.util.pluralize(this.filesSrc.length, "file/files");
                grunt.log.error(errorMessage);
                report();
                done(force);
            }
        }.bind(this));

        function report() {
            if (options.outputReport) {
                grunt.config(options.outputReport.split("."), {
                    failed: failed,
                    files: this.filesSrc,
                    results: results,
                });
            }
        }
    });
};
