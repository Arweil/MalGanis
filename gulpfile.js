const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');
const merge = require('merge2');
const chalk = require('chalk');

const dirDevelop = ['src/**'];
const dirDevelopJS = ['src/**/*.js'];
const dirDevelopTS = ['src/**/*.ts', 'src/**/*.tsx'];
const dirPublish = 'lib'
const copyFiles = ['package.json', 'README.md']

const { log } = console;
const tsProject = ts.createProject('tsconfig.json');
const tslintProgram = tslint.Linter.createProgram('./tsconfig.json');

const fileWatchColorMap = {
  'added': 'blue',
  'changed': 'green',
  'deleted': 'red',
}

// handle es5+
function babelTask() {
  return gulp.src(dirDevelopJS)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dirPublish))
    .pipe(plumber.stop())
}

// handle typescript
function tsTask() {
  const tsResult = gulp.src(dirDevelopTS)
    .pipe(tsProject());
  
  return merge([
    tsResult.dts.pipe(gulp.dest(dirPublish)), // create *.d.ts
    tsResult.js.pipe(gulp.dest(dirPublish)), // create *.js
  ]);
}

function scriptTask() {
  return Promise.all([
    babelTask(),
    tsTask(),
  ])
  
}

gulp.task('tslint', function () {
  return gulp.src(dirDevelopTS)
    .pipe(gulpTslint({
      configuration: 'tslint.json',
      formatter: 'stylish',
      ...{ tslintProgram }
    }))
    .pipe(gulpTslint.report({
      allowWarnings: true,
    }))
})

// copy package.json to publish folder
gulp.task('copy', function () {
  return gulp.src(copyFiles)
    .pipe(plumber())
    .pipe(gulp.dest(dirPublish))
    .pipe(plumber.stop())
})

// build project to publish folder
gulp.task('build', ['copy', 'tslint'], scriptTask)

// watch project files to change
gulp.task('watch', function () {
  scriptTask().then(() => {
    gulp.watch(dirDevelop, scriptTask)
      .on('change', function (event) {
        const logTxt = `[${new Date().toLocaleString()}] File ${event.type} - ${event.path}`;
        const curColor = fileWatchColorMap[event.type];
        log(chalk[curColor](logTxt));
      })
  })
})

