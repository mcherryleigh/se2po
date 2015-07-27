var async = require('async');
var format = require('string-format');
var beautify = require('js-beautify').js_beautify;
var beautify_html = require('js-beautify').html;
var fs = require('fs');
var tabletojson = require('tabletojson');

format.extend(String.prototype, {
    upper: function(s) { return s.toUpperCase() },
    lower: function(s) { return s.toLowerCase() },
    cap: function(s) { return s.charAt(0).toUpperCase() + s.slice(1) },
    uncap: function(s) { return s.charAt(0).toLowerCase() + s.slice(1) },
    lastSegment: function(s) { return s.substring(s.lastIndexOf("/") + 1, s.length)},
    lastSegmentCap: function(s) {
        var last = s.substring(s.lastIndexOf("/") + 1, s.length);
        return last.charAt(0).toUpperCase() + last.slice(1)
    },
    lastSegmentUncap: function(s) {
        var last = s.substring(s.lastIndexOf("/") + 1, s.length);
        return last.charAt(0).toLowerCase() + last.slice(1)
    },
    lastSegmentHumanize: function(s) {
        var last = s.substring(s.lastIndexOf("/") + 1, s.length);
        var frags = last.split('_');
        for (i=0; i<frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        var result = frags.join('');
        return result.charAt(0).toUpperCase() + result.slice(1)
    }
});

var outputRules = [];
outputRules.push(require('./templates/protractor.json'));
outputRules.push(require('./templates/addVerificationIDE.json'));
outputRules.push(require('./templates/mochaTestStub.json'));
outputRules.push(require('./templates/codeceptionSelector.json'));
outputRules.push(require('./templates/codeceptionStub.json'));
var startOfOutput = function (args, outputRules) {
    return outputRules.start.format(args)
};

var endOfOutput = function(args, outputRules) {
    return outputRules.end.format(args)
};

var onOpenCreateGetSelector = function(args, outputRules) {
    return outputRules.onOpen.format(args);
};

var onStoreElements = function(args, outputRules) {
    if (args.selector.substring(0, 2) == '//') {
        return outputRules.onStoreElementPresent.xpath.format(args)
    } else if (args.selector.substring(0, 6) == 'xpath=') {
        args.selector = args.selector.slice(6);
        return outputRules.onStoreElementPresent.xpath.format(args)
    } else if (args.selector.substring(0, 4) == 'css=') {
        args.selector = args.selector.slice(4);
        return outputRules.onStoreElementPresent.css.format(args)
    } else if (args.selector.substring(0, 3) == 'id=') {
        args.selector = args.selector.slice(3);
        return outputRules.onStoreElementPresent.id.format(args)
    } else if (args.selector.substring(0, 5) == 'link=') {
        args.selector = args.selector.slice(5);
        return outputRules.onStoreElementPresent.linkText.format(args)
    } else if (args.selector.substring(0, 5) == 'name=') {
        args.selector = args.selector.slice(5);
        return outputRules.onStoreElementPresent.name.format(args)
    } else {
        return outputRules.onStoreElementPresent.else.format(args)
    }
};

var processRules = function (args, outputRules){
    var output = '';
    var contents = fs.readFileSync(args.file).toString();
    var tableAsJson = tabletojson.convert(contents);
    var parsedTable = eval(tableAsJson[0]);
    parsedTable.forEach(function (row) {
        args.action = row[0];
        args.selector = row[1];
        args.value = row[2];
        if (args.action == 'open') {
            output += onOpenCreateGetSelector(args, outputRules);
        } else if (args.action == 'storeElementPresent') {
            output += "\n" + onStoreElements(args, outputRules);
        } else {
            if(args.action != args.file.substring(args.file.lastIndexOf("/") + 1, args.file.length)){
                output += "\n\/\/WARNING: unexpected values in rows were not added to output file\n" + JSON.stringify(row);
            }
        }
    });
    return output;
};

var argv = require('yargs')
    .usage('Process Selenium IDE html table files and output page objects, etc. in other languages')
    .alias('f', 'file')
    .describe('f', 'the file you want to process')
    .example('$0 -f someFile -t [ide,js,php,etc.]', 'process selectors/footer and generate files in the given format')
    .alias('t', 'type')
    .default('t', "ide")
    .describe('t', 'The type of output file you expect')
    .help('h')
    .alias('h', 'help')
    .argv;

var filteredRules = outputRules.filter(function( obj ) {
    if(argv.type=="all") return obj;
    else return obj.runsWith == argv.type;
});

//console.log(argv);

if(argv.file !== null && typeof argv.type !== null) {
    async.forEachOfSeries(filteredRules, function(rule, key, callback){
        var obj = {
            file: argv.file
        };
        if(rule.beautify.type=='none'){
            var fileData = startOfOutput(obj, rule) + processRules(obj, rule) + endOfOutput(obj, rule);
            fs.writeFile(rule.savedTo.format(obj), fileData, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }
        else if(rule.beautify.type=='js') {
            var fileData = beautify(startOfOutput(obj, rule) + processRules(obj, rule) + endOfOutput(obj, rule), rule.beautify);
            fs.writeFile(rule.savedTo.format(obj), fileData, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        } else if (rule.beautify.type=='html') {
            var fileData = beautify_html(startOfOutput(obj, rule) + processRules(obj, rule) + endOfOutput(obj, rule), rule.beautify);
            fs.writeFile(rule.savedTo.format(obj), fileData, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }
        callback(null);
    });
} else {
    if(argv.type){
        console.log('You must enter a file name for a Selenium IDE html table test')
    } else if(argv.file){
        console.log('You must enter a type for a Selenium IDE html table test')
    }
}