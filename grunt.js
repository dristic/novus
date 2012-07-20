/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! Novus - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://danristic.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Dan Ristic; Licensed MIT */'
    },
    lint: {
      files: ['lib/**/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'lib/**/*.js'],
        dest: 'dist/novus.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/novus.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        console: true
      }
    },
    uglify: {},
    server: {
      base: 'public/'
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

  grunt.registerTask('build', 'coffee qunit concat min');

  grunt.registerTask('coffee', 'Compiles coffeescript into js files.', function () {
    var exec = require('child_process').exec,
        done = this.async();
    exec('coffee --compile --output lib/ src/', function () {
      done();
    });
  });

  // Nodejs libs.
  var path = require('path');
  // External libs.
  var connect = require('connect'),
      compiler = require('connect-compiler');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('server', 'Start a static web server.', function() {
    var done = this.async();

    // Get values from config, or use defaults.
    var port = grunt.config('server.port') || 8000;
    var base = path.resolve(grunt.config('server.base') || '.');

    // If --debug was specified, enable logging.
    if (grunt.option('debug')) {
      connect.logger.format('grunt', ('[D] server :method :url :status ' +
        ':res[content-length] - :response-time ms').magenta);
      middleware.unshift(connect.logger('grunt'));
    }

    // Start server.
    grunt.log.writeln('Starting static web server on port ' + port + '.');

    var jsPath = path.resolve('lib');
    var app = connect()
      .use(compiler({
        enabled : [ 'coffee' ],
        src: 'src',
        dest: 'lib'
      }))
      .use(compiler({
        enabled: [ 'stylus' ],
        src: 'public',
        dest: 'public'
      }))
      .use(connect.directory(base))
      .use(connect.static(base))
      .use(connect.static(jsPath))
      .listen(port);

    grunt.log.writeln('Press CTRL + C to stop the server.');
  });
};
