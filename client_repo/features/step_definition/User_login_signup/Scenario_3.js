const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;


Given('user is on the log in page', async () => {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000//login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
});

When('user enters correct email', async () => {
    // replace with your field selectors and input data
    await page.type('#email', '1');
});

When('user enters correct password', async () => {
    // replace with your field selectors and input data
    await page.type('#password', '2');
});

When('user clicks on log in', async () => {
    const loginButtonSelector = '[data-testid="login-button"]'; // replace with your button selector

    await Promise.all([
        page.click(loginButtonSelector), // Triggers navigation
        page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
    ]);
});

Then('user will be directed to the homepage', async () => {
    const expectedUrl = 'http://localhost:3000/home'; // replace with your dashboard page url
    const currentUrl = await page.url();
    expect(currentUrl).to.equal(expectedUrl);
});
