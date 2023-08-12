const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("I have proceeded to the admin dashboard", async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
});

When("I click on the articles tab", async () => {
  const articlesTabSelector = '[data-testid="articles-tab"]';
  await page.waitForSelector(articlesTabSelector);
  await page.click(articlesTabSelector);
});

Then("I should see a list of articles", async () => {
  const articlesUrl = "http://localhost:3000/articles";
  await page.waitForNavigation();
  expect(await page.url()).to.equal(articlesUrl);

  // Close the browser after the test
  browser.close();
});
