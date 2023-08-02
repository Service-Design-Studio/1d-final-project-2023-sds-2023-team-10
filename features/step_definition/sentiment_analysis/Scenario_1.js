const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

let browser, page;


url = "http://localhost:3000/"
// Change to server url when deployed
// https://clientfrontend-xnabw36hha-as.a.run.app

Given('Alice is on the home page of the user dashboard', async function () {
  browser = await puppeteer.launch({headless:false, args: ['--allow-running-insecure-content']});
  page = await browser.newPage();
  await page.goto(url+'/login',{ waitUntil: 'networkidle0', timeout: 60000 });  // replace with your login/signup page url
  await page.type('#email', '1');
  await page.type('#password', '2');
  const loginButtonSelector = 'button.chakra-button.css-okncv'; // replace with your button selector
  await Promise.all([
      page.click(loginButtonSelector), // Triggers navigation
      page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
  ]);
//   const messageUrl = "https://clientfrontend-xnabw36hha-as.a.run.app/messages"; // Replace with the desired URL

//   await page.goto(messageUrl, { waitUntil: "networkidle0" });
});

When("she clicks on the 'Message' icon", {timeout: 60 * 1000}, async function () {
    const messageUrl = url+"/messages"; // Replace with the desired URL
    await page.goto(messageUrl, { waitUntil: "networkidle0" });
});

When("selects her usual counsellor", {timeout: 60 * 1000}, async function () {
//     // Using the class selector to find the element
//    const element = await page.$('#__next > div > div > div.py-5 > div > ul > li:nth-child(2)');

//    // Click the element if found
//    if (element) {
//      await element.click();
//    } else {
//      console.log('Element not found.');
//    }

await page.click('#__next > div > div > div.py-5 > div > ul > li:nth-child(2)');
});

When("she types hello", {timeout: 60 * 1000}, async function () {
    // Wait for the text box to appear on the page
    await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');

    // Click on the text box
    await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');

    // Type the desired words in the text box
    await page.type('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input', "hello");
    await page.waitForTimeout(5000)
    await page.keyboard.press('Enter');
    // await page.type('\n');
    // await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');
    // await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');
    // const loginButtonSelector = '#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button'; // replace with your button selector
    // await Promise.all([
    //   page.click(loginButtonSelector), // Triggers navigation
    //   page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
    // ]);
});

// And("clicks the Send button", async function () {
//     await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-hboir5 > div > p.chakra-text.css-1xs2h3i');
//     await page.keyboard.press('Enter');
//     await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');
//     await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');
// });

When("clicks the Send button", async function () {
    // Implement the logic to find the "Send" button element
    // If the "Send" button is not directly clickable, you can use the Enter key to simulate a click
    await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');

    // // Click on the text box
    // await page.click('input.chakra-input.css-1fpoko8');
    // await page.focus('input');
    // await page.waitForTimeout(500);
    // await page.keyboard.press('Enter');
    // await page.keyboard.press('Tab');
    // await page.waitForSelector('#selected-box');
    // await page.click('#selected-box');



    // await page.click('#selected-box');
    // await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > button');
    // await page.keyboard.press('Enter');
    // await page.click('button.chakra-button.css-eld34s');
    // await page.click('.chakra-button.css-eld34s');
    // await page.click('button[type="button"][class="chakra-button css-eld34s"]');
    // await page.click('//button[@type="button" and contains(@class, "chakra-button") and contains(@class, "css-eld34s")]');
    // await page.click('button[fdprocessedid="ubpid"]');





  });

When("she types I'm panicking", {timeout: 60 * 1000}, async function () {
    // Wait for the text box to appear on the page
    await page.waitForSelector('input.chakra-input.css-1fpoko8');

    // Click on the text box
    await page.click('input.chakra-input.css-1fpoko8');

    // Type the desired words in the text box
    await page.type('input.chakra-input.css-1fpoko8', "I'm panicking");
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000)
});

When("she types I'm worried about my health", {timeout: 60 * 1000}, async function () {
    // Wait for the text box to appear on the page
    await page.waitForSelector('input.chakra-input.css-1fpoko8');

    // Click on the text box
    await page.click('input.chakra-input.css-1fpoko8');

    // Type the desired words in the text box
    await page.type('input.chakra-input.css-1fpoko8', "I'm worried about my health");

    await page.waitForTimeout(100);

    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(5000)
});

Then("the admin sees a graph", {timeout: 60 * 1000}, async function () {
    
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/login', { waitUntil: 'networkidle0', timeout: 60000 });
    await page.type('#normal_login_email', 'admin');
    await page.type('#normal_login_password', 'admin');
    const loginButtonSelector = 'button.ant-btn.css-1q11svj.ant-btn-primary.login-form-button.w-full'; // replace with your button selector
    await Promise.all([
        page.click(loginButtonSelector), // Triggers navigation
        page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
    ]);
    const messageUrl = "https://admindashboard-xnabw36hha-as.a.run.app/chat"; // Replace with the desired URL
    await page.goto(messageUrl, { waitUntil: "networkidle0" });
    const chatSelector = '#__next > section > main > div > div:nth-child(1) > div > div > div > div > div > li:nth-child(57)'; // replace with your button selector
    await Promise.all([
        page.click(chatSelector), // Triggers navigation
        page.waitForNavigation({ waitUntil: 'networkidle0' })  // Waits until navigation finishes
    ]);
});



When("she types I'm so angry right now", async function () {
  await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
  await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
  await page.type('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input', "I'm so angry right now");
  await page.waitForTimeout(100);

  await page.keyboard.press('Enter');
  

});

When("she types But my parents are very supportive", async function () {
  await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
  await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
  await page.type('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input', "But my parents are very supportive");
  await page.waitForTimeout(100);

  await page.keyboard.press('Enter');
  

});

// Implement the remaining "she types" steps in the same format
When("she types 'Thank you counsellor'", async function () {
    await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
    await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
    await page.type('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input', "Thank you counsellor");
    await page.waitForTimeout(100);

    await page.keyboard.press('Enter');
    

  });

When("she types 'I'm feeling much better today'", async function () {
    await page.waitForSelector('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
    await page.click('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input');
    await page.type('#__next > div > div > div.py-5 > div > div > div > div.css-sdxdhq > input', "I'm feeling much better today");
    await page.waitForTimeout(100);

    await page.keyboard.press('Enter');

});


  