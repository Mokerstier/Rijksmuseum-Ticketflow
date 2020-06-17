const gulp = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

return gulp.src([
        './src/js/*.js',
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./static/js'))