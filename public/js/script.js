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
        var relatedProducts = [];
        var relatedProductLinks = [];

        // insert first pages of flipbook
        $("#top-image").attr("src", "/static/public/images/" + topData[0].image).addClass("0");
        $("#bottom-image").attr("src", "/static/public/images/" + bottomData[0].image).addClass("0");

        // create array of related products to initialise with
        relatedProducts.push(topData[0]["related-image-1"], topData[0]["related-image-2"], topData[0]["related-image-3"], bottomData[0]["related-image-1"], bottomData[0]["related-image-2"], bottomData[0]["related-image-3"]);

        // create array of related links to initialise with
        relatedProductLinks.push(topData[0]["related-url-1"], topData[0]["related-url-2"], topData[0]["related-url-3"], bottomData[0]["related-url-1"], bottomData[0]["related-url-2"], bottomData[0]["related-url-3"]);

        for (var i=0; i < relatedProducts.length; i++) {

            // assign different class to top and bottom products
            var productClass = i < 3 ? "top-product" : "bottom-product";

            // append related products to collection
            $(".collection").append("<a href='" + relatedProductLinks[i] + "'><div class='collection--item " + productClass +"'><img src='/static/public/images/" + relatedProducts[i] + "'/><div class='view-button' href='" + relatedProductLinks[i] + "'>Shop on lyst&nbsp;&nbsp;&nbsp;></div></div></a>");
        }

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
        var relatedProducts = [];
        var relatedProductLinks = [];

        var currentIndex = parseInt($("#" + section + "-image").attr("class"));
        var nextIndex;

        // push images and links to relevant arrays
        data.forEach(function(page) {
            pageImages.push(page.image);
            relatedProducts.push([page["related-image-1"], page["related-image-2"], page["related-image-3"]]);
            relatedProductLinks.push([page["related-url-1"], page["related-url-2"], page["related-url-3"]]);
        });


        // determine index of next flipbook page
        if (direction === "left") {
            if (currentIndex === 0) {
                nextIndex = pageImages.length - 1;
            } else {
                nextIndex = currentIndex - 1;
            }
        } else {
            if (currentIndex === pageImages.length - 1) {
                nextIndex = 0;
            } else {
                nextIndex = currentIndex + 1;
            }
        }

        // update page image
        $("#" + section + "-image").attr("src", "/static/public/images/" + pageImages[nextIndex]).removeClass().addClass(nextIndex.toString());

        flipbook.insertRelatedProducts(relatedProducts[nextIndex], relatedProductLinks[nextIndex], section);

    },

    insertRelatedProducts: function insertRelatedProducts(images, links, section) {
        var productClass = section === "top" ? "top-product" : "bottom-product";

        // remove current related products
        $("." + section + "-product").remove();

        // insert new related products
        for (var i=0; i < 3; i++) {
            var content = "<a href='" + links[i] + "'><div class='collection--item " + productClass + "'><img src='/static/public/images/" + images[i] + "'/><div class='view-button' href='" + links[i] + "'>Shop on lyst&nbsp;&nbsp;&nbsp;></div></div></a>";

            if (section === "top") {
                $(".collection").prepend(content);
            } else {
                $(".collection").append(content);
            }

        }

    }

};
