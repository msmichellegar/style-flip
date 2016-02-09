var client = require("./db.js");

module.exports = {

    getFlipbookData: function(callback) {

        // gets set of ids for all pages in the book
        client.smembers("pages", function(listErr, ids) {
            if (listErr) {
                callback(listErr, null);

            } else {
                var flipbookData = [];
                var counter = 0;

                // gets hash data for all ids in the set
                ids.forEach(function(id) {
                    return client.hgetall(id, function(hashErr, pageData) {
                        if (hashErr) {
                            callback(hashErr, null);

                        } else {
                            flipbookData.push(pageData);

                            if(++counter === ids.length) {
                                callback(null, flipbookData);
                            }
                        }
                    });
                });
            }
        });

    }

};
