var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var google_example = require('./../../page_objects/google_example.js');
before(function() {
    google_example.get()
});
describe('The ide/plugin_output/google_example', function() {
    it('should have element brandingLogo', function() {
        expect(google_example.brandingLogo).to.eventually.exist;
    });
    it('should have element searchTextField', function() {
        expect(google_example.searchTextField).to.eventually.exist;
    });
    it('should have element searchButton', function() {
        expect(google_example.searchButton).to.eventually.exist;
    });
    it('should have element feelingLucky', function() {
        expect(google_example.feelingLucky).to.eventually.exist;
    });
    it('should have element gmailLink', function() {
        expect(google_example.gmailLink).to.eventually.exist;
    });
    it('should have element imagesLink', function() {
        expect(google_example.imagesLink).to.eventually.exist;
    });
    it('should have element gridButton', function() {
        expect(google_example.gridButton).to.eventually.exist;
    });
    it('should have element signInButton', function() {
        expect(google_example.signInButton).to.eventually.exist;
    });
});