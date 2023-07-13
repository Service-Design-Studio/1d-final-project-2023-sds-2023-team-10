const { Given, When, Then} = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given("a user is on the home page", async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto(`http://localhost:3000/home`);
});

Then("the user sees a recommended article section",  async () => {
  const expectedHomepg = 'Hello, User1 !'
  await page.waitForSelector('#__next > div > div > div.py-5 > div > h3.chakra-heading.mb-2.text-left.p-4.css-1dklj6k');
  const HomeTitle = await page.$eval('#__next > div > div > div.py-5 > div > h3.chakra-heading.mb-2.text-left.p-4.css-1dklj6k', elem => elem.textContent.trim());
  if (HomeTitle !== expectedHomepg.trim()) {
      throw new Error(`Expected questionaire title "${expectedHomepg}", but got "${HomeTitle}" instead`);
  }
});

Then("the user sees a 'Recommended Article' section",  async () => {
  const expectedRecommended = 'Recommended Article'
  await page.waitForSelector('#__next > div > div > div.py-5 > div > h3:nth-child(2)');
  const RecoTitle = await page.$eval('#__next > div > div > div.py-5 > div > h3:nth-child(2)', elem => elem.textContent.trim());
  if (RecoTitle !== expectedRecommended.trim()) {
      throw new Error(`Expected questionaire title "${expectedRecommended}", but got "${RecoTitle}" instead`);
  }
});

Then("the user will see a 'More Articles' Section",  async () => {
  const expectedMoreArti = 'More Articles'
  await page.waitForSelector('#__next > div > div > div.py-5 > div > h3:nth-child(4)');
  const MoreArti = await page.$eval('#__next > div > div > div.py-5 > div > h3:nth-child(4)', elem => elem.textContent.trim());
  if (MoreArti !== expectedMoreArti.trim()) {
      throw new Error(`Expected questionaire title "${expectedMoreArti}", but got "${MoreArti}" instead`);
  }
});

When("the user clicks on a the recommended article", async () => {
  await page.waitForSelector('#__next > div > div > div.py-5 > div > div.chakra-card.css-10sv9sa');
  await page.click('#__next > div > div > div.py-5 > div > div.chakra-card.css-10sv9sa');
});

Then("the user is directed to the article page on a web browser", async () => {
  const expectedArticleUrl = "https://www.malaymail.com/news/malaysia/2023/06/30/invisible-in-malaysia-why-are-people-born-here-stateless-and-will-the-govts-citizenship-proposals-fix-or-worsen-the-problem/76895";
  const currentUrl = await page.url();
});