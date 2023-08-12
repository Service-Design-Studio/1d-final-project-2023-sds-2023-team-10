const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("the counsellor will receives the messages from Alice", { timeout: 60 * 1000 },async () => {
  browser = await puppeteer.launch({headless: false , slowMo: 50});
  page = await browser.newPage();
  await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector)
});

Given("the counsellor will see from the sentiment analysis data that she is in a good mood", { timeout: 60 * 1000 },async () => {
  await page.waitForSelector("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
  await page.click("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
  });

Then("the counsellor will send her a reply", { timeout: 60 * 1000 },async () => {
    await page.waitForSelector(
        "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea" , { timeout: 5000 }
      );

      // Click on the text box
      await page.click(
        "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea"
      );

      await page.type(
        "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
        "That's great Alice!"
      );

      await page.keyboard.press('Enter');

      await page.type(
        "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
        "Glad I can you help"
      );


      await page.keyboard.press('Enter');
});
