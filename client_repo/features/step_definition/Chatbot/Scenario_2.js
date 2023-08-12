const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('a user is on the chatbot page', async function () {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  // placeholder for code
});

When("the user clicks on the 'Type something' Text box below", {timeout: 60 * 1000}, async function () {
  // placeholder for code
});

When("types 'I am so stressed out'", {timeout: 60 * 1000}, async function () {
  // placeholder for code
});

When("clicks the arrow button to send message", {timeout: 60 * 1000}, async function () {
  // placeholder for code
});

When("sees the message appear in the chat", {timeout: 60 * 1000}, async function () {
  // placeholder for code
});

Then("the user receives a reply from the chatbot", {timeout: 60 * 1000}, async function () {
  // placeholder for code 
});