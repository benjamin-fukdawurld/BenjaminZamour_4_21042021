const ejs = require("ejs");
const minify = require("html-minifier").minify;
const fs = require("fs/promises");
const { services, projects } = require("./data");

function render(file, data) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(file, data, {}, function (err, html) {
            if (err) {
                reject(err);
            }

            resolve(html);
        });
    });
}

render("templates/html.ejs", {
    keywords: "",
    description: "",
    title: "La Chouette Agence",
    minified: true,
    contentTemplate: "home/home",
    contentData: {services, projects},
}).then((html) => {
    return Promise.all([
        fs.writeFile("../dist/index2.html", html),
        fs.writeFile("../dist/index2.min.html", minify(html, {
            keepClosingSlash: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
        }))
    ]);
});
