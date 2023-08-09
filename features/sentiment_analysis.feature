Feature: AI features
    As a medical practitioner/professional/counsellor
    With the help of AI data
    I can make more informed decisions when chatting to a particular client

    Scenario: Alice is excited to tell her counsellor that her pregnancy test is actually negative
        Given Alice just found out her pregnancy test is negative
        When Alice wants to tell her counsellor and thank her for her help

    Scenario: The counsellor replies to Alice's message
        Given the counsellor will receives the messages from Alice
        And the counsellor will see from the sentiment analysis data that she is in a good mood
        Then the counsellor will send her a reply


    Scenario: Sarah has an emergencency and needed her counsellor's help
        Given Sarah is feeling depressed from her unsupportive family
        When Sarah wants to talk to someone about it
        And She starts chat with a new counsellor

    Scenario: The counsellor replies to Sarah's message
        Given the counsellor receives the messages from Sarah
        And the counsellor will see from the sentiment analysis data that she is in a bad mood
        Then the counsellor will seek solutions to help Sarah


    #Sad Path
    Scenario: Melissa is emotionally very unstable after an encounter with her boyfriend
        Given Melissa is emotionally unstable
        When Melissa text the AI Chatbot
    #Sad Path
    Scenario: The counsellor replies to Sarah's message
        Given the counsellor is able to see their conversation
        When the counsellor can tell that the graph flunctuates a lot
        Then the counsellor sees that the standard deviation of the sentiment analysis is very high
        Then the counsellor will step in and talk to her

     Scenario: A new counsellor is assigned to Sarah
        Given a new counsellor is assigned to Sarah
        When the counsellor is in the chat with Sarah
        And the new counsellor wants to see a summary of the chat
        Then a summary will be shown to the new counsellor
