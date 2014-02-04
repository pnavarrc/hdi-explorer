module.exports = function(grunt) {

    // Initialize the grunt configuration
    grunt.initConfig({
        // Import the package configuration
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js']
        },

        copy: {
            bootstrap: {
                files: [
                    {
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: '*.min.js',
                        dest: 'js/lib/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: '*.min.css',
                        dest: 'css/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: '**',
                        dest: 'fonts/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },
            fontawesome: {
                files: [
                    {
                        cwd: 'bower_components/font-awesome/css/',
                        src: '*.min.css',
                        dest: 'css/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/font-awesome/fonts',
                        src: '**',
                        dest: 'fonts/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },
            jquery: {
                src: 'bower_components/jquery/jquery.min.js',
                dest: 'js/lib/jquery.min.js'
            },
            backbone: {
                src: 'bower_components/backbone/backbone-min.js',
                dest: 'js/lib/backbone-min.js'
            },
            underscore: {
                src: 'bower_components/underscore/underscore-min.js',
                dest: 'js/lib/underscore-min.js'
            },
            d3: {
                src: 'bower_components/d3/d3.min.js',
                dest: 'js/lib/d3.min.js'
            }
        },

        clean: ['js/lib/*', 'fonts/*']
    });

    // Enable the grunt plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Register Tasks

    // Test Task
    grunt.registerTask('default', ['copy']);
};