/*
 * grunt-find-pattern
 * https://github.com/chrisdanford/grunt-find-pattern
 *
 * Copyright (c) 2013 Chris Danford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('find_pattern', 'Find a pattern in files.  Error on a match.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

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
        if (!options.pattern) {
          grunt.warn('The "pattern" option must be specified.');
        }
        if (src.match(options.pattern)) {
          grunt.warn('File "' + filepath + '" matches the pattern.');
        }
      });
    });
  });
};
