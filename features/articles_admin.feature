Feature: Admin Dashboard - Articles
    As a medical practitioner/professional/counsellor
    I want to be able to view, create and delete articles through the admin platform
    So that users can view articles which are curated properly for them.

    # Scenario: Admin can navigate to view articles
    #     Given I have proceeded to the admin dashboard
    #     When I click on the articles tab
    #     Then I should see a list of articles

    Scenario: Admin can successfully open an article link in a new window
        Given I have navigated to the View articles page
        When I click on the visit article button
        Then I should see a new window with the url of that article

    Scenario: Admin can create an article
        Given I have proceeded to the admin dashboard
        When I click on the articles tab
        And I click on the create article button
        And I fill in the article form
        And I click on the create article button
        Then I should see the article in the list of articles

    Scenario: Admin can delete an article
        Given I have proceeded to the admin dashboard
        When I click on the articles tab
        And I click on the delete article button
        Then I should not see the article in the list of articles