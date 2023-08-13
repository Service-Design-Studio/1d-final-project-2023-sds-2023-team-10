Feature: Admin Dashboard - Chat
    As a medical practitioner/professional/counsellor
    I want to be able to send and receieve messages and view users' profiles through the admin platform 

    
    #1 - Happy path
    Scenario: Viewing 'Chat' tab with active chats
        Given an admin lands in the admin dashboard
        Then the admin should see a list of all the active chats under the 'Chat' tab
    
    #2 
    Scenario: Opening one of the chats
        Given the admin is in the 'Chat' page of the admin dashboard
        When the admin selects one of the active chats
        Then the admin should see the chat history with the user and their profile

    #3
    Scenario: Sending a message to the selected chat
        Given the admin is in an active chat
        When the admin fills in the 'Type your message here' field
        And the admin clicks the 'Send' button
        Then the admin will see the message appear in the selected chat

    #4 - Sad path
    Scenario: Sending a message with 'Type your message here' field empty
        Given the admin is in an active chat
        When the admin has not input anything into 'Type your message here' field
        And the admin clicks on the 'Send' button
        Then the admin should not be able to send a new message
