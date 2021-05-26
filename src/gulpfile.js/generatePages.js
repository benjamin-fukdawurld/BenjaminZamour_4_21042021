const { src, dest, parallel } = require("gulp");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");

const indexPage = require("../resources/pages/index");
const pages = [indexPage, { name: "contact", data: indexPage.data }];

function generatePage(name, data) {
    return function () {
        return src("./resources/templates/html.ejs")
            .pipe(ejs(data))
            .pipe(rename({ basename: name, extname: ".html" }))
            .pipe(dest("./test"));
    };
}

exports.generatePages = parallel(
    pages.map(({ name, data }) => {
        return generatePage(name, data);
    })
);
