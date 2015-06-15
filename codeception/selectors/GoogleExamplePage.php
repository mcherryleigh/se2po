<? php
class GoogleExamplePage {
    public static $route = '/';
    public static $brandingLogo = "['id' => 'hplogo']";
    public static $searchTextField = "['id' => 'lst-ib']";
    //TODO: value "searchButton" doing action "storeElementPresent" at selector "name=btnK" was missing or not an expected selector type
    public static $feelingLucky = "['xpath' => '//form[@id='tsf']/div[2]/div[3]/center/div/div/div[7]/span']";
    public static $gmailLink = "['link' => 'Gmail']";
    public static $imagesLink = "['link' => 'Images']";
    public static $gridButton = "['css' => 'a.gb_ga.gb_2']";
    public static $signInButton = "['id' => 'gb_70']";
}