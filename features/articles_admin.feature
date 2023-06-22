Feature: Admin Dashboard - Articles
    As a medical practitioner/professional/counsellor
    I want to be able to view, create and delete articles through the admin platform
    So that users can view articles which are curated properly for them.

    #1 - Sad path
    Scenario: Viewing 'Articles' tab but no articles were added
        Given an admin lands in the admin dashboard for the first time
        And is in the 'Chat' tab
        When the admin hovers over the 'Articles' tab
        And clicks on the 'View Articles' button
        Then the admin should see the text 'You have no articles, please create a new article!'
    
    #2 - Happy path
    Scenario: Viewing 'Articles' tab with articles added
        Given an admin lands in the admin dashboard for the first time
        And is in the 'Chat' tab
        When the admin hovers over the 'Articles' tab
        And clicks on the 'View Articles' button
        Then the admin should see a list of all the articles that all admins have added to the page
    
    #3
    Scenario: Opening one of the articles
        Given an admin is in the 'View Articles' page of the admin dashboard
        When the admin clicks on the 'Visit Link' button
        Then the admin is redirected to the article's original URL in a new browser tab
    
    #4
    Scenario: Accessing the page to create articles
        Given an admin is in the 'Chat' tab of the admin dashboard
        When the admin hovers over the 'Articles' tab
        And clicks on the 'Create Article' button
        # for following step, for puppeteer check the page-title
        Then the admin should see a form to create articles

