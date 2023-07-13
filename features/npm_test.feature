Feature: 1
#1 - Happy path
Scenario: Accessing the Home page upon skipping questionnaire
    Given a user is at the Take short questionaire page
    When the user clicks 'Skip for now'
    Then the user will land on the Home page
    And the user will see a generalised list of articles