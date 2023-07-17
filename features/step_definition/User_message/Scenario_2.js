const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

const chatElementSelector = '.chat-list-item:first-child'; // For example
const chatContentSelector = '.chat-main-content'; // For example

Given('the user is on the chat page', async function () {
  await page.goto('http://localhost:3000/messages', { waitUntil: 'networkidle0' }); // Replace with your chat page URL
});

When('the user clicks on the first chat', async function () {
  await page.waitForSelector(chatElementSelector);
  await page.click(chatElementSelector);
});

Then('the user will be in that chat', async function () {
  // Wait for chat content to be visible
  await page.waitForSelector(chatContentSelector);

  // For the sake of the example, let's say we confirm the user is in the chat
  // by checking if the chat content area is visible. You might need to
  // adjust this for your specific needs, for instance by checking if the 
  // messages of the first chat are visible.
  const isChatVisible = await page.evaluate(
    (chatContentSelector) => !!document.querySelector(chatContentSelector),
    chatContentSelector
  );

  expect(isChatVisible).to.be.true;
});