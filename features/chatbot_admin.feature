Feature: Admin Dashboard - Chatbot
    As a medical practitioner/professional/counsellor
    I want to be able to view users' profiles through the admin platform to make assessments

    
    #1 - Happy path
    Scenario: Viewing 'Chatbot' tab with active chats
        Given an admin is on the landing page
        Then the admin clicks on the 'Chatbot' tab
        Then the admin should see a list of all the active chats under the 'Chatbot' tab
    
    #2 
    Scenario: Opening one of the profiles
        Given the admin is in the 'Chatbot' page of the admin dashboard
        When the admin selects one of the active profiles
        Then the admin should see the chat history with the user and their profile

# Sentiment analysis
    #3
    Scenario: Looking through sentiment analysis
        Given the admin is in a chat
        Then the admin should see a profile of the user containing a sentiment analysis graph


    #4 - Sad path
    Scenario: Empty sentiment analysis
        Given the admin is in a chat
        When the user has not given any positive or negative responses
        Then the admin will see the sentiment analysis graph at a constant of 0.5
