const selectors = require('./selectors');
const testRequest = require('./testData');
const {wait} = require("./helpers");

class AvsController {
    constructor(page) {
        this.page = page;
    }

    async getAVSResponseForTreatmentAndQuery(customerId, query) {
        await this.page.selectAllTextWithinTextBox("#request-input-editor .ace_content");
        await this.page.keyboard.press("Backspace");
        await this.page.keyboard.type(JSON.stringify(testRequest));
        await this.page.click("#start_button");
        await wait(5000);

        const responseStr = await this.page.getElementValue("#response-headers");
        const jsonStr = responseStr.split("\n")[8];
        const avsResponse = JSON.parse(jsonStr);
        console.log(avsResponse);
        return avsResponse;
    }
}

module.exports = AvsController;