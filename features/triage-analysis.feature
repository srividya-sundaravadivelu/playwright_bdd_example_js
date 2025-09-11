Feature: Patient Triage Analysis Form

  Background:
    Given The user is on the patient triage analysis page

  Scenario Outline: Validate patient triage analysis form
    When The user fills form for "<Scenario>"
    Then The user should see the expected result for "<Scenario>"

    Examples:
      | Scenario       |
      | Complete Form  |
      | Missing Fields |
