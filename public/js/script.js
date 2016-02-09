$(document).ready(function() {
    flipbook.getData([flipbook.initialise, flipbook.enableFlipping]);

});

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

        // assign each flipbook page data to top or bottom array
        data.forEach(function(page) {
            if (page.section === "top") {
                topData.push(page);
            } else if (page.section === "bottom") {
                bottomData.push(page);
            }

        });

        return [topData.sort(), bottomData.sort()];

    },

    initialise: function initialiseFlipBook(topData, bottomData) {
        var relatedProductImages = [];
        var relatedProductLinks = [];

        flipbook.insertPage("top", "0", [topData[0].image]);
        flipbook.insertPage("bottom", "0", [bottomData[0].image]);

        // create array of related products to initialise with
        relatedProductImages.push(topData[0]["related-image-1"], topData[0]["related-image-2"], topData[0]["related-image-3"], bottomData[0]["related-image-1"], bottomData[0]["related-image-2"], bottomData[0]["related-image-3"]);

        // create array of related links to initialise with
        relatedProductLinks.push(topData[0]["related-url-1"], topData[0]["related-url-2"], topData[0]["related-url-3"], bottomData[0]["related-url-1"], bottomData[0]["related-url-2"], bottomData[0]["related-url-3"]);

        flipbook.insertRelatedProducts(relatedProductImages, relatedProductLinks);

    },

    enableFlipping: function enableFlipping(topData, bottomData) {

        // when clicking on a left button
        $(".left").click(function() {
            if ($(this).hasClass("top")) {
                flipbook.flip("left", "top", topData);
            } else {
                flipbook.flip("left", "bottom", bottomData);
            }

        });

        // when clicking on a right button
        $(".right").click(function() {
            if ($(this).hasClass("top")) {
                flipbook.flip("right", "top", topData);
            } else {
                flipbook.flip("right", "bottom", bottomData);
            }

        });
    },

    flip: function flip (direction, section, data) {
        var pageImages = [];
        var relatedProductImages = [];
        var relatedProductLinks = [];

        var currentIndex = parseInt($("#" + section + "-image").attr("class"));
        var nextIndex;

        // push images and links to relevant arrays
        data.forEach(function(page) {
            pageImages.push(page.image);
            relatedProductImages.push([page["related-image-1"], page["related-image-2"], page["related-image-3"]]);
            relatedProductLinks.push([page["related-url-1"], page["related-url-2"], page["related-url-3"]]);
        });

        nextIndex = flipbook.determineNextPage(currentIndex, relatedProductImages, direction);

        flipbook.insertPage(section, nextIndex, pageImages);

        flipbook.insertRelatedProducts(relatedProductImages[nextIndex], relatedProductLinks[nextIndex], section);

    },

    insertPage: function insertPage(section, nextIndex, pageImages) {

        // inserts main page image for flipbook
        $("#" + section + "-image").attr("src", "/static/public/images/" + pageImages[nextIndex]).removeClass().addClass(nextIndex.toString());

    },

    insertRelatedProducts: function insertRelatedProducts(images, links, section) {
        var productClass = section === "top" ? "top-product" : "bottom-product";

        // remove current related products
        $("." + section + "-product").remove();

        // insert new related products
        for (var i=0; i < images.length; i++) {
            var content = "<a href='" + links[i] + "'><div class='collection--item " + productClass + "'><img src='/static/public/images/" + images[i] + "'/><div class='view-button' href='" + links[i] + "'>Shop on lyst&nbsp;&nbsp;&nbsp;></div></div></a>";

            if (section === "top") {
                $(".collection").prepend(content);
            } else {
                $(".collection").append(content);
            }
        }

    },

    determineNextPage: function determineNextPage(currentIndex, images, direction) {
        var nextIndex;

        // determine index number of next flipbook page
        if (direction === "left") {
            if (currentIndex === 0) {
                nextIndex = images.length - 1;
            } else {
                nextIndex = currentIndex - 1;
            }
        } else {
            if (currentIndex === images.length - 1) {
                nextIndex = 0;
            } else {
                nextIndex = currentIndex + 1;
            }
        }

        return nextIndex;
    }

};
