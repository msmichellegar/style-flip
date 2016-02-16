var expect = chai.expect;

describe('flipbook', function() {
    describe('#addFirstPage()', function () {
        it('src attribute of related product image is set to something other than #', function () {
            var relatedImageSrc = document.querySelector(".top-product-image").getAttribute("src");

             expect(relatedImageSrc).to.not.equal("#");
        });

        it('href attribute of related product is set to something other than #', function () {
            var relatedLink = document.querySelector(".top-product").getAttribute("href");

             expect(relatedLink).to.not.equal("#");
        });

        it('.flipbook-wrapper "display" property is set to "block"', function () {
            var flipbookDisplay = document.querySelector(".flipbook-wrapper").style.display;

             expect(flipbookDisplay).to.equal("block");
        });

        it('.collection-wrapper "display" property is set to "block"', function () {
            var collectionDisplay = document.querySelector(".collection-wrapper").style.display;

             expect(collectionDisplay).to.equal("block");
        });

    });

    describe('#insertPage()', function () {
        it('src attribute of flipbook page image is set to something other than #', function () {
            var pageImageSrc = document.querySelector("#top-image").getAttribute("src");

             expect(pageImageSrc).to.not.equal("#");
        });

    });
});
