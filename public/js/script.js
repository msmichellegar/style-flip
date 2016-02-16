var flipbook = {

    initialise: function initialise(callbacks) {

        var request = new XMLHttpRequest();
        request.open('GET', '/api/flipbook', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);

                // run supplied callback functions
                flipbook.loadFirstPage(data);
                flipbook.enableFlipping(data);

            }
        };

        request.send();

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

    loadFirstPage: function loadFirstPage(data) {
        var dividedData = flipbook.divideData(data);

        // insert page and related products for top then bottom
        for (var i=0; i < dividedData.length; i++) {
            var relatedProductImages = flipbook.getRelatedProductImages(dividedData[i])[0];
            var relatedProductLinks = flipbook.getRelatedProductLinks(dividedData[i])[0];

            if (i === 0) {
                flipbook.insertPage("top", "0", [dividedData[i][0].image]);
                flipbook.insertRelatedProducts(relatedProductImages, relatedProductLinks, "top");
            } else {
                flipbook.insertPage("bottom", "0", [dividedData[i][0].image]);
                flipbook.insertRelatedProducts(relatedProductImages, relatedProductLinks, "bottom");
            }

        }

        document.querySelector(".flipbook-wrapper").style.display = "block";
        document.querySelector(".collection-wrapper").style.display = "block";

    },

    enableFlipping: function enableFlipping(data) {
        var topData = flipbook.divideData(data)[0];
        var bottomData = flipbook.divideData(data)[1];

        var leftButtons = document.querySelectorAll(".left");
        var rightButtons = document.querySelectorAll(".right");

        // when clicking on a left button
        for (var i=0; i < leftButtons.length; i++) {
            leftButtons[i].addEventListener("click", function() {
                if (event.target.getAttribute("class") === "left top") {
                    flipbook.flip("left", "top", topData);
                } else {
                    flipbook.flip("left", "bottom", bottomData);
                }
            });
        }

        // when clicking on a right button
        for (var i=0; i < rightButtons.length; i++) {
            rightButtons[i].addEventListener("click", function() {
                if (event.target.getAttribute("class") === "right top") {
                    flipbook.flip("right", "top", topData);
                } else {
                    flipbook.flip("right", "bottom", bottomData);
                }
            });
        }

    },

    flip: function flip (direction, section, data) {
        var pageImages = flipbook.getPageImages(data);
        var relatedProductImages = flipbook.getRelatedProductImages(data);
        var relatedProductLinks = flipbook.getRelatedProductLinks(data);

        var currentIndex = parseInt(document.querySelector("#" + section + "-image").getAttribute("class"));

        var nextIndex = flipbook.determineNextPage(currentIndex, relatedProductImages, direction); // index number of next flipbook page

        // inserts relevant page and related products
        flipbook.insertPage(section, nextIndex, pageImages);
        flipbook.insertRelatedProducts(relatedProductImages[nextIndex], relatedProductLinks[nextIndex], section);

    },

    insertPage: function insertPage(section, nextIndex, pageImages) {
        var pageNode = document.querySelector("#" + section + "-image");

        // removes class if one is assigned
        if (pageNode.classList) {
            pageNode.setAttribute("class", "");
        }

        // inserts the next page image
        pageNode.setAttribute("src", "/static/public/images/" + pageImages[nextIndex]);

        // assigns index number of next page as a class
        pageNode.setAttribute("class", nextIndex);


    },

    insertRelatedProducts: function insertRelatedProducts(images, links, section) {
        var productClass = section === "top" ? "top-product" : "bottom-product";
        var productNodes = document.querySelectorAll("." + productClass);
        var imageNodes = document.querySelectorAll("." + productClass + "-image");

        // inserts new related products
        for (var i=0; i < productNodes.length; i++) {

            // update link
            productNodes[i].setAttribute("href", links[i]);

            // update image
            imageNodes[i].setAttribute("src", "/static/public/images/" + images[i]);

        }

    },

    determineNextPage: function determineNextPage(currentIndex, images, direction) {
        var nextIndex;

        // determines index number of next flipbook page
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
    },

    getPageImages: function getPageImages(data) {
        var pageImages = [];

        // pushes flipbook pages for section to array
        data.forEach(function(page) {
            pageImages.push(page.image);
        });

        return pageImages;
    },

    getRelatedProductImages: function getRelatedProductImages(data) {
        var relatedProductImages = [];

        // pushes related product images to array
        data.forEach(function(page) {
            relatedProductImages.push([page["related-image-1"], page["related-image-2"], page["related-image-3"]]);
        });

        return relatedProductImages;
    },

    getRelatedProductLinks: function getRelatedProductLinks(data) {
        var relatedProductLinks = [];

        // pushes related product links to array
        data.forEach(function(page) {
            relatedProductLinks.push([page["related-url-1"], page["related-url-2"], page["related-url-3"]]);
        });

        return relatedProductLinks;
    }

};

flipbook.initialise();
