module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files : {
                    'build/<%= pkg.js %>.min.js' : ['src/<%= pkg.js %>.js']
                }
            }
        },
        watch : {
            options : {
                livereload: true
            },
            files : ['src/**/*', 'index.html'],
            tasks : ['uglify', 'compass']
        },
        compass : {
            create : {
                config :'/config.rb'
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-compass')

    grunt.registerTask('default', ['watch'])
}
