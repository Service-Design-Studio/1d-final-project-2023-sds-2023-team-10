const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");
const { Keyboard } = require('puppeteer');

let browser, page;


Given("admin is in the create article page", async () => {
    browser = await puppeteer.launch({headless:false , slowMo:50});
    page = await browser.newPage();
    // You'll replace this with your actual "Create Articles" page URL
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/');
    await page.type('#normal_login_email', 'admin');
    await page.type('#normal_login_password', 'admin');
    const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
    await page.click(loginButtonSelector)
    await page.waitForSelector('[data-testid="articles-tab"]');
    await page.hover('[data-testid="articles-tab"]');
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/articles/new');
});

When('admin fill in all required fields',{ timeout: 60 * 1000 }, async function () {
  await page.type('#title', '‘Invisible’ in Malaysia: Why are people born here stateless and will the govt’s citizenship proposals fix or worsen the problem?'); // Fill in the "Article Title" input field
  await page.type('#url', 'https://www.malaymail.com/news/malaysia/2023/06/30/invisible-in-malaysia-why-are-people-born-here-stateless-and-will-the-govts-citizenship-proposals-fix-or-worsen-the-problem/76895'); // Fill in the "Article Content" input field
  await page.type('#author', 'Ida Lim'); // Select a category from the dropdown
  await page.type('#published_date', '2023-06-30' );


  await page.keyboard.press('Enter'); // Press the "Return" key

});


When('admin clicks submit', async () => {
  const submitSelector = '[data-testid="submit-article-button"]';
  await page.waitForSelector(submitSelector);
  await page.click(submitSelector);
});

Then("admin should be in the view articles page", async () => {
    await page.waitForSelector('#__next > section > main > div.flex-col.justify-center.min-h-screen.min-w-full > div > div:nth-child(1)');
    const currentUrl = await page.url();
    expect(currentUrl).to.equal('https://admindashboard-xnabw36hha-as.a.run.app/articles');
});
