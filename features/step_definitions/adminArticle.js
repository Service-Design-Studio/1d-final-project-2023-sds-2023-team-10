const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

let browser;
let page;
let originalTabsCount;

Before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

// Scenario: Viewing articles but no articles were added
Given('an admin lands in the admin dashboard for the first time', async () => {
  await page.goto('http://localhost:3000');
});

Given('is in the \'Chat\' tab', async () => {
  await page.click('[data-testid="chat-tab"]');
});

When('the admin hovers over the \'Articles\' button', async () => {
  await page.hover('[data-testid="articles-tab"]');
});

When('clicks on the \'View Articles\' button', async () => {
  await page.click('[data-testid="view_articles-tab"]');
});

Then('the admin should see the text \'You have no articles, please create a new article!\'', async () => {
  const message = await page.$('.no-articles-message');
  const messageText = await message.evaluate(node => node.innerText);
  expect(messageText).to.equal('You have no articles, please create a new article!');
});

// Scenario: Viewing 'Articles' tab with articles added
Given('an admin lands in the admin dashboard for the first time', async () => {
    await page.goto('http://localhost:3000');
  });

  Given('is in the \'Chat\' tab', async () => {
    await page.click('[data-testid="chat-tab"]');
  });

  When('the admin hovers over the \'Articles\' button', async () => {
    await page.hover('[data-testid="articles-tab"]');
  });

  When('clicks on the \'View Articles\' button', async () => {
    await page.click('[data-testid="viewarticles-tab"]');
  });

  Then('the admin should see a list of all the articles that all admins have added to the page', async () => {
    const articles = await page.$$('.article');
    expect(articles.length).to.be.above(0);
  });

// Scenario: Opening one of the articles listed in the 'Articles' tab
Given('an admin is in the \'View Articles\' page of the admin dashboard', async () => {
    await page.goto('http://localhost:3000/articles');
    originalTabsCount = (await browser.pages()).length;
  });

  When('the admin clicks on the \'Visit Link\' button', async () => {
    const button = await page.$('[data-testid="visit-article-button"]');
    expect(button).to.not.be.null;
    await button.click();
  });

  Then('the admin is redirected to the article\'s original URL in a new browser tab', async () => {
    const newTabsCount = (await browser.pages()).length;
    expect(newTabsCount).to.be.equal(originalTabsCount + 1);
    const newPage = (await browser.pages())[newTabsCount - 1];
    const newPageUrl = await newPage.url();
    expect(newPageUrl).to.include('https://');
  });
