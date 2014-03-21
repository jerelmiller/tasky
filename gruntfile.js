module.exports = function(grunt) {
  grunt.registerTask('watch', [ 'watch' ]);

  grunt.initConfig({
    concat: {
      js: {
        options: { separator: ';' },
        src: ['javascripts/*.js'],
        dest: 'public/javascripts/application.min.js'
      },
    },
    uglify: {
      js: {
        files: { 'public/javascripts/application.min.js': ['public/javascripts/application.min.js'] }
      }
    },
    watch: {
      js: {
        files: ['javascripts/*.js'],
        tasks: ['concat:js', 'uglify:js'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
