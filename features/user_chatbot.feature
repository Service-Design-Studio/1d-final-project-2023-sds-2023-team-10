Feature: Guiding hand - Chatbot

#1
Scenario: User accesses the chatbot page
    Given a user is in the messages tab
    When the user opens a chat
    And clicks on the 'Chatbot' button on the top right
    Then the user will reach the page where they can talk to the chatbot

#2
Scenario: Entering the chatbot and sending a message
    Given the user is on the chatbot page
    When the user clicks on the 'Type something' Text box below
    And types 'I am so stressed out'
    And clicks the arrow button to send message
    And sees the message appear in the chat
    Then the user receives a reply from the chatbot
