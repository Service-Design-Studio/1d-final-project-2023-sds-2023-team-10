const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

let browser;
let page;


// Scenario 1: Viewing 'Chatbot' tab with active chats
Given("an admin is on the landing page", async function () {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/chat');
});

When("the admin clicks on the 'Chatbot' tab", async function () {
  await page.waitForSelector('.chatbot-tab');
  await page.click('.chatbot-tab');
});

Then("the admin should be redirected to the Chatbot page", async function () {
  await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/chat2');
});

And("the admin should see a list of all the active chats under the 'Chatbot' tab", async function () {
  await page.waitForSelector('.active-chats-list');
  // Implement the code to verify that the admin sees a list of all the active chats under the 'Chatbot' tab
  const activeChats = await page.$$('.active-chats-list');
  expect(activeChats.length).to.be.above(0);
});


// Scenario 2: Opening one of the profiles
Given("the admin is in the 'Chatbot' page of the admin dashboard", async function () {
  // Implement the code to navigate to the 'Chatbot' page of the admin dashboard
});

When("the admin selects one of the active profiles", async function () {
  await page.waitForSelector('.active-chats-list');
  const activeChats = await page.$$('.active-chats-list .chat-profile');
  await activeChats[0].click(); // Click on the first active chat profile (you can modify this to select a specific profile)
});

Then("the admin should see the chat history with the user and their profile", async function () {
  await page.waitForSelector('.chat-history');
  await page.waitForSelector('.user-profile');
  // Implement the code to verify that the admin sees the chat history with the user and their profile
});
