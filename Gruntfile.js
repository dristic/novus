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
    jasmine: {
      novus: {
        src: 'dist/built.js',
        options: {
          specs: 'test/spec/*Spec.js',
          helpers: 'test/spec/*Helper.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['lib/vendor/zepto.js', 'dist/novus.js'],
        dest: 'dist/built.js'
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
      base: '.'
    },
    coffee: {
      options: {
        src: 'src/novus.coffee',
        output: 'dist/novus.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

  grunt.registerTask('build', 'coffee qunit');

  grunt.registerTask('coffee', 'Compiles coffeescript into js files.', function () {
    var snockets = require('snockets'),
        fs = require('fs'),
        options = this.options({

        });
    var js = new snockets().getConcatenation(options.src, { minify: false, async: false });
    fs.writeFileSync(options.output, js);
  });

  // Nodejs libs.
  var path = require('path');
  // External libs.
  var connect = require('connect'),
      compiler = require('connect-compiler'),
      coffeescript = require('connect-coffee-script');

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

    var jsPath = path.resolve('dist-debug'),
        snockets = require('snockets');
    var app = connect()
        .use(compiler({
          enabled: [ 'stylus' ],
          src: 'public',
          dest: 'public'
        }))
        .use(coffeescript({
          src: __dirname,
          bare: true,
          force: true,
          compile: function (str, options, coffeePath) {
            js = new snockets().getConcatenation(coffeePath, { minify: false, async: false });
            return js;
          }
        }))
        .use(connect.directory(base))
        .use(connect.static(base))
        .listen(port);

    grunt.log.writeln('Press CTRL + C to stop the server.');
  });
};
