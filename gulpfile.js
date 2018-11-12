const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const chalk = require('chalk');

const dirDevelop = 'src/**';
const dirPublish = 'lib'
const copyFiles = ['package.json', 'src/**/*.d.ts']

const { log } = console;

const fileWatchColorMap = {
  'added': 'blue',
  'changed': 'green',
  'deleted': 'red',
}

function babelTask() {
  return gulp.src(dirDevelop)
    .pipe(babel())
}

function babelToPublishFolder() {
  babelTask()
    .pipe(gulp.dest(dirPublish))
}

// copy package.json to publish folder
gulp.task('copy', function () {
  return gulp.src(copyFiles)
    .pipe(gulp.dest(dirPublish))
})

// build project to publish folder
gulp.task('build', ['copy'], babelToPublishFolder)

// watch project files to change
gulp.task('watch', ['build'], function () {
  gulp.watch(dirDevelop, babelToPublishFolder)
    .on('change', function (event) {
      const logTxt = `[${new Date().toLocaleString()}] File ${event.type} - ${event.path}`;
      const curColor = fileWatchColorMap[event.type];
      log(chalk[curColor](logTxt));
    })
})

