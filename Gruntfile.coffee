module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    coffee:
      app:
        expand: true
        cwd: 'coffee'
        src: ['**/*.coffee']
        dest: '.'
        ext: '.js'

    less:
      app:
        files:
          'lightbox.css': 'less/lightbox.less'

    watch:
      options:
        livereload: true
      coffee:
        files: '**/*.coffee'
        tasks: ['coffee']
      less:
        files: '**/*.less'
        tasks: ['less']

    connect:
      server:
        options:
          port: 8192

    open:
      app:
        path: 'http://127.0.0.1:8192'

  grunt.registerTask 'default', ['connect', 'coffee', 'less', 'open', 'watch']
