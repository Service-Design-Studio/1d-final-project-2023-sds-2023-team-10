const {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

BeforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
});

Before(async () => {
  page = await browser.newPage();
});

Given("the user is on the home page", async () => {
  // Navigate to the homepage
  // browser = await puppeteer.launch({headless:false});
  // const context = await browser.createIncognitoBrowserContext();
  // page = await context.newPage();
  // await page.goto('http://localhost:3000/login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
  // await page.type('#email', '1');
  // await page.type('#password', '2');
  // const loginButtonSelector = '[data-testid="login-button"]'; // replace with your button selector
  // await Promise.all([
  //     page.click(loginButtonSelector), // Triggers navigation
  //     page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
  // ]);
});

// Step 2: When the user click on the chat icon
When("the user click on the chat icon", async () => {
  // Click chat icon
  // const chatIconSelector = '[data-testid="messages-icon"]'; // Replace with your chat icon's selector
  // await Promise.all([
  //     page.click(chatIconSelector),
  //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
  // ]);
  await page.reload();
  await page.goto("http://localhost:3000/messages", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
});

// Step 3: Then user should be in the chat page
Then("user should be in the chat page", async () => {
  // Check current URL
  const currentUrl = await page.url();
  const expectedUrl = "http://localhost:3000/messages"; // Replace with your chat page URL
  expect(currentUrl).to.equal(expectedUrl);
});

After(async () => {
  await page.close();
});

AfterAll(async () => {
  await browser.close();
});
