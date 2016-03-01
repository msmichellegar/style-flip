function initialise() {

    // sends http request to fetch data from redis
    var request = new XMLHttpRequest();
    request.open('GET', '/api/flipbook', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            // runs initialising functions with fetched data
            loadFirstPage(data);
            enableFlipping(data);

            // tells any curious individuals with dev tools to hire me
            console.log("Please hire me :) http://msmichellegar.github.io/");

        }
    };

    request.send();

}

function divideData(data) {
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


}

function loadFirstPage(data) {
    var dividedData = divideData(data);

    // insert page and related products for top then bottom
    for (var i=0; i < dividedData.length; i++) {
        var relatedProductImages = getRelatedProductImages(dividedData[i])[0];
        var relatedProductLinks = getRelatedProductLinks(dividedData[i])[0];

        if (i === 0) {
            insertPage("top", "0", [dividedData[i][0].image]);
            insertRelatedProducts(relatedProductImages, relatedProductLinks, "top");
        } else {
            insertPage("bottom", "0", [dividedData[i][0].image]);
            insertRelatedProducts(relatedProductImages, relatedProductLinks, "bottom");
        }

    }

    document.querySelector(".flipbook-wrapper").style.display = "block";
    document.querySelector(".collection-wrapper").style.display = "block";

}

function enableFlipping(data) {
    var topData = divideData(data)[0];
    var bottomData = divideData(data)[1];

    var leftButtons = document.querySelectorAll(".left");
    var rightButtons = document.querySelectorAll(".right");

    for (var i=0; i < leftButtons.length; i++) {
        leftButtons[i].addEventListener("click", function() {
            if (event.target.getAttribute("class") === "left top") {
                flip("left", "top", topData);
            } else {
                flip("left", "bottom", bottomData);
            }
        });
    }

    // when clicking on a right button
    for (var i=0; i < rightButtons.length; i++) {
        rightButtons[i].addEventListener("click", function() {
            if (event.target.getAttribute("class") === "right top") {
                flip("right", "top", topData);
            } else {
                flip("right", "bottom", bottomData);
            }
        });
    }

}

function flip(direction, section, data) {
    var pageImages = getPageImages(data);
    var relatedProductImages = getRelatedProductImages(data);
    var relatedProductLinks = getRelatedProductLinks(data);

    // gets index number of current flipbook page
    var currentIndex = parseInt(document.querySelector("#" + section + "-image").getAttribute("class"));

    // gets index number of next flipbook page
    var nextIndex = determineNextPage(currentIndex, relatedProductImages, direction);

    // inserts relevant page and related products
    insertPage(section, nextIndex, pageImages);
    insertRelatedProducts(relatedProductImages[nextIndex], relatedProductLinks[nextIndex], section);

}

function insertPage(section, nextIndex, pageImages) {
    var pageNode = document.querySelector("#" + section + "-image");

    // removes class if one is assigned
    if (pageNode.classList) {
        pageNode.setAttribute("class", "");
    }

    // inserts the next page image
    pageNode.setAttribute("src", "/static/public/images/" + pageImages[nextIndex]);

    // assigns index number of next page as a class
    pageNode.setAttribute("class", nextIndex);


}

function insertRelatedProducts(images, links, section) {
    var productClass = section === "top" ? "top-product" : "bottom-product";
    var productNodes = document.querySelectorAll("." + productClass);
    var imageNodes = document.querySelectorAll("." + productClass + "-image");

    // inserts new related products
    for (var i=0; i < productNodes.length; i++) {

        // updates link
        productNodes[i].setAttribute("href", links[i]);

        // updates image
        imageNodes[i].setAttribute("src", "/static/public/images/" + images[i]);

    }

}

function determineNextPage(currentIndex, images, direction) {
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
}

function getPageImages(data) {
    var pageImages = [];

    // pushes flipbook pages for section to array
    data.forEach(function(page) {
        pageImages.push(page.image);
    });

    return pageImages;
}

function getRelatedProductImages(data) {
    var relatedProductImages = [];

    // pushes related product images to array
    data.forEach(function(page) {
        relatedProductImages.push([page["related-image-1"], page["related-image-2"], page["related-image-3"]]);
    });

    return relatedProductImages;
}

function getRelatedProductLinks(data) {
    var relatedProductLinks = [];

    // pushes related product links to array
    data.forEach(function(page) {
        relatedProductLinks.push([page["related-url-1"], page["related-url-2"], page["related-url-3"]]);
    });

    return relatedProductLinks;
}

initialise();
