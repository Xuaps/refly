'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35728, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      react: {
        files: ['components/*.jsx'],
        tasks: ['browserify'],
        options: {
          livereload: reloadPort
        }
      }
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        // jUnit: {
        //   report: true,
        //   savePath : "./build/reports/jasmine/",
        //   useDotNotation: true,
        //   consolidate: true
        // }
      },
      all: ['test/']
    },
    clean: {
      release: ['build/release/**/*'],
      tmp: ['build/tmp']
    },
    copy: {
      app: {
        files: [
          { expand: true, src: ['app/**', 'public/**', 'routes/**', 'app.js', 'package.json', '!public/js/**'], dest: 'build/release/'},
          { expand:true, flatten:true, src:['build/tmp/config/*'], dest: 'build/release/config/'}
        ]
      },
      config:{
        files: [
          { expand: true, flatten:true, src: ['build/release/config/production.json'], dest: 'build/tmp/config/', filter: 'isFile'},
        ]
      }
    },
    mkdir: {
      tmp: { options: { create: ['build/tmp', 'build/tmp/config'] } }
    },
    jest: {
        options: {
            config: 'jest.config'
        }
    },
    browserify: {
      options: {
        transform:  [ 'reactify' ]
      },
      app:          {
        src:        'components/*.jsx',
        dest:       'public/bundle.js'
      }
    },
    uglify: {
        bundle: {
          options: {
            report: 'gzip'
          },
          files: {
            'build/release/public/bundle.js': ['build/release/public/bundle.js']
          }
        }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('copy-config-files', ['mkdir:tmp', 'copy:config']);

  grunt.registerTask('default', ['browserify', 'develop', 'watch']);
  grunt.registerTask('test', ['develop', 'jasmine_node']);
  grunt.registerTask('testc', ['jest']);
  grunt.registerTask('release', ['copy-config-files','clean:release', 'copy:app', 'uglify:bundle', 'clean:tmp']);
};
