const {wait} = require('./helpers');
const selectors = require('./selectors');

class HubbleController {
    constructor(page) {
        this.page = page;
    }

    async getQUSJsonResponseForTreatmentAndQuery (customerId, query) {
        await this.page.goto("http://av-hubble.aka.amazon.com/"); 

        let error = true;

        while(error) {
            // await this.page.setElementWithValue(selectors.customerId, customerId);
            await this.page.setElementWithValue(selectors.query, query);
            await this.page.click(".a-button-input");
            await wait(1000);  
            error = await this.hasErrorContainer();
        }

        await this.page.waitForSelector(selectors.jsonResponse);
        const jsonResponseString = await this.page.getElementValue(selectors.jsonResponse)
        return JSON.parse(jsonResponseString.trim().substring(4));
    }

    async hasErrorContainer() {
        return this.page.evaluate(() => document.querySelector(".a-alert-container"));
    }
}

module.exports = HubbleController;