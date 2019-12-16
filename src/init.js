const puppeteer = require('puppeteer');
const { readFile, writeFile } = require('./utils/fileOps');
const {wait} = require('./utils/helpers');
const PageManipulator = require('./utils/pageManipulator');
const password = "Gmlegend2@"
const csvFileName = "./comparisonResult.csv";

const HubbleController = require('./utils/hubbleController');
const AvsController = require('./utils/AvsController')

const init = async scriptData => {
    await writeFile(csvFileName, "Query, Query Understanding Diff, Score Diff, Query Action Diff\n");
    hubbleBrowser = await puppeteer.launch({
        headless: false,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        defaultViewport: null,
    });

    scriptData.hubblePage = new PageManipulator(await hubbleBrowser.newPage());

    //initiates controllers
    scriptData.hubbleController = new HubbleController(scriptData.hubblePage);

    //populate queries
    const queriesText = await readFile("queries");
    scriptData.queries = queriesText.toString().split("\n");
}

module.exports = init;