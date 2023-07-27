const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('user log in', async function () {
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
});

Given('user goes to message', async function () {
    const messageUrl = "http://localhost:3000/messages"; // Replace with the desired URL

    await page.goto(messageUrl, { waitUntil: "networkidle0" });
  });

Given("the user is in a chat again", {timeout: 60 * 1000}, async function () {
    const chatroomSelector = '.css-70qvj9'; // Update the selector to target the chat room element
    await page.waitForSelector(chatroomSelector);
    console.log('Valid')

    // Click the first chat in the list
    await page.click(chatroomSelector);
});

When("user types message", {timeout: 60 * 1000}, async function () {
    // Wait for the text box to appear on the page
    await page.waitForSelector('input.chakra-input.css-1fpoko8');

    // Click on the text box
    await page.click('input.chakra-input.css-1fpoko8');

    // Type the desired words in the text box
    await page.type('input.chakra-input.css-1fpoko8', "I'm scared, what should I do?");
});

Then("user clicks enter", {timeout: 60 * 1000}, async function () {
    await page.keyboard.press('Enter');
});

Then("sees the message appear on the chat", {timeout: 60 * 1000}, async function () {
    // Query all chat messages
    const chatMessages = await page.$$eval('.css-7cnh7v > .chakra-text.css-0', (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );

    // If the input message is in the list of visible messages
    const messageFound = chatMessages.includes("I'm Scared, what should I do?");

    console.log(`Message found in chat? ${messageFound}`);   // If 'I'm Scared, what should I do?' is present, it will print true else false
  });


