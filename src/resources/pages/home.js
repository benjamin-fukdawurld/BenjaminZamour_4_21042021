const { services, projects } = require("./home_data");

exports.name = "index";
exports.data = {
    keywords: "",
    description:
        "Besoin d'un site internet ? Nous sommes à votre service pour vous fournir une solution clé en main personnalisée pour votre stratégie marketing digital",
    title: "Entreprise de web design à Lyon - La Chouette Agence",
    minified: true,
    contentTemplate: "pages/home/home",
    contentData: { services, projects },
    bodyScript: [],
};
