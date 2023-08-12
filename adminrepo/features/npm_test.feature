# This file is responsible for testing if a user's npm is working

Feature: Greeting

  Scenario: Say hello
    When the greeter says hello
    Then I should have heard "hello"
