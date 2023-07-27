Feature: Guiding hand - Messages


Scenario: Accesing chat page
    Given the user is on the home page
    When the user click on the chat icon
    Then user should be in the chat page

Scenario: Entering a chat
    Given the user is on the chat page
    When the user clicks on the first chat
    Then the user will be in that chat

Scenario: Sending empty message
    Given the user is at message page
    When the user selects the first chat
    When the user clicks on the Text box
    And user clicks 'send'
    Then nothing will happen

Scenario: Sending a message
    Given user log in
    And user goes to message
    And the user is in a chat again
    When user types message
    Then user clicks enter
    And sees the message appear on the chat



