Feature: Patient Triage Analysis Form

  Background:
    Given The user is on the patient triage analysis page

  Scenario Outline: Upload blood report
    When the user uploads blood report "<File Name>"
    Then the user should see the "<Outcome>" notification

    Examples:
      | File Name                                                       | Outcome |
      | SampleReports/Diabetic and Hemogram Test_Thyrocare lab.pdf.pdf  | success |
      | SampleReports/Diabetic and Hemogram Test_Thyrocare lab.pdf.docx | error   |

  Scenario Outline: Validate patient triage analysis form
    When The user fills form for "<Scenario>"
    Then The user should see the expected result for "<Scenario>"

    Examples:
      | Scenario               |
      | Complete Form          |
      | Complete Form - Manual |
      | Missing Fields         |
