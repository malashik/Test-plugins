const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


const paths = {
	root: './build',
	templates: {
		pages: 'src/templates/index.pug',
		dest: 'build/pages'
	},
	styles: {
		src: 'src/styles/menu.styl',
		dest: 'build/assets/styles/common/'
	},
	images: {
		src: 'src/blocks/**/*.{jpg,png,svg}',
		dest: 'build/assets/images/'
	}
}



//очистка +
gulp.task('clean', function() {
	return del(paths.root);
})


//pug + 
gulp.task('templates', function() {
	return gulp.src(paths.templates.pages)
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(paths.root));
})

//css +
gulp.task('styles', function(){
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(stylus({
			compress: true
		  }))
		.pipe(sourcemaps.write())
		.on('error', notify.onError())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		
})

// перенос fonts +
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
		   .pipe(gulp.dest('build/assets/fonts/'))
});

// js
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		   .pipe(gulp.dest('build/assets/js/'))
});

// изображения +
gulp.task('images', function(){
	return gulp.src(paths.images.src)
		// .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
		.pipe(gulp.dest(paths.images.dest));    		
});

// следим за исходниками, папка src

gulp.task('watch', function(){
    gulp.watch("src/**/*.pug", gulp.series('templates'));
    gulp.watch("src/**/*.styl", gulp.series('styles'));
    gulp.watch("src/**/*.{jpg,png,svg}", gulp.series('images'));
    gulp.watch("src/fonts/**/*.*", gulp.series('fonts'));
    gulp.watch("src/js/**/*.*", gulp.series('js'));
})

// следим за build и релоадим браузер  
gulp.task('server', function(){     
		browserSync.init({
			server: paths.root
			});
		browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
	})
	

// Для работы    
gulp.task('default', gulp.series(
	gulp.parallel('styles','templates','images','fonts','js'),
	gulp.parallel('watch','server')
));
// сборка на продакшн
gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('styles','templates','images','fonts','js')
));







