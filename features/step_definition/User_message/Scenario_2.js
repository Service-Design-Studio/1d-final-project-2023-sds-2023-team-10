const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('the user is on the chat page', async function () {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto('http://localhost:3000/login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
  await page.type('#email', '1');
  await page.type('#password', '2');
  const loginButtonSelector = '[data-testid="login-button"]'; // replace with your button selector
  await Promise.all([
      page.click(loginButtonSelector), // Triggers navigation
      page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
  ]);
  const messageUrl = "http://localhost:3000/messages"; // Replace with the desired URL

  await page.goto(messageUrl, { waitUntil: "networkidle0" });
});

When('the user clicks on the first chat', {timeout: 60 * 1000}, async function () {
  // Wait for the chat list to appear on the page
  const chatroomSelector = '.css-70qvj9'; // Update the selector to target the chat room element
  await page.waitForSelector(chatroomSelector);
  console.log('Valid')

  // Click the first chat in the list
  await page.click(chatroomSelector);

  // Add a delay if the element takes time to appear
  await page.waitForTimeout(1000);
});

Then('the user will be in that chat', {timeout: 60 * 1000}, async function () {
  const sendButtonSelector = 'button.chakra-button.css-eld34s';
  await page.waitForSelector(sendButtonSelector);

  const sendButtonExists = await page.$(sendButtonSelector);
  if (sendButtonExists) {
    console.log('Send button exists on the chat page');
  } else {
    console.log('Send button does not exist on the chat page');
  }
});
