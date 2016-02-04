var api = require("./api.js");

module.exports = {

    home: function (request, reply) {
        reply.file('./public/views/index.html');
    },

    api: function (request, reply) {
        var url = request.path;

        // gets data for all pages in the flipbook
        if (url.split('/')[2] === "flipbook") {
            api.getFlipbookData(function (err, data) {
                reply(data);
            });

        }

    }

};
