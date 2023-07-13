const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given("a user is at the start page", async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(`http://localhost:3000/`);
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
  await page.click('.app_skipQButton__5sus0');
});

Then("the user will land on the Home page",  async () => {
  const expectedChatTitle = 'Hello, User1 !'
  await page.waitForSelector('.css-1dklj6k');
  const chatTitle = await page.$eval('.css-1dklj6k', elem => elem.textContent.trim());
  if (chatTitle !== expectedChatTitle.trim()) {
      throw new Error(`Expected chat title "${expectedChatTitle}", but got "${chatTitle}" instead`);
  }
  // const homeTitle = await page.$eval('.css-1dklj6k', elem => elem.textContent.trim());
  // console.log(homeTitle)
  // expect(homeTitle).toBe("Hello, User1!");
});