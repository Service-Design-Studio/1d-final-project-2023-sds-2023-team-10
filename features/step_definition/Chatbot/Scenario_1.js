const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('a user is on the messages tab', async function () {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    // placeholder for code
  });
  
When("the user opens a chat", {timeout: 60 * 1000}, async function () {
    // placeholder for code
});

When("clicks on the 'Chatbot' button on the top right", {timeout: 60 * 1000}, async function () {
    // placeholder for code
});

Then("the user will reach the page where they can talk to the chatbot", {timeout: 60 * 1000}, async function () {
    // placeholder for code
});