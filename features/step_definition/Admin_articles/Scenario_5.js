const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;


Given("admin is in the create articles page", async () => {
  browser = await puppeteer.launch({headless:false , slowMo:50});
  page = await browser.newPage();
  // You'll replace this with your actual "Create Articles" page URL
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/');
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector)
  await page.waitForSelector('[data-testid="articles-tab"]');
  await page.hover('[data-testid="articles-tab"]');
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/articles/new');
});

When('admin clicks submit now', async () => {
  const submitSelector = '[data-testid="submit-article-button"]';
  await page.waitForSelector(submitSelector);
  await page.click(submitSelector);
});

Then("admin will still be in the create articles page", async () => {
  const currentUrl = await page.url();
  expect(currentUrl).to.equal('https://admindashboard-xnabw36hha-as.a.run.app/articles/new');
});
