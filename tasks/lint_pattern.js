/*
 * grunt-lint-pattern
 * https://github.com/chrisdanford/grunt-lint-pattern
 *
 * Copyright (c) 2013 Chris Danford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lint_pattern', 'Find a pattern in files.  Error if any match.', function() {
    var i;
    var rule;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var matchingFiles = [];
    if (options.rules === undefined) {
      grunt.fail.warn('The "rules" option must be specified.');
    } else {
      for (i = 0; i < options.rules.length; i++) {
        rule = options.rules[i];
        if (rule.pattern === undefined) {
          grunt.fail.warn('Rule at index ' + i + ' must specify a "pattern".');
        }
        matchingFiles.push([]);
      }
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath);
        for (i = 0; i < options.rules.length; i++) {
          rule = options.rules[i];
          var matchingFilesForRule = matchingFiles[i];
          if (src.match(rule.pattern)) {
            matchingFilesForRule.push(filepath);
          }
        }
      });
    });

    for (i = 0; i < options.rules.length; i++) {
      rule = options.rules[i];
      var matchingFilesForRule = matchingFiles[i];
      if (matchingFilesForRule.length > 0) {
        var message = rule.message || 'The pattern ' + rule.pattern + 'is not allowed';
        message += '\n' + matchingFilesForRule.join('\n') + '\n';
        grunt.fail.warn(message);
      }
    }
  });
};
