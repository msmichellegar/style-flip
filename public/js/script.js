$(document).ready(function() {

    flipbook.getData([flipbook.initialise, flipbook.enableFlipping]);

});

var topImageIndex = 0;
var bottomImageIndex = 0;

var flipbook = {

    getData: function getFlipbookData(callbacks) {

        $.ajax('/api/flipbook', {
            success: function(flipbookData) {
                var topData;
                var bottomData;

                // divide data into top and bottom sections
                topData = flipbook.divideData(flipbookData)[0];
                bottomData = flipbook.divideData(flipbookData)[1];

                // run supplied callback functions
                callbacks.forEach(function(callback) {
                    callback(topData, bottomData);
                });

            }

        });

    },

    divideData: function divideFlipbookData(data) {
        var topData = [];
        var bottomData = [];

        // assign each page to top or bottom array
        data.forEach(function(page) {
            if (page.section === "top") {
                topData.push(page);
            } else if (page.section === "bottom") {
                bottomData.push(page);
            }

        });

        return [topData, bottomData];

    },

    initialise: function initialiseFlipBook(topData, bottomData) {

        // insert first pages of flipbook
        $("#top-image").attr("src", "/static/public/images/" + topData[0].image);
        $("#bottom-image").attr("src", "/static/public/images/" + bottomData[0].image);

        // insert first related products
        $("#related-1").attr("src", "/static/public/images/" + topData[0]["related-image-1"]);
        $("#related-2").attr("src", "/static/public/images/" + topData[0]["related-image-2"]);
        $("#related-3").attr("src", "/static/public/images/" + topData[0]["related-image-3"]);
        $("#related-4").attr("src", "/static/public/images/" + bottomData[0]["related-image-1"]);
        $("#related-5").attr("src", "/static/public/images/" + bottomData[0]["related-image-2"]);
        $("#related-6").attr("src", "/static/public/images/" + bottomData[0]["related-image-3"]);

    },

    enableFlipping: function enableFlipping(topData, bottomData) {

        // when clicking on a left button
        $(".top").click(function() {
            if ($(".top").hasClass("left")) {
                flipbook.flipTop("left", topData);
            } else {
                flipbook.flipTop("right", topData);
            }

        });

        // when clicking on a right button
        $(".bottom").click(function() {
            if ($(".bottom").hasClass("left")) {
                flipbook.flipBottom("left", bottomData);
            } else {
                flipbook.flipBottom("right", bottomData);
            }

        });
    },

    flipTop: function flipTop (direction, topData) {
        var topImages = [];
        var firstRelatedProductImages = [];
        var secondRelatedProductImages = [];
        var thirdRelatedProductImages = [];

        // push images to various arrays
        topData.forEach(function(page) {
            topImages.push(page.image);
            firstRelatedProductImages.push(page["related-image-1"]);
            secondRelatedProductImages.push(page["related-image-2"]);
            thirdRelatedProductImages.push(page["related-image-3"]);
        });

        if (direction === "left") {
            if (topImageIndex === 0) {
                topImageIndex = topImages.length - 1;
            } else {
                topImageIndex = topImageIndex - 1;
            }

            // update top image
            $("#top-image").attr("src", "/static/public/images/" + topImages[topImageIndex]);

            // update related products
            $("#related-1").attr("src", "/static/public/images/" + firstRelatedProductImages[topImageIndex]);
            $("#related-2").attr("src", "/static/public/images/" + secondRelatedProductImages[topImageIndex]);
            $("#related-3").attr("src", "/static/public/images/" + thirdRelatedProductImages[topImageIndex]);

        } else {
            if (topImageIndex === topImages.length - 1) {
                topImageIndex = 0;
            } else {
                topImageIndex = topImageIndex + 1;
            }

            // update top image
            $("#top-image").attr("src", "/static/public/images/" + topImages[topImageIndex]);

            // update related products
            $("#related-1").attr("src", "/static/public/images/" + firstRelatedProductImages[topImageIndex]);
            $("#related-2").attr("src", "/static/public/images/" + secondRelatedProductImages[topImageIndex]);
            $("#related-3").attr("src", "/static/public/images/" + thirdRelatedProductImages[topImageIndex]);
        }

    },

    flipBottom: function flipBottom (direction, bottomData) {
        var bottomImages = [];
        var firstRelatedProductImages = [];
        var secondRelatedProductImages = [];
        var thirdRelatedProductImages = [];

        // push images to various arrays
        bottomData.forEach(function(page) {
            bottomImages.push(page.image);
            firstRelatedProductImages.push(page["related-image-1"]);
            secondRelatedProductImages.push(page["related-image-2"]);
            thirdRelatedProductImages.push(page["related-image-3"]);
        });

        if (direction === "left") {
            if (bottomImageIndex === 0) {
                bottomImageIndex = bottomImages.length - 1;
            } else {
                bottomImageIndex = bottomImageIndex - 1;
            }

            // update bottom image
            $("#bottom-image").attr("src", "/static/public/images/" + bottomImages[bottomImageIndex]);

            // update related products
            $("#related-4").attr("src", "/static/public/images/" + firstRelatedProductImages[bottomImageIndex]);
            $("#related-5").attr("src", "/static/public/images/" + secondRelatedProductImages[bottomImageIndex]);
            $("#related-6").attr("src", "/static/public/images/" + thirdRelatedProductImages[bottomImageIndex]);

        } else {
            if (bottomImageIndex === bottomImages.length - 1) {
                bottomImageIndex = 0;
            } else {
                bottomImageIndex = bottomImageIndex + 1;
            }

            // update bottom image
            $("#bottom-image").attr("src", "/static/public/images/" + bottomImages[bottomImageIndex]);

            // update related products
            $("#related-4").attr("src", "/static/public/images/" + firstRelatedProductImages[bottomImageIndex]);
            $("#related-5").attr("src", "/static/public/images/" + secondRelatedProductImages[bottomImageIndex]);
            $("#related-6").attr("src", "/static/public/images/" + thirdRelatedProductImages[bottomImageIndex]);
        }
    }

};
