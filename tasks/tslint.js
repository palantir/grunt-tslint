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
    var Linter = require("tslint");
    var path = require("path");

    grunt.registerMultiTask("tslint", "A linter for TypeScript.", function () {
        var options = this.options({
            formatter: "prose",
            outputFile: null,
            appendToOutput: false
        });

        var configurationPathStr;
        if (typeof options.configuration === "string") {
            configurationPathStr = options.configuration;
            options.configuration = grunt.file.readJSON(options.configuration);
        }

        var done = this.async();
        var failed = 0;

        // Iterate over all specified file groups, async for 'streaming' output on large projects
        grunt.util.async.reduce(this.filesSrc, true, function (success, filepath, callback) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
            } else {
                if (options.configuration.rulesDirectory) {
                    // if configurationPath is null, this will be set to ".", which is the current directory and is fine
                    var configurationPath = Linter.findConfigurationPath(configurationPathStr, filepath);
                    var configurationDir = path.dirname(configurationPath);
                    options.rulesDirectory = Linter.getRulesDirectories(options.configuration.rulesDirectory, configurationDir);
                }

                var contents = grunt.file.read(filepath);
                var linter = new Linter(filepath, contents, options);
                var result = linter.lint();

                if (result.failureCount > 0) {
                    var outputString = "";
                    var outputFile = options.outputFile;
                    var appendToOutput = options.appendToOutput;

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
                            if (outputFile != null) {
                                outputString += line + "\n";
                            } else {
                                grunt.log.error(line);
                            }
                        }
                    });
                    if (outputFile != null) {
                        grunt.file.write(outputFile, outputString);
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
                var okMessage = this.filesSrc.length + " " + grunt.util.pluralize(this.filesSrc.length, "file/files") + " lint free.";
                grunt.log.ok(okMessage);
                done();
            } else {
                var errorMessage = failed + " " + grunt.util.pluralize(failed, "error/errors") + " in " +
                    this.filesSrc.length + " " + grunt.util.pluralize(this.filesSrc.length, "file/files");
                grunt.log.error(errorMessage);
                done(false);
            }
        }.bind(this));
    });
};
