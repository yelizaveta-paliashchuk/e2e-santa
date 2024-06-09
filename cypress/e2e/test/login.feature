Feature: User can create a box and run it

    Scenario: User logs in, create a box, add participants and run the toss
        Given user is on secret santa login page
        When user logs in with table
            | username                      | password  |
            | kheladze.yelizaveta@gmail.com | 1232123SS |
        Then user is on the dashboard page

        When main user creates a box
        Then user is on the box page

        When user adds participants
        Then user runs the toss
