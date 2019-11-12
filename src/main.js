const puppeteer = require('puppeteer');
const fs = require('fs');

const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

const C = "A3MNJPYJ2YS481";
const T1 = "A31TTKNGGEXEQT";

let browser;
let page;

const selectors = {
    customerId: "#customerId",
    query: "#query",
    jsonResponse: "[data-a-name='json_tab']",
}

const customerId = {
    T1: "A31TTKNGGEXEQT",
    C: "A3MNJPYJ2YS481" 
}

const queries = ["comedy christmas hbo"];

const main = async () => {
    queries.forEach(async query => {
        const T1Response = await getJsonResponseForTreatmentAndQuery(customerId.T1, query);
        const T2Response = await getJsonResponseForTreatmentAndQuery(customerId.C, "hellooooo world");

    }) 
}

const init = async () => {
    browser = await puppeteer.launch({
        headless: false,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        defaultViewport: null,
        args: ["'--window-size=1920,1080'"]
    });
    
    page = await browser.newPage();
    await page.goto("http://av-hubble.aka.amazon.com/"); 
}

const compareResponsesAndWriteToFile = async (r1, r2) => {
    appendFile("comparisonResult.csv", "this is a test message")
}

const getJsonResponseForTreatmentAndQuery = async (customerId, query) => {
    await setElementWithValue(selectors.customerId, customerId);
    await setElementWithValue(selectors.query, query);
    await page.click(".a-button-input");
    await page.waitForSelector(selectors.jsonResponse);
    const jsonResponseString = await getElementValue(selectors.jsonResponse)
    return JSON.parse(jsonResponseString.trim().substring(4));
}








const getElementValue = async (selector) => {
    return page.evaluate(({selector}) => document.querySelector(selector).textContent, {selector});
}
 
const setElementWithValue = async (selector, value) => {
    await page.evaluate(async ({selector, value}) => {
        document.querySelector(selector).value = value;
    }, {selector, value});
}

(async () => {
    await init();
    main();
})()
