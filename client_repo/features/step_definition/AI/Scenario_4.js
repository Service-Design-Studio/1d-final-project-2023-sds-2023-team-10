const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given('a new counsellor is assigned to Sarah', { timeout: 60 * 1000 },async function () {
  browser = await puppeteer.launch({headless: false , slowMo: 50});
  page = await browser.newPage();
  await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector); // Triggers navigation
});

When('the counsellor is in the chat with Sarah',{ timeout: 60 * 1000 }, async function () {
    await page.waitForSelector("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
    await page.click("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
  });

  When('the new counsellor wants to see a summary of the chat',{ timeout: 60 * 1000 }, async function () {
    await page.waitForSelector("#__next > section > main > div > div:nth-child(2) > div > div.ant-card-head > div > div > div > button" ,);
    await page.click("#__next > section > main > div > div:nth-child(2) > div > div.ant-card-head > div > div > div > button");
    await page.waitForSelector("#__next > section > main > div > div:nth-child(2) > div > div.ant-card-head > div > div > div > button" , { timeout: 5000 });
  });

  Then('a summary will be shown to the new counsellor',{ timeout: 60 * 1000 }, async function () {
    await page.waitForSelector("body > div:nth-child(10) > div > div.ant-popover-content > div > div > div > button" ,);
    await page.click("body > div:nth-child(10) > div > div.ant-popover-content > div > div > div > button");
    await page.waitForSelector("body > div:nth-child(10) > div > div.ant-popover-content > div > div > div > button" , { timeout: 10000 });
  });

