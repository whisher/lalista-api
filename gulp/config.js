'use strict';

/* global config:true */
/* exported config */

global.SRC_FOLDER = 'public';
global.SCRIPTS_FOLDER = SRC_FOLDER + '/modules';
global.BUILD_FOLDER = 'build';
global.RELEASE_FOLDER = 'dist';
global.TMP_FOLDER = 'tmp';

var jsExt = (release)?'.min.js':''+'.js';

var config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/index.html',
            mainStyles: SRC_FOLDER + '/styles/app.scss',
            styles: SRC_FOLDER + '/styles/*.scss',
            scripts: [
                TMP_FOLDER + '/templates/templates.js',
                SRC_FOLDER + '/modules/**/*.js'
            ],
            vendor:[
                'bower_components/jquery/dist/jquery'+jsExt,
                'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'+jsExt,
                'bower_components/lodash/lodash'+jsExt,
                'bower_components/angular/angular'+jsExt,
                'bower_components/angular-i18n/angular-locale_it-it.js',
                'bower_components/angular-ui-router/release/angular-ui-router'+jsExt,
                'bower_components/angular-bootstrap/ui-bootstrap-tpls'+jsExt,
                'bower_components/angular-animate/angular-animate'+jsExt,
                'bower_components/ngstorage/ngStorage'+jsExt,
                'bower_components/angular-jwt/dist/angular-jwt'+jsExt,
                'bower_components/angular-socket-io/socket'+jsExt,
                'bower_components/angular-upload/angular-upload'+jsExt,
                'bower_components/angular-counter/counter'+jsExt
            ],
            fonts: [
                'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**',
                'bower_components/fontawesome/fonts/**'
            ],
            assets: [
                SRC_FOLDER + '/favicon.ico',
                SRC_FOLDER + '/humans.txt',
                SRC_FOLDER + '/robots.txt'
            ],
            images: SRC_FOLDER + '/images/**/*',
            templates: SRC_FOLDER + '/modules/**/templates/*.html',
            templatesCompiled: TMP_FOLDER + '/templates',
            dev: [
                './karma.conf.js',
                './protractor.conf.js',
                './gulpfile.js',
                './gulp/**/*.js'
            ],
            unit : [SRC_FOLDER + '/tests/unit/**/*.js'],
            e2e : [SRC_FOLDER + '/tests/e2e/**/*.js'],
            server: ['./index.js', './src/**/*.js']
        },
        dest: {
            build: {
                index: BUILD_FOLDER,
                styles: BUILD_FOLDER + '/styles',
                scripts: BUILD_FOLDER + '/scripts',
                fonts: BUILD_FOLDER + '/fonts',
                images: BUILD_FOLDER + '/images',
                
            },
            dist: {
                index: RELEASE_FOLDER,
                styles: RELEASE_FOLDER + '/styles',
                scripts: RELEASE_FOLDER + '/scripts',
                fonts: RELEASE_FOLDER + '/fonts',
                images: RELEASE_FOLDER + '/images'
            }
        }
    },
    filenames:{ 
        styles: 'bundle.css',
        vendor: 'vendor.js',
        scripts: 'scripts.js'
    }
};

config.paths.src.jsGlobs = config.paths.src.scripts.concat(
    config.paths.src.dev,
    config.paths.src.unit,
    config.paths.src.e2e,
    config.paths.src.server);

global.config = config;