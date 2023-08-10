const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");

let browser, page;

Given("Sarah is feeling depressed from her unsupportive family",{ timeout: 60 * 1000 }, async () => {
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

When("Sarah wants to talk to someone about it", { timeout: 60 * 1000 },async () => {
  await page.goto("https://clientfrontend-xnabw36hha-as.a.run.app/messages");

  await page.waitForSelector("#__next > div > div > div.py-5 > button");
  await page.click("#__next > div > div > div.py-5 > button");

  const buttonSelector = 'button.chakra-button.css-ez23ye';
  try {
    // Wait for at least two buttons to become available
    await page.waitForSelector(buttonSelector, { timeout: 5000 }); // Adjust the timeout as needed

    // Get a list of elements that match the selector
    const buttons = await page.$$(buttonSelector);

    // Click the second button (index 1 in the array)
    if (buttons.length > 1) {
      await buttons[1].click();
    } else {
      console.log('Second button not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

When("She starts chat with a new counsellor", { timeout: 60 * 1000 },async () => {
    const buttonSelector2 = 'button.profilepage_chat-button___1eLZ';

   // Find the button element by its selector
    const buttonElement2 = await page.$(buttonSelector2);

    if (buttonElement2) {
      // Click the button
      await buttonElement2.click();
    } else {
      console.log('Button not found.');
    }
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
      "i hate my family so much"
    );

    await page.keyboard.press('Enter');

    await page.type(
      "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input",
      "they are stupid people who dont understand me"
    );


    await page.keyboard.press('Enter');

    await page.type(
      "#__next > div > div > div.py-5 > div > div > div.css-sdxdhq > input",
      "they make me want to leave my family and just run away with my boyfriend"
    );
    await page.keyboard.press('Enter');
  });

// Then('the counsellor receives the messages from Sarah', async function () {
//   await page.goto("https://admindashboard-xnabw36hha-as.a.run.app/login");
//   await page.type('#normal_login_email', 'admin');
//   await page.type('#normal_login_password', 'admin');
//   const loginButtonSelector = '#normal_login > div:nth-child(3) > div > div > div > div > button'; // replace with your button selector
//   await page.click(loginButtonSelector); // Triggers navigation
// });

// When('the counsellor will see from the sentiment analysis data that she is in a bad mood',{ timeout: 60 * 1000 }, async function () {
//   await page.waitForSelector("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
//   await page.click("#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(1)");
// });

// Then('the counsellor will seek solutions to help Sarah', { timeout: 60 * 1000 },async function () {
//   await page.waitForSelector(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea" , { timeout: 5000 }
//   );

//   // Click on the text box
//   await page.click(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea"
//   );

//   await page.type(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
//     "Let's take it step by step Melissa, I am always here for you"
//   );

//   await page.keyboard.press('Enter');
//   await page.keyboard.press('Enter');

//   await page.type(
//     "#__next > section > main > div > div:nth-child(2) > div > div.ant-card-body > div > div.mt-4 > div > textarea",
//     "If you don't mind connecting me with your parents, I can make them understand your frustration"
//   );


//   await page.keyboard.press('Enter');
// });
