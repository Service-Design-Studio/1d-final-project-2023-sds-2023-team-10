Feature: Admin Dashboard - sentiment analysis
    As a medical practitioner/professional/counsellor
    I want to be able to view users' sentiment through the admin platform to make assessments


    #1
    Scenario: Looking through sentiment analysis
        Given the admin is in a chat
        Then the admin should see a profile of the user containing a sentiment analysis graph


    #2 - Sad path
    Scenario: Empty sentiment analysis
        Given the admin is in a chat
        When the user has not given any positive or negative responses
        Then the admin will see the sentiment analysis graph at a constant of 0.5