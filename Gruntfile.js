/*
 * grunt-lint-pattern
 * https://github.com/chrisdanford/grunt-lint-pattern
 *
 * Copyright (c) 2013 Chris Danford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    lint_pattern: {
      matches: {
        options: {
          rules: [
            {
              pattern: /Debug/i,
              message: "Debug isn't allowed.  Remove all references to Debug."
            },
            {
              pattern: /Assert/i,
              message: "Assert isn't allowed.  Remove all references to Assert."
            },
          ],
        },
        files: {
          src: [
            'test/fixtures/testing*'
          ],
        },
      },
      does_not_match: {
        options: {
          rules: [
            {
              pattern: /Turnip/i,
              message: "Turnip isn't allowed.  Use another vegetable."
            },
            {
              pattern: /Beet/i,
              message: "Beet isn't allowed.  Use another vegetable."
            },
          ],
        },
        files: {
          src: [
            'test/fixtures/testing*'
          ],
        },
      },
      no_pattern_option: {
        options: {},
        files: {
          src: [
            'test/fixtures/testing*'
          ],
        },
      },
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['lint_pattern']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
