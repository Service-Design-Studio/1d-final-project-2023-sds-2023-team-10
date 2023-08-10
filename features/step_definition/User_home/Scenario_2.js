const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("user is loged in again", async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/login", {
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

Given("a user is at the home page", async () => {
  const expectedUrl = "https://clientfrontend-xnabw36hha-as.a.run.app/home"; // replace with your dashboard page url
  const currentUrl = await page.url();
  expect(currentUrl).to.equal(expectedUrl);
});

Then("the user sees the link to 'A life Social service agency'", async () => {
  const expectedSSA = "aLife Social Service Agency";
  await page.waitForSelector("[data-testid='alife']");
  const SSALink = await page.$eval("[data-testid='alife']", (elem) =>
    elem.textContent.trim()
  );
  if (SSALink !== expectedSSA.trim()) {
    throw new Error(
      `Expected questionaire title "${expectedSSA}", but got "${SSALink}" instead`
    );
  }
});

When("the user clicks on the link", async () => {
  await page.waitForSelector(
    "#__next > div > div > div.py-5 > div > div.chakra-card.css-o2pkxj"
  );
  await page.click(
    "#__next > div > div > div.py-5 > div > div.chakra-card.css-o2pkxj"
  );
});

Then(
  "the user will be directed to the SSA website on a web browser",
  async () => {
    // Wait for a new target (tab) to be created
    const newTarget = await browser.waitForTarget(
      (target) => target.opener() === page.target()
    );

    // Assert that a new target (tab) is opened
    expect(newTarget).to.exist;
    console.log("opened SSA tab!");
  }
);
