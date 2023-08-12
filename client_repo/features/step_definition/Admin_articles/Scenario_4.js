const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;

Given('an admin is in the \'Chat\' tab of the admin dashboard', async () => {
  browser = await puppeteer.launch({headless: false , slowMo:50});
  page = await browser.newPage();
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/');
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector)
  });

  When('the admin hovers over the \'Articles\' tab now', async () => {
    await page.waitForSelector('[data-testid="articles-tab"]');
    await page.hover('[data-testid="articles-tab"]');
  });

  When('clicks on the \'Create Article\' button', async () => {
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/articles/new');
  });


  Then('the admin should see a form to create articles', async () => {
    const currentUrl = await page.url();
    expect(currentUrl).to.equal('https://admindashboard-xnabw36hha-as.a.run.app/articles/new');
  });
