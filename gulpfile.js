var gulp = require('gulp')
	jade = require('gulp-jade')
	sass = require('gulp-sass')
	deploy = require('gulp-gh-pages');
	connect = require('gulp-connect');

gulp.task('styles', function() {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
})

gulp.task('content', function() {
	return gulp.src('./src/templates/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('build/'))
})

gulp.task('images', function() {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest('build/images'))
})

gulp.task('models', function() {
	return gulp.src('./src/models/**/*')
		.pipe(gulp.dest('build/models'))
})

gulp.task('scripts', function() {
	return gulp.src('./src/scripts/**/*')
		.pipe(gulp.dest('build/js'))
})

gulp.task('fonts', function() {
	return gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'))
})

gulp.task('connect', function() {
  connect.server({
  	port: 8000,
  	root: 'build',
    livereload: true
  });
});


gulp.task('default', function() {
	gulp.run('styles', 'content', 'images', 'scripts', 'models', 'fonts', 'connect');
	gulp.watch('./src/sass/**', function(event) {
		gulp.run('styles');
	});
	gulp.watch('./src/templates/**', function(event) {
		gulp.run('content');
	});
	gulp.watch('./src/models/**', function(event) {
		gulp.run('models');
	});
	gulp.watch('./src/images/**', function(event) {
		gulp.run('images');
	});
	gulp.watch('./src/scripts/**', function(event) {
		gulp.run('scripts');
	});
})


gulp.task('deploy', function() {
	return gulp.src('./build/**/*')
		.pipe(deploy())
})

