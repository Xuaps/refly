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
          'app/*.js',
          'routes/*.js',
          'views/*.jade'
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
        tasks: ['cssmin'],
        options: {
          livereload: reloadPort
        }
      },
      react: {
        files: ['react/**/*.jsx', 'react/**/*.js'],
        tasks: ['browserify:dev'],
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
          { expand: true, src: ['app/**', 'public/**', 'routes/**', 'app.js', 'views/**', 'package.json', '!public/css/styles.css', '!public/css/offer.css', '!public/css/sidebar-menu.css', '!public/css/sidebar.css', '!public/css/welcome.css', '!public/css/settings.css', '!public/css/devdocs.css', '!public/css/ladda-themeless.min.css', '!public/css/errors.css', '!public/css/home.css'], dest: 'build/release/'},
          { expand:true, flatten:true, src:['build/tmp/config/*'], dest: 'build/release/config/'},
          { expand:true, flatten:true, src:['build/tmp/newrelic.js'], dest: 'build/release/'}
        ]
      },
      config:{
        files: [
          { expand: true, flatten:true, src: ['build/release/config/production.json', 'build/release/config/stage.json'], dest: 'build/tmp/config/', filter: 'isFile'},
          { expand: true, flatten:true, src: ['build/release/newrelic.js'], dest: 'build/tmp/', filter: 'isFile'},
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
      dev: {
          options: {
            watch: true,
            transform:  [ 'babelify'],
            browserifyOptions: {
                 debug: true
              }
          },
          files: { 'public/js/bundle.js': ['react/components/*.jsx'] }
      },
      dist: {
          options: {
            watch: true,
            plugin: [ ['minifyify', {map: 'bundle.map.json', output: 'public/js/bundle.map.json'}]],
            transform:  [ 'babelify'],
            browserifyOptions: {
                 debug: true
              }
          },
          files: { 'public/js/bundle.js': ['react/components/*.jsx'] }
        }
    },
    cssmin:{
        target: {
            files: {
                'public/css/refly.css': ['public/css/styles.css', 'public/css/sidebar-menu.css', 'public/css/sidebar.css', 'public/css/welcome.css', 'public/css/settings.css','public/css/ladda-themeless.min.css', 'public/css/errors.css', 'public/css/offer.css', 'public/css/home.css'],
                'public/css/docs.css': ['public/css/devdocs.css']
                }
         }
    },
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

  grunt.registerTask('default', ['cssmin', 'browserify:dev', 'develop', 'watch']);
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('testc', ['jest']);
  grunt.registerTask('release', ['cssmin','browserify:dist','copy-config-files','clean:release', 'copy:app', 'clean:tmp']);
};
