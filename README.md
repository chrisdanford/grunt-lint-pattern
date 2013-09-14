# grunt-find-pattern

> Find a pattern in files.  Error if any match.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-find-pattern --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-find-pattern');
```

## The "find_pattern" task

### Overview
In your project's Gruntfile, add a section named `find_pattern` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  find_pattern: {
    your_target: {
      options: {
        rules: [
          {
            pattern: /console\./;
            message: 'Calling "console." is not allowed.'
          },
        ],
      },
      files: {
        '**.js',
      },
    },
    your_target: {
      options: {
        rules: [
          {
            pattern: /moz-border-radius/;
            message: 'Don't use vendor prefixes for the border-radius property.'
          },
          {
            pattern: /!important/;
            message: 'Do not use "!important".'
          },
        ],
      },
      files: {
        '**.css',
      },
    },
  },
})
```

### Options

#### options.rules
Type: `Array`
Required

An array of "rules" that will be used to test files.  Rules have the form:

##### pattern
Type: `RegExp`
Required

A RegExp that will be used to test files.

##### pattern
Type: `string`
Optional

A message that will print when pattern is found.

### Usage Examples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1 Initial release
