const { Given, When, Then} = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given("the user is on the home page", async () => {
    // Navigate to the homepage
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

// Step 2: When the user click on the chat icon
When("the user click on the chat icon", async () => {
    const messageUrl = "http://localhost:3000/messages"; // Replace with the desired URL

    await page.goto(messageUrl, { waitUntil: "networkidle0" });

    const url = await page.url();
    console.log(`The current URL is ${url}`);
  });

// Step 3: Then user should be in the chat page
Then("user should be in the chat page", async () => {
    // Check current URL
    const currentUrl = await page.url();
    const expectedUrl = "http://localhost:3000/messages"; // Replace with your chat page URL
    expect(currentUrl).to.equal(expectedUrl);
});
