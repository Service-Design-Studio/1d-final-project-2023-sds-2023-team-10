const puppeteer = require("puppeteer");

async function launchAndLogin() {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/login", {
    waitUntil: "networkidle0",
    timeout: 60000,
  });

  await page.type("#email", "1");
  await page.type("#password", "2");

  const loginButtonSelector = '[data-testid="login-button"]';
  await Promise.all([
    page.click(loginButtonSelector),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
}

module.exports = {
  launchAndLogin,
};
