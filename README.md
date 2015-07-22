# se2po
Convert Selenium IDE html tables into page object stubs to be used for handwritten tests

Installation:
git clone https://github.com/mcherryleigh/se2po.git
npm install

Basic Usage:
node se2po.js
--file "some selenium ide html table test file"
--type "ide/php/js/etc. as defined in templates/*.json files
--help

Ex: node se2po.js --file ide/plugin_output/google_example --type php