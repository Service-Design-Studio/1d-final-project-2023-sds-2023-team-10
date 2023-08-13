const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;

// #1 Scenario: Viewing articles but no articles were added
Given('an admin lands in the admin dashboard for the first time',{ timeout: 60 * 1000 }, async () => {
  browser = await puppeteer.launch({headless: false , slowMo:50});
  page = await browser.newPage();
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/');
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector)
});

When('the admin hovers over the \'Articles\' tab', async () => {
  await page.waitForSelector('[data-testid="articles-tab"]');
  await page.hover('[data-testid="articles-tab"]');
});

When('clicks on the \'View Articles\' button',async () => {
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/articles');
});

Then('the admin should see the text \'You have no articles, please create a new article!\'', async () => {
    const currentUrl = await page.url();
  expect(currentUrl).to.equal('https://admindashboard-xnabw36hha-as.a.run.app/articles');
});

Then('the admin should see a list of all the articles that all admins have added to the page', async () => {
  const selector = '#__next > section > main > div.flex-col.justify-center.min-h-screen.min-w-full > div > div:nth-child(1)';
  await page.waitForSelector(selector);
  await page.click(selector)
});
