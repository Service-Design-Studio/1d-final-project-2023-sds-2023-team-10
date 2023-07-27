Feature: Guiding hand - Chatbot

#1
Scenario: User messages the chatbot
    Given a user is on the chatbot page
    When the user clicks on the 'Type something' Text box below
    And types 'I am so stressed out'
    And clicks the arrow button to send the message
    Then the user will see a message appear in the chat
