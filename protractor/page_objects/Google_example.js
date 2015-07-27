function Google_example() {
    var route = '/';
    var brandingLogo = element(by.id("hplogo"));
    var searchTextField = element(by.id("lst-ib"));
    var searchButton = element(by.name("btnK"));
    var feelingLucky = element(by.xpath("//form[@id='tsf']/div[2]/div[3]/center/div/div/div[7]/span"));
    var gmailLink = element(by.linkText("Gmail"));
    var imagesLink = element(by.linkText("Images"));
    var gridButton = element(by.("a.gb_ga.gb_2"));
    var signInButton = element(by.id("gb_70"));
}
Google_example.prototype.get = function() {
    browser.get(route);
};
module.exports = new Google_example();