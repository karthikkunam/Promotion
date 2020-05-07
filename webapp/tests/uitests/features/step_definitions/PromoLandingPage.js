const { Then } = require("cucumber");
const PromotionMain = require("../pages/PromotionsMain");

const columneffdate = "//*[contains(text(),'Effective Date')]";
const columnparticipate = "//*[contains(text(),'Participate')]";
const participate = "//div[@col-id='participate'][@tabindex='-1']";
const effedate = "//div[@col-id='change_effective_date'][@tabindex='-1']";
const columnchangereason = "//*[contains(text(),'Change Reason')]";
const columnoffername = "//*[contains(text(),'Promotion Name')]";
const columnenddate = "//*[contains(text(),'Promotion End Date')]";


Then("Validate logo included Logo P and Logo 7-Eleven", async () => {
    await PromotionMain.ValidateLogoavailable();
});

Then("Validate all Header fields and column included", async () => {
    await PromotionMain.ValidateHeaderfields();
});

Then("Get all offer details from landing Page", async () => {
    await PromotionMain.GetALLofferdetails();
});

Then("Validate all column present in the table", async () => {
    await PromotionMain.Validatecolumnstable();
});

Then("Validate Participation decision includes Y or N value", async () => {
    await PromotionMain.validateYN();
    //console.log("value of participate",remain);
});

Then("Validate sorted column should be highlighted", function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
});

Then("Validate bold for promotion not started", async () => {
    await PromotionMain.validateBoldcheck();
});

Then("Validate by default the list is sorted by effective date", async () => {
    // Write code here that turns the phrase above into concrete actions
    await PromotionMain.validatedatesort(effedate);
    //return 'pending';
});

Then("Validate sort is asc or desc when participate click", async () => {
    //Click Column participate to check asc or desc order and click back again to defaul Mode
    console.log("Sort Participate");
    await PromotionMain.clickparticipate(columnparticipate);
    await PromotionMain.validateascdescsort1("participate", participate, "asc");
    await PromotionMain.clickparticipate(columnparticipate);
    await PromotionMain.validateascdescsort1("participate", participate, "desc");
    await PromotionMain.clickparticipate(columnparticipate);
});

Then("Validate sort is asc or desc when changereason click", async () => {
    // Write code here that turns the phrase above into concrete actions
    console.log("Sort Change Reason");
    await PromotionMain.clickparticipate(columnchangereason);
    await PromotionMain.validateascdescsort1("change_reason", participate, "asc");
    await PromotionMain.clickparticipate(columnchangereason);
    await PromotionMain.validateascdescsort1("change_reason", participate, "desc");
    await PromotionMain.clickparticipate(columnchangereason);
    //return 'pending';
});

Then("Validate sort is asc or desc when offerName click", async () => {
    // Write code here that turns the phrase above into concrete actions
    console.log("Sort offer Name");
    await PromotionMain.clickparticipate(columnoffername);
    await PromotionMain.validateascdescsort1("offer_name", participate, "asc");
    await PromotionMain.clickparticipate(columnoffername);
    await PromotionMain.validateascdescsort1("offer_name", participate, "desc");
    await PromotionMain.clickparticipate(columnoffername);
    //return 'pending';
});

Then("Validate sort is asc or desc when effectiveDate click", async () => {
    // Write code here that turns the phrase above into concrete actions
    console.log("Sort effective Date");
    await PromotionMain.clickparticipate(columneffdate);
    await PromotionMain.validateascdescsort1("change_effective_date", participate, "asc");
    await PromotionMain.clickparticipate(columneffdate);
    await PromotionMain.validateascdescsort1("change_effective_date", participate, "desc");
    await PromotionMain.clickparticipate(columneffdate);
    //return 'pending';
});

Then("Validate sort is asc or desc when endDate click", async () => {
    // Write code here that turns the phrase above into concrete actions
    console.log("Sort Offer End Date");
    await PromotionMain.clickparticipate(columnenddate);
    await PromotionMain.validateascdescsort1("end_date", participate, "asc");
    await PromotionMain.clickparticipate(columnenddate);
    await PromotionMain.validateascdescsort1("end_date", participate, "desc");
    await PromotionMain.clickparticipate(columnenddate);
    //return 'pending';
});

Then("Validate if the promotion has ended it does not appear in the list.", function () {
    PromotionMain.promoEndvalidation();
    //return 'pending';
});



Then("Validate franchisees are able to sort as needed", function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
});
