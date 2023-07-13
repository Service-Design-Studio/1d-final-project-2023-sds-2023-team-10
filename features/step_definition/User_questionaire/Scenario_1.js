const { Given, When, Then} = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given("a user is at the welcome page", async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto(`http://localhost:3000/`);
});

When("the user clicks on 'Start!'", async () => {
  await page.waitForSelector('.app_letsgoButton__fJS8_');
  await page.click('.app_letsgoButton__fJS8_');
});

Then("the user will land on 'Take short questionaire' page",  async () => {
  const expectedQuestionaireTitle = 'Take short questionaire'
  await page.waitForSelector('.app_Start__ubJe1 > h1');
  const chatTitle = await page.$eval('.app_Start__ubJe1 > h1', elem => elem.textContent.trim());
  if (chatTitle !== expectedQuestionaireTitle.trim()) {
      throw new Error(`Expected questionaire title "${expectedQuestionaireTitle}", but got "${chatTitle}" instead`);
  }
});

When("the user clicks on 'I'll Give it a shot'", async () => {
  await page.waitForSelector('.app_letsgoButton__fJS8_');
  await page.click('.app_letsgoButton__fJS8_');
});

Then("clicks on 'Yes, my doctor confirmed it'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
});

Then("user selects 'I'm worried what others may think of me'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(4)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(4)');
});

Then("selects 'I lack resources to keep the baby'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(5)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(5)');
});

Then("user clicks 'Submit'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > button');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > button');
});

Then("user clicks 'I believe it's just a mass of cells'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
});

Then("user clicks 'I'm alone'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
});

Then("user clicks \'I\'m a divorcee\\/widow. What are my options?\'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(3)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(3)');
});

Then("user clicks 'Parenting'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
});

Then("user clicks 'Yes'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(1)');
});

Then("user clicks 'What to expect during pregnancy, labour and delivery'", async () => {
  await page.waitForSelector('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
  await page.click('#__next > div > div > div > div:nth-child(2) > div > div > div:nth-child(2)');
});

Then("lands on 'Let us know more about you!' page",  async () => {
  const expectedFormpage = 'Let us know more about you!'
  await page.waitForSelector('.app_submitTitle__V3amC');
  const formTitle = await page.$eval('.app_submitTitle__V3amC', elem => elem.textContent.trim());
  if (formTitle !== expectedFormpage.trim()) {
      throw new Error(`Expected questionaire title "${expectedFormpage}", but got "${formTitle}" instead`);
  }
});

Then("User selects 'First Name' Text box", async () => {
  await page.waitForSelector('#__next > div > div > div > form > div > div:nth-child(1) > div > div:nth-child(1)');
  await page.click('#__next > div > div > div > form > div > div:nth-child(1) > div > div:nth-child(1)');
});

Then("fills in 'Sarah'", async () => {
  await page.waitForSelector('#__next > div > div > div > form > div > div:nth-child(1) > div > div:nth-child(1)');
  await page.type('#__next > div > div > div > form > div > div:nth-child(1) > div > div:nth-child(1)', 'Sarah');
  await page.click('body');
});

Then("User selects 'Phone Number' Text box", async () => {
  await page.waitForSelector('#pnum');
  await page.click('#pnum');
});

Then("fills in '8899 8866'", async () => {
  await page.waitForSelector('#pnum');
  await page.type('#pnum', '8899 8866');
  await page.click('body');
});

Then("user selects 'Are you pregnant?' checkbox", async () => {
  await page.waitForSelector('#pregnant');
  await page.click('#pregnant');
});

Then("clicks on 'Next'", async () => {
  await page.waitForSelector('#__next > div > div > div > form > div > div.app_buttonSubmitContainer__9CQ_6 > button.app_nextQButton__lp55v');
  await page.click('#__next > div > div > div > form > div > div.app_buttonSubmitContainer__9CQ_6 > button.app_nextQButton__lp55v');
});

Then("user selects 'Email' text box", async () => {
  await page.waitForSelector('#email');
  await page.click('#email');
});

Then("fills in 'sarah@gmail.com'", async () => {
  await page.waitForSelector('#email');
  await page.type('#email', 'sarah@gmail.com');
  await page.click('body');
});

Then("User selects 'Username' Text box", async () => {
  await page.waitForSelector('#uname');
  await page.click('#uname');
});

Then("fills in 'Sarah02'", async () => {
  await page.waitForSelector('#uname');
  await page.type('#uname', 'Sarah02');
  await page.click('body');
});

Then("User selects 'Password' Text box", async () => {
  await page.waitForSelector('#pwd');
  await page.click('#pwd');
});

Then("fills in 'password'", async () => {
  await page.waitForSelector('#pwd');
  await page.type('#pwd', 'password');
  await page.click('body');
});

Then("user clicks on 'Submit'", async () => {
  await page.waitForSelector('#__next > div > div > div > form > div > div > input.app_nextQButton__lp55v');
  await page.click('#__next > div > div > div > form > div > div > input.app_nextQButton__lp55v');
});

Then("User lands on Home page",  async () => {
  const expectedHomepage = 'Hello, User1 !'
  await page.waitForSelector('#__next > div > div > div.py-5 > div > h3.chakra-heading.mb-2.text-left.p-4.css-1dklj6k');
  const Homelanding = await page.$eval('#__next > div > div > div.py-5 > div > h3.chakra-heading.mb-2.text-left.p-4.css-1dklj6k', elem => elem.textContent.trim());
  if (Homelanding !== expectedHomepage.trim()) {
      throw new Error(`Expected questionaire title "${expectedHomepage}", but got "${Homelanding}" instead`);
  }
});