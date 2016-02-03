$(document).ready(function() {
    runFlipBook();
    getSectionData("tops");
    getSectionData("bottoms");

});

var topImageIndex = 0;
var bottomImageIndex = 0;

function runFlipBook () {

    // when clicking on a left button
    $(".top").click(function() {
        if ($(".top").hasClass("left")) {
            flipTop("left");
        } else {
            flipTop("right");
        }

    });

    // when clicking on a right button
    $(".bottom").click(function() {
        if ($(".bottom").hasClass("left")) {
            flipBottom("left");
        } else {
            flipBottom("right");
        }

    });
}

function flipTop (direction) {
    var topImages = ["top1.jpg", "top2.jpg", "top3.jpg"];

    if (direction === "left") {
        if (topImageIndex === 0) {
            topImageIndex = topImages.length - 1;
        } else {
            topImageIndex = topImageIndex - 1;
        }

        $("#top-image").attr("src", "/static/public/images/" + topImages[topImageIndex]);

    } else {
        if (topImageIndex === topImages.length - 1) {
            topImageIndex = 0;
        } else {
            topImageIndex = topImageIndex + 1;
        }

        $("#top-image").attr("src", "/static/public/images/" + topImages[topImageIndex]);
    }

}

function flipBottom (direction) {
    var bottomImages = ["bottom1.jpg", "bottom2.jpg"];

    if (direction === "left") {
        if (bottomImageIndex === 0) {
            bottomImageIndex = bottomImages.length - 1;
        } else {
            bottomImageIndex = bottomImageIndex - 1;
        }

        $("#bottom-image").attr("src", "/static/public/images/" + bottomImages[bottomImageIndex]);

    } else {
        if (bottomImageIndex === bottomImages.length - 1) {
            bottomImageIndex = 0;
        } else {
            bottomImageIndex = bottomImageIndex + 1;
        }

        $("#bottom-image").attr("src", "/static/public/images/" + bottomImages[bottomImageIndex]);
    }

}

function getSectionData (section) {

    $.ajax('/api/' + section, {
        success: function(data) {
            console.log(data);
        }
    });
}
