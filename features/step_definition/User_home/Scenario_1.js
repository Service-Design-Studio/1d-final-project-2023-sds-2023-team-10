const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("user is loged in", async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/login", {
    waitUntil: "networkidle0",
    timeout: 60000,
  }); // replace with your login/signup page url
  await page.type("#email", "1");
  await page.type("#password", "2");
  const loginButtonSelector = '[data-testid="login-button"]'; // replace with your button selector
  await Promise.all([
    page.click(loginButtonSelector), // Triggers navigation
    page.waitForNavigation({ waitUntil: "networkidle0" }), // Waits until navigation finishes
  ]);
});

Given("a user is on the home page", async () => {
  const expectedUrl = "http://localhost:3000/home"; // replace with your dashboard page url
  const currentUrl = await page.url();
  expect(currentUrl).to.equal(expectedUrl);
});
Then("the user sees a 'Recommended Article' section", async () => {
  const expectedRecommended = "Recommended Article";
  await page.waitForSelector("[data-testid='recommendedarticle']");
  const RecoTitle = await page.$eval(
    "[data-testid='recommendedarticle']",
    (elem) => elem.textContent.trim()
  );
  if (RecoTitle !== expectedRecommended.trim()) {
    throw new Error(
      `Expected questionaire title "${expectedRecommended}", but got "${RecoTitle}" instead`
    );
  }
});

Then("the user will see a 'More Articles' Section", async () => {
  const expectedMore = "More Articles";
  await page.waitForSelector("[data-testid='morearticle']");
  const MoreTitle = await page.$eval("[data-testid='morearticle']", (elem) =>
    elem.textContent.trim()
  );
  if (MoreTitle !== expectedMore.trim()) {
    throw new Error(
      `Expected questionaire title "${expectedMore}", but got "${MoreTitle}" instead`
    );
  }
});
When("the user clicks on a the recommended article", async () => {
  await page.waitForSelector(
    "#__next > div > div > div.py-5 > div > div.chakra-card.css-10sv9sa"
  );
  await page.click(
    "#__next > div > div > div.py-5 > div > div.chakra-card.css-10sv9sa"
  );
});

Then("the user is directed to the article page on a web browser", async () => {
  const expectedArticleUrl =
    "https://www.malaymail.com/news/malaysia/2023/06/30/invisible-in-malaysia-why-are-people-born-here-stateless-and-will-the-govts-citizenship-proposals-fix-or-worsen-the-problem/76895";
  const currentUrl = await page.url();
});
