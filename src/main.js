const puppeteer = require('puppeteer');
const fs = require('fs');

const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const recordResult = data => appendFile(csvFileName, data);

const csvFileName = "comparisonResult.csv";
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
        const {interpretations: T1_interpretations} = await getJsonResponseForTreatmentAndQuery(customerId.T1, query);
        const {interpretations: C_interpretations} = await getJsonResponseForTreatmentAndQuery(customerId.C, query);
        compareResponsesAndWriteToFile(T1_interpretations, C_interpretations, query);
    }) 
}
const compareResponsesAndWriteToFile = async (T1_interpretations, C_interpretations, query) => {
    let query_understanding_diff = "None";
    let score_diff = "None";
    let query_action_diff = "None";

    const stopWordsRemovedInterpretations = filterStopWordsEntitiesFromInterpretations(C_interpretations);

    if(stopWordsRemovedInterpretations.length !== T1_interpretations.length) {
        query_understanding_diff = `different interpretation size. T1 size: ${T1_interpretations.length}, C size (ignoring stopword entities): ${C_interpretations.length}`;
        score_diff = `N/A`;
        const line = [query, query_understanding_diff, score_diff, query_action_diff].join(',') + "\n";
        appendFile("comparisonResult.csv", line);
        return;
    }

    


    appendFile("comparisonResult.csv", "this is a test message")
}

const filterStopWordsEntitiesFromInterpretations = interpretations => interpretations.map(interpretation => {
        return interpretation.slots.filter(slot => slot.entityType === "StopWord");
    }).filter(interpretation => interpretation.slots.length === 0);


const sample = {
    "interpretations" : [ {
      "interpretationConfidence" : {
        "bin" : "high",
        "value" : 0.8035972419924183
      },
      "slots" : [ {
        "entityType" : "Channel",
        "value" : [ {
          "value" : "hbo",
          "name" : "ChannelName",
          "resolvedEntities" : [ {
            "resolvedValue" : "hbo_channel",
            "identifiers" : {
              "a9" : "hbo",
              "value" : "HBO",
              "id" : "hbo_channel"
            },
            "confidenceScore" : {
              "bin" : "high",
              "value" : 100.0
            }
          } ],
          "tokens" : [ 0 ]
        } ]
      }, {
        "entityType" : "Genre",
        "value" : [ {
          "value" : "comedy",
          "name" : "GenreName",
          "resolvedEntities" : [ {
            "resolvedValue" : "comedy_genre",
            "identifiers" : {
              "a9" : "2650366011",
              "value" : "Comedy",
              "id" : "comedy_genre"
            },
            "confidenceScore" : {
              "bin" : "high",
              "value" : 100.0
            }
          } ],
          "tokens" : [ 1 ]
        } ]
      }, {
        "entityType" : "ContentType",
        "value" : [ {
          "value" : "movie",
          "name" : "ContentTypeName",
          "resolvedEntities" : [ {
            "resolvedValue" : "movie_contentType",
            "identifiers" : {
              "a9" : "Movie",
              "value" : "Movie",
              "id" : "movie_contentType"
            },
            "confidenceScore" : {
              "bin" : "high",
              "value" : 100.0
            }
          } ],
          "tokens" : [ 2 ]
        } ]
      } ],
      "coveredTokens" : [ 0, 1, 2 ],
      "entitiesApplied" : [ "ContentType", "Channel", "Genre" ]
    } ],
    "entitiesApplied" : [ "ContentType", "Channel", "Genre" ],
    "tokens" : [ "hbo", "comedy", "movie" ]
  }

// Query	Query Understanding diff	Score diff	Query action diff



const init = async () => {
    await writeFile(csvFileName, "Query, Query Understanding Diff, Score Diff, Query Action Diff\n");
    browser = await puppeteer.launch({
        headless: false,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        defaultViewport: null,
        args: ["'--window-size=1920,1080'"]
    });
    
    page = await browser.newPage();
    await page.goto("http://av-hubble.aka.amazon.com/"); 
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
