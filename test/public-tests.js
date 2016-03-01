var expect = chai.expect;

var mockFlipbookData = [
    { 'related-url-2': 'http://www.lyst.com/clothing/jonathan-simkhai-geometric-pattern-paneled-skirt-grey-1/',
    image: 'bottom-8.jpg',
    section: 'bottom',
    'related-url-1': 'http://www.lyst.com/clothing/guess-calf-length-skirt-with-geometric-pattern-black-multi/',
    id: '8',
    'related-image-1': 'bottom-8-related-1.jpeg',
    'related-image-3': 'bottom-8-related-3.jpeg',
    'related-image-2': 'bottom-8-related-2.jpeg',
    'related-url-3': 'http://www.lyst.com/clothing/boss-patterned-skirt-in-a-wool-blend-with-silk-vanida/' },
  { 'related-url-2': 'https://www.lyst.co.uk/clothing/stella-mccartney-leopard-crew-neck-jumper-black/',
    section: 'top',
    'related-url-1': 'https://www.lyst.co.uk/clothing/stella-mccartney-horse-print-sweater/',
    'related-url-3': 'https://www.lyst.co.uk/clothing/guess-aztec-print-sweater-black/',
    image: 'top-1.jpg',
    id: '1',
    'related-image-1': 'top-1-related-1.jpeg',
    'related-image-2': 'top-1-related-2.jpeg',
    'related-image-3': 'top-1-related-3.jpeg' }
];

var mockImagesData = ["image-one.jpg", "image-two.jpg", "image-three.jpg", "image-four.jpg", "image-five.jpg"];

describe('flipbook', function() {

    describe('#divideData()', function () {
        var returnedData = divideData(mockFlipbookData);

        it('returns an array', function () {
            expect(Array.isArray(returnedData)).to.equal(true);
        });

        it('length is 2', function () {
            expect(returnedData.length).to.equal(2);
        });

        it('array consists of objects', function () {
            expect(typeof returnedData[0]).to.equal("object");
        });

    });


    describe('#loadFirstPage()', function () {
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

    describe('#insertRelatedProducts()', function () {
        it('src attribute of first related product image is set to something other than #', function () {
            var pageImageSrc = document.querySelector(".top-product-image").getAttribute("src");

             expect(pageImageSrc).to.not.equal("#");
        });

        it('href attribute of related product is set to something other than #', function () {
            var relatedLink = document.querySelector(".top-product").getAttribute("href");

             expect(relatedLink).to.not.equal("#");
        });
    });

    describe('#determineNextPage()', function () {
        it('returns a number', function () {
            var nextPageNumber = determineNextPage(1, mockImagesData, "left");

            expect(isNaN(nextPageNumber)).to.equal(false);
        });

        it('returns a number different to that supplied as parameter', function () {
            var inputNumber = arguments[0];
            var nextPageNumber = determineNextPage(1, mockImagesData, "left");

            expect(inputNumber).to.not.equal(nextPageNumber);
        });

    });

    describe('#getPageImages()', function () {
        it('returns an array', function () {
            var pageImages = getPageImages(mockFlipbookData);

            expect(Array.isArray(pageImages)).to.equal(true);
        });

    });

    describe('#getRelatedProductImages()', function () {
        var relatedProductImages = getRelatedProductImages(mockFlipbookData);

        it('returns an array', function () {
            expect(Array.isArray(relatedProductImages)).to.equal(true);
        });

        it('array consists of arrays', function () {
            expect(Array.isArray(relatedProductImages[0])).to.equal(true);
        });

    });

    describe('#getRelatedProductLinks()', function () {
        var relatedProductLinks = getRelatedProductLinks(mockFlipbookData);

        it('returns an array', function () {
            expect(Array.isArray(relatedProductLinks)).to.equal(true);
        });

        it('array consists of arrays', function () {
            expect(Array.isArray(relatedProductLinks[0])).to.equal(true);
        });

    });

});
