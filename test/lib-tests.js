var server = require('../server.js');
var client = require('../lib/db.js');
var api = require('../lib/api.js');
var assert = require('assert');

describe("routes.js", function() {
    describe("route '/'", function() {
        it("returns statusCode 200", function() {
            server.inject({method: 'GET', url: '/'}, function (res) {
                assert.equal(res.statusCode, 200);
            });
        });
    });
    describe("route '/api/{path*}'", function() {
        it("returns statusCode 200", function() {
            server.inject({method: 'GET', url: '/api/something'}, function (res) {
                assert.equal(res.statusCode, 200);
            });
        });
    });
    describe("route '/static/{path*}'", function() {
        it("returns statusCode 200", function() {
            server.inject({method: 'GET', url: '/static/public/css/main.css'}, function (res) {
                assert.equal(res.statusCode, 200);
            });
        });
    });
});

describe("db.js", function() {
    describe("REDISCLOUD_URL", function() {
        it("environment variable set", function() {
            assert.notEqual(process.env.REDISCLOUD_URL, 'undefined');
        });
        it("value can be added to database", function() {
            client.set('test', 'testData');
            client.get('test', function (err, reply) {
                assert.equal(reply, 'testData');
                client.del('test');
            });
        });
    });
});

describe("api.js", function() {
    describe("#getFlipbookData", function() {
        it("returns an array", function(done) {
            api.getFlipbookData(function(err, data) {
                assert.equal(Array.isArray(data), true);
                done();
            });
        });
        it("array items are objects", function(done) {
            api.getFlipbookData(function(err, data) {
                assert.equal(typeof data[0], "object");
                done();
            });
        });
        it("array length is greater than 0", function(done) {
            api.getFlipbookData(function(err, data) {
                assert.equal(data.length > 0, true);
                done();
            });
        });
    });
});
