const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("I have navigated to the View articles page", async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/articles");
});

When("I click on the visit article button", async () => {
  const visitArticleButtonSelector = '[data-testid="visit-article-button"]';
  await page.waitForSelector(visitArticleButtonSelector);
  await page.click(visitArticleButtonSelector);
});

Then("I should see a new window with the url of that article", async () => {
  const newPagePromise = new Promise((resolve) =>
    browser.once("targetcreated", (target) => resolve(target.page()))
  );

  const newPage = await newPagePromise;
  expect(newPage).to.not.be.null;
  const articleUrl = await newPage.url();

  // Add an example check for the article URL
  expect(articleUrl).to.include("http"); // You can also check if the article URL matches the URL fetched from the backend.

  // Close the browser after the test
  browser.close();
});
