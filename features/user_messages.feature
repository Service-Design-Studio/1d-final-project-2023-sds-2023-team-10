Feature: Guiding hand - Messages

#1
Scenario: Entering a chat and sending a message
    Given the user is on the messages page
    When the user clicks on the first chat
    Then the user clicks on the 'Type something' Text box
    And types 'I'm Scared, what should I do?'
    Then clicks the arrow button to send the message
    And sees the message appear on the chat
