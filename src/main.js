const csvFileName = "comparisonResult.csv";
const interpretationsResponseComparator = require('./utils/interpretationsResponseComparator');
const {wait} = require("./utils/helpers")
const { appendFile } = require('./utils/fileOps');

const init = require('./init');

let scriptData = {
    customerId : {
        T1: "A31TTKNGGEXEQT",
        C: "ACNIA9B3ANO6A" 
    },
    queries:[]
};

const main = async () => {
    for(var i = 0; i < scriptData.queries.length; i++) {
        const query = scriptData.queries[i];
        const {interpretations: T1_interpretations} = await scriptData.hubbleController.getQUSJsonResponseForTreatmentAndQuery(scriptData.customerId.T1, query);
        const {interpretations: C_interpretations} = await scriptData.hubbleController.getQUSJsonResponseForTreatmentAndQuery(scriptData.customerId.C, query);
        
        await compareResultsAndAppendToCSV(T1_interpretations, C_interpretations, query);
    } 
}

const compareResultsAndAppendToCSV = async (T1_interpretations, C_interpretations, query) => {
    const qusDiff = await interpretationsResponseComparator.getQUSResponsesDiffString(T1_interpretations, C_interpretations);
    const line = [query, qusDiff].join(",") + "\n";
    await appendFile(csvFileName, line);
}

(async () => {
    await init(scriptData);
    await main();
})()
