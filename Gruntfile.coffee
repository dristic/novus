snockets = require 'snockets'
fs = require 'fs'
path = require 'path'

module.exports = (grunt) ->
  # Configure grunt tasks.
  grunt.initConfig
    meta:
      version: '0.1.0'

    lint:
      files: ['src/**/*.js', 'test/**/*.js']

    jasmine:
      dist:
        src: '<%= generate.options.output %>'
        options:
          specs: 'test/dist/**/*_spec.js'
          helpers: 'test/dist/**/*_helper.js'

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
      tasks: 'lint test'

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

    coffee:
      glob_to_multiple:
        expand: true
        cwd: 'test/spec'
        src: ['**/*_spec.coffee', '**/*_helper.coffee']
        dest: 'test/dist'
        ext: '.js'

    generate:
      options:
        src: 'src/novus.coffee'
        output: 'dist/novus-<%= meta.version %>.js'

  # Load up grunt libraries
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-contrib-concat'

  # Default task lints, tests, and builds everything.
  grunt.registerTask 'default', ['test']

  # Build task builds and tests.
  grunt.registerTask 'build', ['generate', 'concat']

  # Builds and tests the engine.
  grunt.registerTask 'test', ['build', 'coffee', 'jasmine']

  # Coffee task builds the main novus engine and game.
  grunt.registerTask 'generate', 'Compiles coffeescript into js files', () ->
    options = this.options({})

    js = new snockets().getConcatenation(options.src, { minify: true, async: false })
    fs.writeFileSync options.output, js
