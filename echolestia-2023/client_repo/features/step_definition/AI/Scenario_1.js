const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("Alice just found out her pregnancy test is negative", { timeout: 60 * 1000 },async () => {
  browser = await puppeteer.launch({headless: false , slowMo: 50});
  page = await browser.newPage();
  await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/login"); // replace with your login/signup page url
  await page.type("#email", "1");
  await page.type("#password", "2");
  const loginButtonSelector = "button.chakra-button.css-okncv"; // replace with your button selector
  await Promise.all([
    page.click(loginButtonSelector), // Triggers navigation
    page.waitForNavigation({ waitUntil: "networkidle0" }), // Waits until navigation finishes
  ]);
});

When("Alice wants to tell her counsellor and thank her for her help", { timeout: 60 * 1000 },async () => {
  await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/messages");

  await page.waitForSelector("#__next > div > div > div.py-5 > div > ul > li:nth-child(7)");
  await page.click("#__next > div > div > div.py-5 > div > ul > li:nth-child(7)");

  // Wait for the text box to appear on the page
  await page.waitForSelector(
    "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input"
  );

  // Click on the text box
  await page.click(
    "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input"
  );

  await page.type(
    "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input",
    "im so excited to share this great news with you!"
  );

  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');

  await page.type(
    "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input",
    "turns out, my pregnancy test is negative!! Yay!! I am so happy right now haha"
  );


  await page.keyboard.press('Enter');

  await page.type(
    "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input",
    "thank you for your help all this while"
  );
  await page.keyboard.press('Enter');

});

// Then('the counsellor will receives the messages from Alice', { timeout: 60 * 1000 },async function () {
//   await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
//   await page.type('#normal_login_email', 'admin');
//   await page.type('#normal_login_password', 'admin');
//   const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
//   await page.click(loginButtonSelector)
//   // await Promise.all([
//   //   page.click(loginButtonSelector), // Triggers navigation
//   //   page.waitForNavigation({ waitUntil: "networkidle0" }), // Waits until navigation finishes
//   // ]);

// });

// When('the counsellor will see from the sentiment analysis data that she is in a good mood',{ timeout: 60 * 1000 }, async function () {
//   await page.waitForSelector("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
//   await page.click("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
// });

// Then('the counsellor will send her a reply',{ timeout: 60 * 1000 }, async function () {
//   await page.waitForSelector(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea" , { timeout: 5000 }
//   );

//   // Click on the text box
//   await page.click(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea"
//   );

//   await page.type(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
//     "That's great Alice!"
//   );

//   await page.keyboard.press('Enter');

//   await page.type(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
//     "Glad I can you help"
//   );


//   await page.keyboard.press('Enter');
// });

