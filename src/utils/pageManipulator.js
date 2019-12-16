const {wait} = require('./helpers');

class PageManipulator {
    constructor(page) {
        this.page = page;
        this.keyboard = page.keyboard;
    }

    async getElementValue(selector) {
        return this.page.evaluate(({selector}) => document.querySelector(selector).textContent, {selector});
    }
    
    async setElementWithTextContent(selector, textContent) {
      return await this.page.evaluate(async ({selector, textContent}) => {
        return document.querySelector(selector).textContent = textContent;
      }, {selector, textContent})
    }
     
    async setElementWithValue(selector, value) {
        return await this.page.evaluate(async ({selector, value}) => {
            return document.querySelector(selector).value = value;
        }, {selector, value});
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async click(selector) {
        await this.page.click(selector); 
    }

    async evaluate(fn) {
        await this.page.evaluate(fn);
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }

    async selectAllTextWithinTextBox(selector) {
        await this.page.click(selector);
        await this.page.keyboard.down("Meta");
        await this.page.keyboard.press("A");
        await this.page.keyboard.up("Meta");
    }

    async pasteText(selector, pasteText) {
        await this.evaluate(async () => {
            await this.page.click(selector);
            await this.page.keyboard.down("Meta");
            await this.page.keyboard.press("V");
            await this.page.keyboard.up("Meta");
            return document.execCommand("paste");
        })
    }

    async copyFromTextBox(selector) {
        this.selectAllTextWithinTextBox(selector);
        var page = this.page;
        return await this.page.evaluate(async function({page}) {
            await page.keyboard.down("Meta");
            await page.keyboard.press("C");
            await page.keyboard.up("Meta");
            console.log("HELLO WORLD");
            const text = await navigator.clipboard.readText();
            console.log(text);
            return text;
        }, {page})
    }
}

module.exports = PageManipulator;