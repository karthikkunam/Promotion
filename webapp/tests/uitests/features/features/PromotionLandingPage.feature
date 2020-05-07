#PASS
Feature: Validate the Promotion Landing Page
    Scenario: R7B-T19 Validate Promotion landing page to include all required columns
        Then Validate logo included Logo P and Logo 7-Eleven
        Then Validate all Header fields and column included
        Then Get all offer details from landing Page
        #Header fields should include Promotion Participation , Store # store number
        Then Validate all column present in the table
        #Columns should include Participation decision , Change Reason , Promotion Name  ,Effective date,End Date,Edit Ability
        Then Validate by default the list is sorted by effective date
        Then Validate Participation decision includes Y or N value
        Then Validate if the promotion has ended it does not appear in the list.

    #PASS ( Will be validated once API give correct data)
    Scenario: R7B-T22 Validate promotion ended does not appear in list
        # When You are in Promotions home page
        # Then Click Promotions Participation page
        Then Validate all Header fields and column included
        Then Validate all column present in the table
        Then Validate Participation decision includes Y or N value
        Then Validate if the promotion has ended it does not appear in the list.

    #PASS ( Currently FAIL waiting for Karthik UI update to see sort order in UI)
    Scenario: R7B-T24 Validate by default the list is sorted by effective date
        # When You are in Promotions home page
        # Then Click Promotions Participation page
        Then Validate all Header fields and column included
        Then Validate by default the list is sorted by effective date
    #descending order - newest at top)

    #PASS (Will be retested once BOLD code completed by karthik)
    Scenario:R7B-T25 Validate if a promotion has not yet taken effect the row of data is bold.
        #When You are in Promotions home page
        #Then Click Promotions Participation page
        Then Validate bold for promotion not started

    #PASS
    Scenario:R7B-T26  Validate franchisees are able to sort as needed (asc / desc)
        Then Validate all Header fields and column included
        Then Validate sort is asc or desc when participate click
        Then Validate sort is asc or desc when changereason click
        Then Validate sort is asc or desc when offerName click
        Then Validate sort is asc or desc when effectiveDate click
        Then Validate sort is asc or desc when endDate click


# Pending for API
# Scenario: Validate Promotion Landing records matches API GET
# Then Validate all Header fields and column included
# Then Validate edit is clickable and takes user to the promo details
# Then Validate Landing details page UI and API

#LESS PRIORITY
#Scenario: Validate if the list extends beyond close button, the list is scrollable and the close button is always displayed
#When You are in Promotions home page
#Then Click Promotions Participation page
#Then Validate vertical scroll bar with more data loaded
