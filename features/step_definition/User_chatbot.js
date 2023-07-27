const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given("the user is on the chatbot page", async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto('http://localhost:3000/login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
  await page.type('#email', '1');
  await page.type('#password', '2');
  const loginButtonSelector = '[data-testid="login-button"]'; // replace with your button selector
  await Promise.all([
    page.click(loginButtonSelector), // Triggers navigation
    page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
  const expectedUrl = 'http://localhost:3000/home'; // replace with your dashboard page url
  const currentUrl = await page.url();
  expect(currentUrl).to.equal(expectedUrl);
]);
});

When("the user clicks on the 'Type something' Text box below", async () => {
  await page.waitForSelector('.type-something-textbox');
  await page.click('.type-something-textbox');
});

When("types 'I am so stressed out'", async () => {
  await page.waitForSelector('.type-something-textbox');
  await page.type('.type-something-textbox', 'I am so stressed out');
});

When("clicks the arrow button to send message", async () => {
  await page.waitForSelector('.send-button');
  await page.click('.send-button');
});

When("sees the message appear in the chat", async () => {
  await page.waitForSelector('.chat-message');
  // Implement the code to verify that the sent message appears in the chat
  // For example, you can check the content of the last message in the chat.
});

Then("the user receives a reply from the chatbot", async () => {
  await page.waitForSelector('.chatbot-reply');
  // Implement the code to verify that the chatbot has sent a reply
});
