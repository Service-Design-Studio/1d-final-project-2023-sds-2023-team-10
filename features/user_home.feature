Feature: Guiding Hand - Home page
# Home page is the page that consists of the list of articles and personalised pregnancy information

#1
Scenario: Viewing an article
    Given a user is on the home page
    Then the user sees a 'Recommended Article' section
    And the user will see a 'More Articles' Section 
    When the user clicks on a the recommended article
    Then the user is directed to the article page on a web browser

#2
Scenario: Going to the SSA Website
    Given a user is at the home page
    Then the user sees the link to 'A life Social service agency'
    When the user clicks on the link
    Then the user will be directed to the SSA website on a web browser
