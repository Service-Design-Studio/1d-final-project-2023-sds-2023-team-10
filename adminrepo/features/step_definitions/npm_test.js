// This file is responsible for testing if a user's npm is working

const assert = require("assert");
const { When, Then } = require("@cucumber/cucumber");
const { Greeter } = require("../../src/npm_test");

When("the greeter says hello", function () {
  this.whatIHeard = new Greeter().sayHello();
});

Then("I should have heard {string}", function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse);
});
