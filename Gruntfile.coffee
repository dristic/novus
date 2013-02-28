snockets = require 'snockets'
fs = require 'fs'
path = require 'path'
connect = require 'connect'
compiler = require 'connect-compiler'
coffeescript = require 'connect-coffee-script'

module.exports = (grunt) ->
  # Configure grunt tasks.
  grunt.initConfig
    meta:
      version: '0.1.0'

    lint:
      files: ['src/**/*.js', 'test/**/*.js']

    jasmine:
      dist:
        src: 'dist/novus-<%= meta.version %>.min.js'
        options:
          specs: 'test/spec/*Spec.js'
          helpers: 'test/spec/*Helper.js'

    concat:
      options:
        separator: ';'
        banner: '/*! Novus - v<%= meta.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '* http://danristic.com/\n' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
          'Dan Ristic; Licensed MIT */'
      dist:
        src: ['lib/vendor/zepto.min.js', 'dist/novus.js']
        dest: 'dist/novus-<%= meta.version %>.min.js'

    watch:
      files: '<config:lint.files>'
      tasks: 'lint qunit'

    jshint:
      options:
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        boss: true
        eqnull: true
        browser: true
      globals:
        console: true

    server:
      options:
        port: 8000
        base: '.'
        coffeescript:
          src: __dirname
          bare: true
          force: true
          compile: (str, options, coffeePath) ->
            new snockets().getConcatenation(coffeePath, { minify: false, async: false })

    coffee:
      options:
        src: 'src/novus.coffee'
        output: 'dist/novus-<%= meta.version %>.js'

  # Load up grunt libraries
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-concat'

  # Default task lints, tests, and builds everything.
  grunt.registerTask 'default', ['test']

  # Build task builds and tests.
  grunt.registerTask 'build', ['coffee', 'concat']

  # Builds and tests the engine.
  grunt.registerTask 'test', ['build', 'jasmine']

  # Coffee task builds the main novus engine and game.
  grunt.registerTask 'coffee', 'Compiles coffeescript into js files', () ->
    options = this.options({})

    js = new snockets().getConcatenation(options.src, { minify: true, async: false })
    fs.writeFileSync options.output, js

  # Spins up a server the builds out coffee files and serves static html.
  grunt.registerTask 'server', 'Start a static web server', () ->
    done = this.async()
    options = this.options
      port: 8000
      base: '.'

    if options.debug
      connect.logger.format('grunt', ('[D] server :method :url :status ' +
        ':res[content-length] - :response-time ms').magenta)
      middleware.unshift(connect.logger('grunt'))

    grunt.log.writeln "Starting static web server on port #{options.port}."

    app = connect()
      .use(compiler(options.compiler))
      .use(coffeescript(options.coffeescript))
      #.use(connect.directory(options.base))
      .use(connect.static(__dirname))
      .listen(options.port)

    grunt.log.writeln "Press CTRL + C to stop the server."
