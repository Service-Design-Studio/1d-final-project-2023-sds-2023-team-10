const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;
let originalTabsCount;

Given('an admin is in the \'View Articles\' page of the admin dashboard',{ timeout: 60 * 1000 }, async () => {
    browser = await puppeteer.launch({headless: false , slowMo:50 });
    page = await browser.newPage();
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/');
    await page.type('#normal_login_email', 'admin');
     await page.type('#normal_login_password', 'admin');
     const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
     await page.click(loginButtonSelector)
     await page.waitForSelector('[data-testid="articles-tab"]');
    await page.hover('[data-testid="articles-tab"]');
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/articles');
});

When('the admin clicks on the \'Visit Link\' button', { timeout: 60 * 1000 },async () => {
  await page.waitForSelector('[data-testid="visit-article-button"]');
  await page.click('[data-testid="visit-article-button"]');
});


Then('the admin is redirected to the article\'s original URL in a new browser tab', async () => {
    const currentUrl = await page.url();
    expect(currentUrl).to.equal('https://admindashboard-xnabw36hha-as.a.run.app/articles');
});
