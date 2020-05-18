const gulp = require('gulp')

return gulp.src([
        './src/assets/**/*.*'
    ])
    .pipe(gulp.dest('./static/'))