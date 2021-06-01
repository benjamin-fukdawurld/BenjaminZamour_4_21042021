require("dotenv").config();

const { src, dest, parallel, series, watch } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

const { generatePages } = require("./generatePages");

process.env.distFolder = process.env.distFolder ?? "./dist";

function minifyCss() {
    return src("./resources/css/*.css")
        .pipe(cleanCSS({}))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(dest(process.env.distFolder + "/css"));
}

function minifyJs() {
    return src("./resources/js/*.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(dest(process.env.distFolder + "/js"));
}

function optimiseImages() {
    return src("./resources/img/*")
        .pipe(imagemin())
        .pipe(dest(process.env.distFolder + "/img"));
}

function copyFavIcon() {
    return src("./resources/favicon.*").pipe(dest(process.env.distFolder));
}

function copyFonts() {
    return src("./resources/fonts/*").pipe(
        dest(process.env.distFolder + "/fonts")
    );
}

function copyIndexingFiles() {
    return src(["./resources/robots.txt", "./resources/sitemap.txt"]).pipe(
        dest(process.env.distFolder)
    );
}

function copyPhpFiles() {
    return src("./resources/includes/*.php").pipe(
        dest(process.env.distFolder + "/includes")
    );
}

exports.optimiseImages = optimiseImages;
exports.copyImages = parallel(optimiseImages, copyFavIcon);
exports.copyIndexingFiles = copyIndexingFiles;
exports.copyPhpFiles = copyPhpFiles;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.copyFonts = copyFonts;
exports.generatePages = generatePages;
exports.default = parallel(
    exports.copyImages,
    generatePages,
    minifyCss,
    minifyJs,
    copyFonts,
    copyIndexingFiles,
    copyPhpFiles
);

exports.watch = function () {
    watch("./resources/img/*", { ignoreInitial: false }, optimiseImages);

    watch("./resources/favicon.*", { ignoreInitial: false }, copyFavIcon);

    watch("./resources/js/*.js", { ignoreInitial: false }, minifyJs);

    watch("./resources/css/*.css", { ignoreInitial: false }, minifyCss);

    watch("./resources/fonts/*", { ignoreInitial: false }, copyFonts);

    watch("./resources/pages/**", { ignoreInitial: false }, generatePages);

    watch("./resources/templates/**", { ignoreInitial: false }, generatePages);

    watch("./resources/*.txt", { ignoreInitial: false }, copyIndexingFiles);

    watch("./resources/includes/*.php", { ignoreInitial: false }, copyPhpFiles);
};
