Feature: Admin Dashboard - Chatbot
    As a medical practitioner/professional/counsellor
    I want to be able to view users' profiles through the admin platform to make assessments

    
    #1
    Scenario: Viewing 'Chatbot' tab with active chats
        Given an admin is on the landing page
        When the admin clicks on the 'Chatbot' tab
        Then the admin should see a list of all the active chats under the 'Chatbot' tab
    
    #2 
    Scenario: Opening one of the profiles
        Given the admin is in the 'Chatbot' page of the admin dashboard
        When the admin selects one of the active profiles
        Then the admin should see the chat history with the user and their profile
