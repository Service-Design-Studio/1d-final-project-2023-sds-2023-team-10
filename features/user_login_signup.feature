Feature: User dashboard - Log in/Sign up
    As a user who wants information on unplanned pregnancies
    I want to be able to view the app to access the articles, chat features and help links
    So that I know what to do with an unplanned pregnancy


    #1 - Sad path
    Scenario: New user tries to login
        Given a new user is on the login page
        When the new user fills in the fields with any email and password
        And clicks on the "Log In" button
        Then the new user will be shown an error message

    # #2 - Happy path
    # Scenario: New user successfully creates new account
    #     Given a new user is on the sign up page
    #     And fills in the necessary details for signing up
    #     When the new user clicks sign up
    #     Then the new user will be directed to the "Welcome" page

   #3
    Scenario: User log in
        Given user is on the log in page
        When user enters correct email
        And user enters correct password
        And user clicks on log in
        Then user will be directed to the homepage
