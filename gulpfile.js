var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('watch', ['copy'],  function() {
    watch('src/app/**/*.html', { ignoreInitial: false })
    	.pipe(gulp.dest('dist/app'));

    watch(['src/*.html', 'src/*.css', 'src/*.js'], { ignoreInitial: false })
    	.pipe(gulp.dest('dist'));

	watch(['src/**/*.scss', 'src/style/**/*.scss'], { ignoreInitial: false })
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
	gulp.src('res/**/')
		.pipe(gulp.dest('dist/res'));
});