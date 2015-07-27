<?php use \WebDriverTester;

class GoogleExampleCest
{
    public function _after(\WebdriverTester $I)
    {
    }

    public function _before(\WebDriverTester $I)
    {
        $I->amOnPage('/');
    }

    public function brandingLogoShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see brandingLogo on GoogleExample');
        $I->waitForElement(GoogleExamplePage::brandingLogo, 30);
        $I->seeElement(GoogleExamplePage::brandingLogo);
    }

    public function searchTextFieldShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see searchTextField on GoogleExample');
        $I->waitForElement(GoogleExamplePage::searchTextField, 30);
        $I->seeElement(GoogleExamplePage::searchTextField);
    }

    public function searchButtonShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see searchButton on GoogleExample');
        $I->waitForElement(GoogleExamplePage::searchButton, 30);
        $I->seeElement(GoogleExamplePage::searchButton);
    }

    public function feelingLuckyShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see feelingLucky on GoogleExample');
        $I->waitForElement(GoogleExamplePage::feelingLucky, 30);
        $I->seeElement(GoogleExamplePage::feelingLucky);
    }

    public function gmailLinkShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see gmailLink on GoogleExample');
        $I->waitForElement(GoogleExamplePage::gmailLink, 30);
        $I->seeElement(GoogleExamplePage::gmailLink);
    }

    public function imagesLinkShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see imagesLink on GoogleExample');
        $I->waitForElement(GoogleExamplePage::imagesLink, 30);
        $I->seeElement(GoogleExamplePage::imagesLink);
    }

    public function gridButtonShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see gridButton on GoogleExample');
        $I->waitForElement(GoogleExamplePage::gridButton, 30);
        $I->seeElement(GoogleExamplePage::gridButton);
    }

    public function signInButtonShouldExist(\WebDriverTester $I)
    {
        $I->wantTo('see signInButton on GoogleExample');
        $I->waitForElement(GoogleExamplePage::signInButton, 30);
        $I->seeElement(GoogleExamplePage::signInButton);
    }
}