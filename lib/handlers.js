var api = require("./api.js");

module.exports = {

    home: function (request, reply) {
        reply.file('./public/views/index.html');
    },

    api: function (request, reply) {
        var url = request.path;

        if (url.split('/')[2] === "tops") {
            api.getSectionData("tops", function (err, topsData) {
                console.log("fewoimiomwieo");
                reply(topsData);
            });

        } else if (url.split('/')[2] === "bottoms") {
            api.getSectionData("bottoms", function (err, bottomsData) {
                reply(bottomsData);
            });

        }

    }

};
