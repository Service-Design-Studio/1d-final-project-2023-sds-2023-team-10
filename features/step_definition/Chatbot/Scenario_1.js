const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('a user is on the messages tab', async function () {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/messages',{ waitUntil: 'networkidle0', timeout: 60000 });
});
  
When("the user opens a chat", {timeout: 60 * 1000}, async function () {
    const chatroomSelector = '.css-70qvj9'; // Update the selector to target the chat room element
    await page.waitForSelector(chatroomSelector);
    console.log('Valid')

    // Click the first chat in the list
    await page.click(chatroomSelector);
});

When("clicks on the 'Chatbot' button on the top right", {timeout: 60 * 1000}, async function () {
    const chatroomButton = '.chakra-button css-1ajg691'; // Update the selector to target the chat room element
    await page.waitForSelector(chatroomButton);
    console.log('Valid')

    // Click the first chat in the list
    await page.click(chatroomButton);
});

// Then("the user will reach the page where they can talk to the chatbot", {timeout: 60 * 1000}, async function () {
//     // placeholder for code
// });