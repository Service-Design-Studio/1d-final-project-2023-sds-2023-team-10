const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser;
let page;

// #3 Scenario: New user successfully creates new account
Given('a new user is on the sign up page', async () => {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/signup'); // replace with your signup page url
});

Given('fills in the necessary details for signing up', async () => {
    // replace with your field selectors and input data
    await page.type('#email', 'newuser@gmail.com');
    await page.type('#password', 'newuserpassword');
});

When('the new user clicks sign up', async () => {
    const signupButtonSelector = '[data-testid="signup-button"]'; // replace with your button selector

    // Verify that the button is present
    await page.waitForSelector(signupButtonSelector);
    const signupButton = await page.$(signupButtonSelector);
    expect(signupButton).to.exist;
});

Then('the new user will be directed to the "Welcome" page', async () => {
    const expectedUrl = 'http://localhost:3000/signup'; // replace with your dashboard page url
    const currentUrl = await page.url();
    expect(currentUrl).to.equal(expectedUrl);
});
