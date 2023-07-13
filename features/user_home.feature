Feature: Guiding Hand - Home page
# Home page is the page that consists of the list of articles and personalised pregnancy information


#1 - Happy path
Scenario: Accessing the Home page upon skipping questionnaire
    Given a user is at the "Take short questionaire" page
    When the user clicks 'Skip for now'
    Then the user will land on the Home page
    And the user will see a generalised list of articles

#2
Scenario: Accessing the Home page upon completing questionnaire
    Given a user is at the 'Tell us more' section of the questionnaire
    When the user clicks 'Done'
    Then the user will land on the Home page

#3
Scenario: Accessing the Home page after logging in
    Given a user is on the Login page
    And Logs in with a valid account
    When the user clicks 'Login'
    Then the user will land on the Home page

#4
Scenario: Display a personalised list of articles
    Given a user is in the "How may we help?" page in the onboarding questionnaire
    And has clicked on the "I think I'm pregnant" option
    When the user clicks 'Done' after completing the questionnaire 
    Then the user sees a list of articles about signs of pregnancy

#5
Scenario: Viewing an article
    Given a user is on the home page
    And the user sees a list of articles
    When the user clicks on a specific article "5 Things to Do After a Surprise Pregnancy"
    Then the user is directed to the article page on a web browser

#6
Scenario: Going to the SSA Website
    Given a user is on the home page
    And the user scrolls to the bottom of the page
    When the user clicks on the "A life Social service agency" link
    Then the user will be directed to the SSA website on a web browser
