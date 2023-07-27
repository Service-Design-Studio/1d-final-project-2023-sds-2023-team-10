Feature: Guiding hand - Chatbot

#1
Scenario: Entering the chatbot and sending a message
    Given the user is on the chatbot page
    When the user clicks on the 'Type something' Text box below
    And types 'I am so stressed out'
    And clicks the arrow button to send message
    And sees the message appear in the chat
    Then the user recieves a reply from the chatbot