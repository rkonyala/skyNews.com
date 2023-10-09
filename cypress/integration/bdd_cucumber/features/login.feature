Feature: SkyNews.com homepage

    Background: Background name
        Given I navigate to the Sky News website

    Scenario: A. Verify the browser tab’s title
        When I notice the available page titles
        Then I can affirm I am on the right section

    Scenario Outline: B. Verify the number of categories displayed and their names

        When I navigate to "<sectionPage>" tab
        Then I should be able to navigate to the chosen page for relevant articles of "<sectionPage>"

        Examples:
            | sectionPage |
            | business    |
            | travel      |

    Scenario: C. Verify the default focus point is on the Home category & Verify that if the user clicks on Climate, this becomes the focus
        Then I should be able to spot the default focus on Home tab
        When I navigate to "climate" tab
        Then The focus should change on to "climate"


    Scenario: D. Select a story from the homepage. Verify that a word of your choice in the title of the article you have just selected appears once the title of the page loads.
        When I select a news article from "travel" page
        Then I should ensure the title text appears in the article once the page loads