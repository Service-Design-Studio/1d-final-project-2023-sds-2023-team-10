const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given("a user is at the Take short questionaire page",{ timeout: 10000 }, async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(`https://clientfrontend-xnabw36hha-as.a.run.app/`);
});

When("the user clicks 'Skip for now'",  async () => {
  await page.waitForSelector('.skipButton');
  await page.click('.skipButton');
});

Then("the user will land on the Home page",  async () => {
  const pageTitle = await page.title();
  expect(pageTitle).toBe("Home Page");
});

Then("the user will see a generalised list of articles", async () => {
  const articleList = await page.$$('.article');
  expect(articleList.length).toBeGreaterThan(0);
});
