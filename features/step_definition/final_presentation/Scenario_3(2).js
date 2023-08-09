const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given('the counsellor is able to see their conversation', { timeout: 60 * 1000 },async function () {
  browser = await puppeteer.launch({headless: false , slowMo: 50});
  page = await browser.newPage();
  await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
  await page.type('#normal_login_email', 'admin');
  await page.type('#normal_login_password', 'admin');
  const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
  await page.click(loginButtonSelector); // Triggers navigation

    const selector = '[data-testid="chatbot-tab"]';

    try {
      // Wait for the element to become available
      await page.waitForSelector(selector, { timeout: 5000 }); // Adjust the timeout as needed

      // Click the element
      await page.click(selector);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  When('the counsellor can tell that the graph flunctuates a lot',{ timeout: 60 * 1000 }, async function () {
    await page.waitForSelector("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)" ,);
    await page.click("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
    await page.waitForSelector("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)" , { timeout: 5000 });
  });

  Then('the counsellor sees that the standard deviation of the sentiment analysis is very high', { timeout: 60 * 1000 },async function () {
    await page.waitForSelector("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(3) > div > div.ant-card.ant-card-bordered.css-1q11svj > div.ant-card-head > div > div > div > div > button.ant-btn.css-1q11svj.ant-btn-primary")
    await page.click("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(3) > div > div.ant-card.ant-card-bordered.css-1q11svj > div.ant-card-head > div > div > div > div > button.ant-btn.css-1q11svj.ant-btn-primary");
    await page.waitForSelector("#__next > section > main > div.flex.flex-row.space-x-5.min-h-full > div:nth-child(3) > div > div.ant-card.ant-card-bordered.css-1q11svj > div.ant-card-head > div > div > div > div > button.ant-btn.css-1q11svj.ant-btn-primary",  { timeout: 5000 })
  });

  Then('the counsellor will step in and talk to her', { timeout: 60 * 1000 },async function () {
      await page.click(
          "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea"
        );

        await page.type(
          "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
          "Hi Melissa, this is a live counsellor talking, may I have a call with you?"
        );

        await page.keyboard.press('Enter');

        await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/login");
        await page.type("#email", "1");
        await page.type("#password", "2");
        const loginButtonSelector = "button.chakra-button.css-okncv"; // replace with your button selector
        await Promise.all([
          page.click(loginButtonSelector), // Triggers navigation
          page.waitForNavigation({ waitUntil: "networkidle0" }), // Waits until navigation finishes
        ]);

        await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/messages");

        await page.waitForSelector("#__next > div > div > div.py-5 > div > ul > li:nth-child(59) > div > span")
        await page.click("#__next > div > div > div.py-5 > div > ul > li:nth-child(59) > div > span");
    });
