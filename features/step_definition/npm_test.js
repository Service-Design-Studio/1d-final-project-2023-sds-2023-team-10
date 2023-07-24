// const { Given, When, Then} = require('@cucumber/cucumber');
// const puppeteer = require('puppeteer');

// let browser, page;

// Given("a user is at the home page", async () => {
//   browser = await puppeteer.launch({headless:false});
//   page = await browser.newPage();
//   await page.goto(`http://localhost:3000/home`);
// });

// Then("the user sees the link to 'A life Social service agency'",  async () => {
//   const expectedSSA = 'Links to SSA'
//   await page.waitForSelector('#__next > div > div > div.py-5 > div > h3:nth-child(6)');
//   const SSALink = await page.$eval('#__next > div > div > div.py-5 > div > h3:nth-child(6)', elem => elem.textContent.trim());
//   if (SSALink !== expectedSSA.trim()) {
//       throw new Error(`Expected questionaire title "${expectedSSA}", but got "${SSALink}" instead`);
//   }
// });

// When("the user clicks on the link", async () => {
//   await page.waitForSelector('#__next > div > div > div.py-5 > div > div.chakra-card.css-o2pkxj');
//   await page.click('#__next > div > div > div.py-5 > div > div.chakra-card.css-o2pkxj');
// });

// Then("the user will be directed to the SSA website on a web browser", async () => {
//   const expectedArticleUrl = "https://www.alife.org.sg/";
//   const currentUrl = await page.url();
// });
