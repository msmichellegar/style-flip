var expect = chai.expect;

var mockData = [
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

describe('flipbook', function() {

    describe('#divideData()', function () {
        var returnedData = flipbook.divideData(mockData);

        it('function returns an array', function () {
            expect(Array.isArray(returnedData)).to.equal(true);
        });

        it('array length is 2', function () {
            expect(returnedData.length).to.equal(2);
        });

        it('array consists of objects', function () {
            expect(typeof returnedData[0]).to.equal("object");
        });

        it('array consists of objects', function () {
            expect(typeof returnedData[0]).to.equal("object");
        });

    });


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
