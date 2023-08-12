Feature: Guiding hand - Questionaire

#1 - Happy path
Scenario: Going through the questionaire until user reaches the login page
    Given a user is at the welcome page
    When the user clicks on 'Start!'
    Then the user will land on 'Take short questionaire' page
    When the user clicks on 'I'll Give it a shot'
    Then clicks on 'Yes, my doctor confirmed it'
    Then user selects 'I'm worried what others may think of me'
    And selects 'I lack resources to keep the baby'
    Then user clicks 'Submit'
    Then user clicks 'I believe it's just a mass of cells'
    Then user clicks 'I'm alone'
    Then user clicks 'I'm a divorcee/widow. What are my options?'
    Then user clicks 'Parenting'
    Then user clicks 'Yes'
    Then user clicks 'What to expect during pregnancy, labour and delivery'
    # information form
    And lands on 'Let us know more about you!' page
    Then User selects 'First Name' Text box
    And fills in 'Sarah'
    Then User selects 'Phone Number' Text box
    And fills in '8899 8866'
    Then user selects 'Are you pregnant?' checkbox
    Then clicks on 'Next'
    # information form continued
    Then user selects 'Email' text box
    And fills in 'sarah@gmail.com'
    Then User selects 'Username' Text box
    And fills in 'Sarah02'
    Then User selects 'Password' Text box
    And fills in 'password'
    Then user clicks on 'Submit'
    And User lands on Log In page


#2 - Sad path
Scenario: Accessing the Home page upon skipping questionnaire
    Given a user is at the start page
    When the user clicks 'Start!'
    When the user clicks 'Skip for now'
    When the user clicks 'Skip'
    When the user clicks 'Skip' again
    Then the user will land on the Log in Page

