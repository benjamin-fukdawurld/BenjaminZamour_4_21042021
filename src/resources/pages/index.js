const { services, projects } = require("./index_data");

exports.name = "index";
exports.data = {
    keywords: "",
    description: "",
    title: "La Chouette Agence",
    minified: true,
    contentTemplate: "home/home",
    contentData: { services, projects }
};
