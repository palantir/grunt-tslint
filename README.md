# grunt-tslint [![NPM version](https://badge.fury.io/js/grunt-tslint.svg)](https://www.npmjs.com/package/grunt-tslint) [![Downloads](http://img.shields.io/npm/dm/grunt-tslint.svg)](https://npmjs.org/package/grunt-tslint)

> A grunt plugin for [tslint](https://github.com/palantir/tslint).

## Getting Started

This plugin requires [Grunt](http://gruntjs.com/) `~0.4.1` and [tslint](https://github.com/palantir/tslint) `~4.0.0`

```
npm install grunt-tslint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks("grunt-tslint");
```

## The "tslint" task

### Overview

In your project's `Gruntfile.js`, add a section named `tslint` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({
    tslint: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        },
    },
})
```

### Options

* `options.configuration: Object | string` - A TSLint configuration; can either be a JSON configuration object or a path to a tslint.json config file.
* `options.project: string` - `tsconfig.json` file location. If provided type checking will be enabled. 
* `options.force: boolean` - If `true`, the task will suceed even if lint failures are found. Defaults to `false`.
* `options.fix: boolean` - If `true`, fixes linting errors for select rules. This may overwrite linted files. Defaults to `false`.

### Usage Example

```js
grunt.initConfig({
    tslint: {
        options: {
            // can be a configuration object or a filepath to tslint.json
            configuration: "tslint.json",
            // If set to true, tslint errors will be reported, but not fail the task
            // If set to false, tslint errors will be reported, and the task will fail
            force: false,
            fix: false
        },
        files: {
            src: [
                "src/file1.ts",
                "src/file2.ts"
            ]
        }
    }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
