Feature: Manan Home page

  Background:
    Given The user is on the Home page

  Scenario: Verify nav heading
    Then The user should see nav heading "Manan"

  Scenario: Verify nav links
    Then The user should see a navigation menu with links:
      | Home    |
      | Try Now |
      | Pricing |
      | Sign In |

  Scenario: Verify main heading
    Then The user should see main heading "Transform Your Medical Practice"

  Scenario: Verify action buttons are visible
    Then The user should see buttons:
      | Try for free                    |
      | For Medical Professionals       |
      | Start Medical Triage Assessment |
      | View Pricing Plans              |

  Scenario: Verify "Home" link
    When The user clicks "Home"
    Then The user should be redirected to the Home page

  Scenario: Verify "Pricing" link
    When The user clicks "Pricing"
    Then The user should be redirected to the Subscription page

  Scenario: Verify "View Pricing Plans" button
    When The user clicks "View Pricing Plans"
    Then The user should be redirected to the Subscription page

  Scenario Outline: Verify clicking "<element>" opens Google sign-in
    When The user clicks "<element>"
    Then The user should see a pop-up window prompting sign-in with a Google account

    Examples:
      | element                   |
      | Sign In                   |
      | For Medical Professionals |

  Scenario: Verify clicking "<element>" opens Manan application page
    When The user clicks "<element>"
    Then The user should be redirected to the Manan application page

    Examples:
      | element                         |
      | Try for free                    |
      | Try Now                         |
      | Start Medical Triage Assessment |
