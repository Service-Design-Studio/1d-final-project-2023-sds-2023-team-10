const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;

Given("a user is at the start page", async () => {
  browser = await puppeteer.launch({headless:false });
  page = await browser.newPage();
  await page.goto(`https://clientfrontend-xnabw36hha-as.a.run.app/`);
});

When("the user clicks 'Start!'", async () => {
  await page.waitForSelector('.app_letsgoButton__fJS8_');
  await page.click('.app_letsgoButton__fJS8_');
});

When("the user clicks 'Skip for now'", async () => {
  await page.waitForSelector('.app_privacyPolicyButton__Yr4G3');
  await page.click('.app_privacyPolicyButton__Yr4G3');
});

When("the user clicks 'Skip'", async () => {
  await page.waitForSelector('.app_skipQButton__5sus0');
  await page.click('.app_skipQButton__5sus0');
});

When("the user clicks 'Skip' again", async () => {
  await page.waitForSelector('.app_skipQButton__5sus0');
  await Promise.all([
    page.click('.app_skipQButton__5sus0'), // Triggers navigation
    page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
  ]);
});

Then("the user will land on the Log in Page", async () => {
  await page.type('#email', '1');
  await page.type('#password', '2');
  const loginButtonSelector = '[data-testid="login-button"]';
  await Promise.all([
    page.click(loginButtonSelector), // Triggers navigation
    page.waitForNavigation({ waitUntil: 'networkidle0' }) // Waits until navigation finishes
  ]);

  const expectedUrl = 'https://clientfrontend-xnabw36hha-as.a.run.app/home'; // replace with your dashboard page url
  const currentUrl = await page.url();
  expect(currentUrl).to.equal(expectedUrl);
});
