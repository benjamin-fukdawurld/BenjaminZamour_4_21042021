const { src, dest, parallel } = require("gulp");
const minify = require("gulp-minify");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

const generatePages = require("./generatePages");

function minifyCss() {
    return src("./resources/css/*.css")
        .pipe(minify())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(dest("./test/css"));
}

function minifyJs() {
    return src("./resources/js/*.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest("./test/js"));
}

function optimiseImages() {
    return src("./resources/img/*").pipe(imagemin()).pipe(dest("./test/img"));
}

exports.optimiseImages = optimiseImages;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.generatePages = generatePages.generatePages;
exports.default = parallel(optimiseImages, generatePages.generatePages, minifyCss, minifyJs);
