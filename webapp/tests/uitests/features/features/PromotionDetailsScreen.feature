Feature: Promotion Details Screen
     #PASS
    Scenario: R7B-T29 Validate Promotion Details Screen to include all required columns
        # When You are in Promotions home page
        Then Validate all Header fields and column included
        Then Validate all column present in the table
        Then Validate edit is clickable and takes user to the promo details
        Then Validate leftpanel columns available
        Then Validate rightpanel fields available
        ## Column should include Change Effective Date ,Change Reason,Promotion Name,Promotion Description,Promo Start Date
        ##Promo End Date,Promo SRP Mark Down,Promo CRP Mark Down
        Then Validate Change effective date is not null
        Then Validate Change Reason is not null
        Then Validate Promotion Name is not null
        Then Validate Promotion Description is not null
        Then Validate Promotion Start Date is not null
        Then Validate Promotion End Date is not null
        Then Validate Promotion SRP Markdown is not null
    #Then Validate Group description and Group Id is not null

    #PASS
    Scenario: R7B-T30 Validate Promotion Details Edit details
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Validate user able to toggle Participate Yes and No
        #Then Validate toggle text and color
        Then Enter CRP Value
        Then Validate Save enabled and shows GREEN

    #PASS - Need to Validate once SAVE code completed along with API POST calls
    Scenario: R7B-T31 Validate Toggle data saved in landing page
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Validate participate reason updated to landing page

    #Pending for API
    # Scenario: Validate Promotion Details records matches API GET
    # Then Validate all Header fields and column included
    # Then Validate edit is clickable and takes user to the promo details
    # Then Validate leftpanel columns available
    # Then Validate details page UI and API

    #PASS
    Scenario: R7B-T33 Validate Landing Page Edit clicked is matching with Details Page
        Then Validate all Header fields and column included
        Then Validate landing page data matches details page

    #PASS
    Scenario: R7B-T34 Validate Promotion participation changes (Save and unsaved changes)
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Click Close button
        Then Click On NO button on modal pop up
        Then Validate leftpanel columns available
        Then Click Close button
        Then Validate YES button shows in red
        Then Click YES button on modal pop up
        # Then Validate Changes not saved ** Pending for API
        # #as user click YES DISCARD user will be taken to landing page ,# #To check in Landing page
        Then Validate all Header fields and column included
        Then Validate by default the list is sorted by effective date

    #PASS
    Scenario: R7B-T35 Validate Promotion participation changes by clicking Save button
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Validate user able to toggle Participate Yes and No
        #Then Validate toggle text and color
        Then Enter CRP Value
        Then Click Save button
        #Then Validate toggle and CRP data Saved
        Then Validate all Header fields and column included

    Scenario: R7B-T36 Click Back button to validate promo landing screen have all functionalities
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Validate rightpanel fields available
        Then Navigate browser back to landing page
        Then Validate all Header fields and column included
        Then Validate by default the list is sorted by effective date

    Scenario: R7B-T37 Promotions details page - CRP Text validations
        Then Validate all Header fields and column included
        Then Validate edit is clickable and takes user to the promo details
        Then Validate rightpanel fields available
        Then Enter CRP Value Special char
        Then Enter CRP Value Greater than 10000
        Then Click Save button
        Then Validate Modal Text
        Then Enter CRP Value less than 0
        Then Click Save button
        Then Validate Modal Text
        Then Enter CRP value to convert to 2 decimals
 # Then Validate User cannot enter more than 2 decimals i.e. 2.995 should not be allowed
