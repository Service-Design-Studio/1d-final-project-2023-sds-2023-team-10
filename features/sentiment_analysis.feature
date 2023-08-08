Feature: Sentiment Analysis

    Scenario: Alice thinks she has an unplanned pregnancy
        Given Alice is on the home page of the user dashboard
        When she clicks on the 'Message' icon
        And selects her usual counsellor
        When she types hello
        When clicks the Send button
        When she types I'm panicking
        And clicks the Send button
        When she types I'm worried about my health
        And clicks the Send button
        Then the admin sees a graph

    # Scenario: Admin sees Alice's call for help
    #     Given the admin is in Alice's chat
    #     When the admin clicks on the 'Next Analysis' button
    #     Then the admin sees an 'Average Score Overall' low value
    #     And the admin replies with 'I'm here for you'
    #     And clicks a 'Send' button

    Scenario: Alice is happy having found out her pregnancy test result is negative
        Given Alice is on the home page of the user dashboard
        When she clicks on the 'Message' icon
        And selects her usual counsellor
        When she types 'Thank you counsellor'
        And clicks the Send button
        When she types 'I'm feeling much better today'
        And clicks the Send button
        Then the admin sees a graph

    # Scenario: PregnantMary is unstable because she just broke up with her boyfriend
    #     Given Alice is on the home page of the user dashboard
    #     When she clicks on the 'Message' icon
    #     And selects her usual counsellor
    #     When she types I'm so angry right now
    #     And clicks the Send button
    #     When she types But my parents are very supportive
    #     And clicks the Send button
    #     When she types I'm so angry with my boyfriend
    #     And clicks the Send button
    #     When she types But he is helpful sometimes
    #     And clicks the Send button
    #     When she types But if he ignores me again I'll kill him
    #     And clicks the Send button
    #     When she types I'm grateful for the weather tho
    #     And clicks the Send button
    #     When she types But sometimes it can get so depressing
    #     And clicks the Send button
    #     When she types Thank god there's only 5 weeks left
    #     And clicks the Send button
    #     When she types Once the baby is out, I'm getting rid of it
    #     And clicks the Send button
    #     When she types I'll finally be happy then
    #     And clicks the Send button
    #     Then the admin sees a graph