module.exports = function(grunt) {
  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-browserify');

  // Plugin configuration
  grunt.initConfig({
    browserify: {
      './dist/app.js': ['./js/play.js']
    },
    jshint: {
      all: {
        src: ['./**/*.js', '!./dist/app.js', '!./node_modules/**/*', '!./bower_components/**/*', '!./Gruntfile.js'],
        options: {
          jshintrc: true
        }
      }
    },
    stylelint: {
      all: {
        src: ['./**/*.css', '!./node_modules/**/*', '!./bower_components/**/*']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['./**/*.js', '!./dist/app.js','!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['browserify','jshint']
      },
      html: {
        files: ['./**/*.html', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['htmlhint']
      },
      css: {
        files: ['./**/*.css', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['stylelint']
      },
      json: {
        files: ['./**/*.json', '!./node_modules/**/*', '!./bower_components/**/*'],
        tasks: ['jsonlint']
      }
    },
    jsonlint: {
      all: {
        src: ['./**/*.json', '!./node_modules/**/*', '!./bower_components/**/*'],
        options: {
          format: true,
          indent: 2
        }
      }
    },
    htmlhint: {
      all: {
        src: ['./**/*.html', '!./node_modules/**/*', '!./bower_components/**/*'],
        options: {
          htmlhintrc: '.htmlhintrc'
        }
      }
    }
  });
  grunt.registerTask('default', ['browserify','watch']);
};
