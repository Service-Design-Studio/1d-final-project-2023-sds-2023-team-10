const { Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');

let browser, page;

// 1 - Viewing 'Chat' tab with active chats
Given("an admin lands in the admin dashboard", async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://admindashboard-xnabw36hha-as.a.run.app/chat');
});

Then("the admin should see a list of all the active chats under the 'Chat' tab", async function () {
    const chatElements = await page.$$('.chat-element');
    expect(chatElements.length).toBeGreaterThan(0);
});

// 2 - Opening one of the chats
When("the admin selects one of the active chats", async function () {
    await page.click('input[value="User1 Last1"]'); 
});

Then("the admin should see the chat history with the user and their profile", async function () {
    const userProfileElement = await page.$('.user-profile');
    assert(userProfileElement, "User profile element not found");
});


// 3 - Sending a message to the selected chat
When("the admin fills in the 'Type your message here' field", async function (message) {
    await page.type('input[placeholder="Type your message here"]', message);
});

And("the admin clicks the 'Send' button", async function () {
    await page.click('button.send-button-selector');
});

Then("the admin will see the message appear in the selected chat", async function () {
    await page.waitForSelector('.chat-message');
    const messages = await page.$$('.chat-message');
    const lastMessage = messages[messages.length - 1];
    const messageText = await lastMessage.evaluate((element) => element.textContent);
    expect(messageText).toBe("Expected message content");
  });


// 4 - Sending a message with 'Type your message here' field empty (Sad path)
When("the admin has not input anything into 'Type your message here' field", async function () {
    await page.$eval('input[name="message-input"]', input => input.value = '');
});

Then("the admin should not be able to send a new message", async function () {
    const isSendButtonDisabled = await page.$eval('button.send-button-selector', button => button.disabled);
    expect(isSendButtonDisabled).toBe(true);
});


