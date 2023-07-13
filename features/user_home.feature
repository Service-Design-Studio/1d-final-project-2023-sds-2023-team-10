Feature: Guiding Hand - Home page
# Home page is the page that consists of the list of articles and personalised pregnancy information


#1 - Happy path
Scenario: Accessing the Home page upon skipping questionnaire
    Given a user is at the "Take short questionaire" page
    When the user clicks 'Skip for now'
    Then the user will land on the Home page

#2
Scenario: Accessing the Home page upon completing questionnaire
    Given a user is at the 'Tell us more' section of the questionnaire
    When the user clicks 'Done'
    And the user completes the questionaire
    Then the user will land on the Home page

#3
Scenario: Display a personalised list of articles
    Given a user is in the home page
    Then they will see a list of articles

#4
Scenario: Viewing an article
    Given a user is on the home page
    And the user sees a list of articles
    When the user clicks on a specific article "5 Things to Do After a Surprise Pregnancy"
    Then the user is directed to the article page on a web browser

#5
Scenario: Going to the SSA Website
    Given a user is at the home page
    And the user scrolls to the bottom of the page
    When the user clicks on the "A life Social service agency" link
    Then the user will be directed to the SSA website on a web browser
