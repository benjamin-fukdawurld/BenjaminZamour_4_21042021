const { src, dest, parallel } = require("gulp");
const rename = require("gulp-rename");
const ejs = require("gulp-ejs");
const htmlmin = require("gulp-htmlmin");
const prettier = require("gulp-prettier");
const gulpif = require("gulp-if");
const validator = require("gulp-html");
const access = require("gulp-accessibility");

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
            .pipe(dest(process.env.distFolder))
            .pipe(
                access({
                    force: true,
                    accessibilityLevel: "WCAG2AA",
                    ignore: [
                        "WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H77",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H78",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H79",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H80",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H81",
                        "WCAG2AA.Principle2.Guideline2_4.2_4_4.H33",
                        "WCAG2AA.Principle1.Guideline1_1.1_1_1.G94.Image",
                        "WCAG2AA.Principle1.Guideline1_1.1_1_1.G73,G74",
                        "WCAG2AA.Principle3.Guideline3_2.3_2_1.G107",
                        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage",
                        "WCAG2AA.Principle1.Guideline1_3.1_3_1.H85.2",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_4.G98",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_4.G99",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_4.G155",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_4.G164",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_4.G168.LegalForms",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_3.G177",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_2.G131,G89,G184,H90",
                        "WCAG2AA.Principle3.Guideline3_3.3_3_1.G83,G84,G85",
                    ],
                })
            )
            .on("error", console.log)
            .pipe(access.report({ reportType: "json" }))
            .pipe(
                rename({
                    extname: ".json",
                })
            )
            .pipe(dest(process.env.distFolder + "/reports/json"));
    };
}

exports.generatePages = parallel(
    pages.map(({ name, data }) => {
        return generatePage(name, data);
    })
);
