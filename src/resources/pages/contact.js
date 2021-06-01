const data = require("./contact_data");

exports.name = "contact";
exports.data = {
    keywords: "",
    description: "",
    title: "Nous contacter - La Chouette Agence",
    minified: true,
    contentTemplate: "pages/contact/contact",
    contentData: data,
    bodyScript: [
        {
            code: `function initMap() {
    const agence = { lat: 45.769666272266434, lng: 4.8301780269529715 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: agence,
    });
    const marker = new google.maps.Marker({
        position: agence,
        map: map,
    });
}`,
        },
        {
            src: `https://maps.googleapis.com/maps/api/js?key=${process.env.gmap_apikey}&callback=initMap`,
            async: true,
        },
    ],
};
