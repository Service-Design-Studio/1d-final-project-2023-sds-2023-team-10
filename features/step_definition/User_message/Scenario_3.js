const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given('the user is at message page', async function () {
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

When("the user selects the first chat", {timeout: 60 * 1000}, async function () {
    const chatroomSelector = '.css-70qvj9'; // Update the selector to target the chat room element
    await page.waitForSelector(chatroomSelector);
    console.log('Valid')

    // Click the first chat in the list
    await page.click(chatroomSelector);
});

When("the user clicks on the Text box", {timeout: 60 * 1000}, async function () {
    // Wait for the text box to appear on the page
    await page.waitForSelector('input.chakra-input.css-1fpoko8');

    // Click on the text box
    await page.click('input.chakra-input.css-1fpoko8');
});

When("user clicks 'send'", {timeout: 60 * 1000}, async function () {
    const sendButtonSelector = 'button.chakra-button.css-eld34s';
    await page.waitForSelector(sendButtonSelector);
    await page.click(sendButtonSelector);
});

Then("nothing will happen", {timeout: 60 * 1000}, async function () {
    // Wait for a brief moment to allow any potential actions to take place or the page to update
    await page.waitForTimeout(1000);

    // You can add additional assertions or actions based on the expected behavior
    // For example, you can check if the input field is empty after clicking "send"
    const inputFieldValue = await page.$eval(
      'input.chakra-input.css-1fpoko8',
      (input) => input.value.trim()
    );

    // Assert that the input field value is empty
    expect(inputFieldValue).to.equal('');

    // You can also add more assertions or actions to validate that the expected behavior is achieved
    // based on your application's functionality and requirements

  });

