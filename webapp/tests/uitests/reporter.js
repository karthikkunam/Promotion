"use strict";

var reporter = require("cucumber-html-reporter");

var options = {
    theme: "bootstrap",
    name: "7BOSS E2E Tests",
    jsonFile: "src/client/tests/uitests/reporter/cucumber_reporter.json",
    output: "src/client/tests/uitests/reporter/cucumber_reporter.html",
    reportSuiteAsScenarios: true,
    storeScreenShots:true,
    launchReport: true
};
 
reporter.generate(options);