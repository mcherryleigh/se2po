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
        expect(ide / plugin_output / google_example.brandingLogo).to.eventually.exist;
    });
    it('should have element searchTextField', function() {
        expect(ide / plugin_output / google_example.searchTextField).to.eventually.exist;
    });
    //TODO: value "searchButton" doing action "storeElementPresent" at selector "name=btnK" was missing or not an expected selector type
    it('should have element feelingLucky', function() {
        expect(ide / plugin_output / google_example.feelingLucky).to.eventually.exist;
    });
    it('should have element gmailLink', function() {
        expect(ide / plugin_output / google_example.gmailLink).to.eventually.exist;
    });
    it('should have element imagesLink', function() {
        expect(ide / plugin_output / google_example.imagesLink).to.eventually.exist;
    });
    it('should have element gridButton', function() {
        expect(ide / plugin_output / google_example.gridButton).to.eventually.exist;
    });
    it('should have element signInButton', function() {
        expect(ide / plugin_output / google_example.signInButton).to.eventually.exist;
    });
});