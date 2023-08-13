const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given('the counsellor receives the messages from Sarah',{ timeout: 60 * 1000 }, async function () {
    browser = await puppeteer.launch({headless: false , slowMo: 50});
    page = await browser.newPage();
    await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
    await page.type('#normal_login_email', 'admin');
    await page.type('#normal_login_password', 'admin');
    const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
    await page.click(loginButtonSelector); // Triggers navigation
  });

  Given('the counsellor will see from the sentiment analysis data that she is in a bad mood',{ timeout: 60 * 1000 }, async function () {
    await page.waitForSelector("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
    await page.click("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
  });

  Then('the counsellor will seek solutions to help Sarah', { timeout: 60 * 1000 },async function () {
    await page.waitForSelector(
      "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea" , { timeout: 5000 }
    );

    // Click on the text box
    await page.click(
      "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea"
    );

    await page.type(
      "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
      "Let's take it step by step Melissa, I am always here for you"
    );

    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');

    await page.type(
      "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
      "If you don't mind connecting me with your parents, I can make them understand your frustration"
    );


    await page.keyboard.press('Enter');
  });
