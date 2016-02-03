var client = require("./db.js");

module.exports = {

    getSectionData: function (section, callback) {

        client.smembers(section, function (listErr, ids) {
            if (listErr) {
                callback(listErr, null);

            } else {
                var sectionData = [];
                var counter = 0;

                ids.forEach(function (id) {
                    return client.hgetall(id, function(hashErr, imageData) {
                        if (hashErr) {
                            callback(hashErr, null);

                        } else {
                            sectionData.push(imageData);

                            if(++counter === ids.length) {
                                callback(null, sectionData);
                            }
                        }
                    });
                });
            }
        });

    }

};
