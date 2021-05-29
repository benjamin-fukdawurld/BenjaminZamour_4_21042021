const { src, dest, parallel } = require("gulp");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const htmlmin = require("gulp-htmlmin");
const prettier = require("gulp-prettier");
const gulpif = require("gulp-if");
const validator = require("gulp-html");

const homePage = require("../resources/pages/home");
const contactPage = require("../resources/pages/contact");
const pages = [homePage, contactPage];

function generatePage(name, data) {
    return function () {
        return src("./resources/templates/html.ejs")
            .pipe(ejs(data))
            .pipe(rename({ basename: name, extname: ".html" }))
            .pipe(
                gulpif(
                    process.env.NODE_ENV === "production",
                    htmlmin({ collapseWhitespace: true }),
                    prettier({
                        printWidth: 100,
                        tabWidth: 4,
                    })
                )
            )
            .pipe(validator())
            .pipe(dest(process.env.distFolder));
    };
}

exports.generatePages = parallel(
    pages.map(({ name, data }) => {
        return generatePage(name, data);
    })
);
