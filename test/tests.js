var test = require("tape");
var server = require('../server.js');

test("homepage is displayed at '/'", function (t) {
    server.inject({method: 'GET', url: '/'}, function (res) {
        t.equal(res.statusCode, 200, 'homepage found');
        t.end();
    });
});
