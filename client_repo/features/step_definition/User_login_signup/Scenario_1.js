const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;

// #2 Scenario: New user tries to login
Given('a new user is on the login page', async () => {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000//login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
});

When('the new user fills in the fields with any email and password', async () => {
    // replace with your field selectors and input data
    await page.type('#email', 'newuser@gmail.com');
    await page.type('#password', 'newuserpassword');
});

When('clicks on the "Log In" button', async () => {
    const loginButtonSelector = '[data-testid="login-button"]';  // replace with your button selector
    await page.click(loginButtonSelector);
});

Then('the new user will be shown an error message', async () => {
    console.log("Current Page URL: ", await page.url());
    const createArticlePageUrl = 'http://localhost:3000/login';


    expect(await page.url()).to.equal(createArticlePageUrl);
});

