var gulp = require('gulp')
	jade = require('gulp-jade')
	sass = require('gulp-sass')
	deploy = require('gulp-gh-pages');

gulp.task('styles', function() {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/development/css'));
})

gulp.task('content', function() {
	return gulp.src('./src/templates/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('build/development'))
})

gulp.task('deploy', function() {
	return gulp.src('./build/development/**/*')
		.pipe(deploy())
})

gulp.task('default', function() {
	gulp.run('styles', 'content');
	gulp.watch('./src/sass/**', function(event) {
		gulp.run('styles');
	});
	gulp.watch('./src/templates/**', function(event) {
		gulp.run('content');
	});
})