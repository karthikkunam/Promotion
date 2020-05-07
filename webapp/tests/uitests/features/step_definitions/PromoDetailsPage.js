const { Then } = require("cucumber");
const expect = require("chai").expect;
var webdriver = require("selenium-webdriver");
const scope = require("../support/scope");
const helper = require("../support/Helper");
const PromotionMain = require("../pages/PromotionsMain");

const By = webdriver.By;
const save_click = "btn btn-primary";
const CRPvalue = "promotionCRPMarkdown";
const click_close = "btn btn-outline-secondary mr-3";
var remain = 0;
var remain1;
const okclick = "btn btn-secondary btn btn-secondary"


Then("Validate edit is clickable and takes user to the promo details", async () => {
    var editButtonclick = await PromotionMain.editButton_click();
    for (var i = 0; i < editButtonclick.length; i++) {
        scope.driver.executeScript("arguments[0].scrollIntoView(true);", editButtonclick[i]);
        if (editButtonclick[i].isEnabled()) {
            await helper.sleep(1000);
            editButtonclick[i].click();
            break;
        }
        else {
            console.log("Button not enabled");
        }
    }
});

Then("Validate leftpanel columns available", async () => {
    await PromotionMain.leftPanelDetails();
});

Then("Navigate browser back to landing page", function () {
    PromotionMain.navigateback();
});

Then("Validate rightpanel fields available", async () => {
    await PromotionMain.rightpaneldetails();
});

Then("Validate Promotion details screen includes all label ", async () => {
    await PromotionMain.leftPanelDetails();
});

Then("Validate Change effective date is not null", async () => {
    remain = await PromotionMain.getdetailseffdate();
    expect(remain).to.not.be.null;
});

Then("Validate Change Reason is not null", async () => {
    remain = await PromotionMain.getdetailsreason();
    expect(remain).to.not.be.null;
});

Then("Validate Promotion Name is not null", async () => {
    remain = await PromotionMain.promoName();
    expect(remain).to.not.be.null;
});

Then("Validate Promotion Description is not null", async () => {
    remain = await PromotionMain.promodesc();
    expect(remain).to.not.be.null;
});

Then("Validate Promotion Start Date is not null", async () => {
    remain = await PromotionMain.promostartdate();
    expect(remain).to.not.be.null;
});

Then("Validate Promotion End Date is not null", async () => {
    remain = await PromotionMain.promoenddate();
    expect(remain).to.not.be.null;
});

Then("Validate user able to toggle Participate Yes and No", async () => {
    await helper.sleep(500);
    remain = await PromotionMain.TogglePromoParticipate();
    await helper.sleep(500);
    remain1 = await PromotionMain.gettoggletext();
    console.log("Paticipate Selection is : " + remain1);
});

Then("Enter CRP Value", async () => {
    var crpvalue = await scope.driver.findElement(By.name(CRPvalue));
    //    remain =  PromotionMain.enterPromoCRP();
    console.log("Enter CRP Value");
    await helper.TypeText(crpvalue, "600");
});

Then("Validate $ sign present after entering CRP", async () => {
    var crpvalue = await scope.driver.findElement(By.name(CRPvalue));
    //    remain =  PromotionMain.enterPromoCRP();
    console.log("Enter CRP Value");
    await helper.TypeText(crpvalue, "600");
});

Then("Click Close button", async () => {
    await PromotionMain.clickClose();
});

Then("Validate Save enabled and shows GREEN", async () => {
    var savebutton = await scope.driver.findElement(By.className(save_click));
    var savecolor = await savebutton.getCssValue("backgroundColor");
    console.log(savecolor);
    var actual = ("rgba(16, 127, 98, 1)");
    expect(savecolor).to.contain(actual);
    console.log("Save Enabled and Shows in GREEN");
});

Then("Validate toggle text and color", async () => {
    var grey = ("rgba(91, 97, 107, 1)");
    var green = ("rgba(16, 127, 98, 1)");
    remain = await PromotionMain.gettoggletext();
    remain1 = await PromotionMain.gettogglecolor();
    console.log(remain, remain1);
    if (remain == "Yes") {
        expect(remain1).to.contain(green);
    } else {
        expect(remain1).to.contain(grey);
    }
});

Then("Enter CRP Value Special char", async () => {
    var crpvalue = await scope.driver.findElement(By.name(CRPvalue));
    var numberValue = "1234";
    var alphaValue = "checkalphae";
    var specialValue = "`-=~_+[]\';,./<>?:{}|";
    console.log("Enter CRP Value");
    await helper.TypeText(crpvalue, numberValue);
    var textBoxValue = await scope.driver.findElement(By.name(CRPvalue))
    var size = textBoxValue.length;
    if (size !== 0) {
        console.log("Numbers are allowed.");
    }
    await helper.TypeText(crpvalue, alphaValue);
    var textBoxValue = await scope.driver.findElement(By.name(CRPvalue))
    var size = textBoxValue.length;
    if (size == 0) {
        console.log("alphabets are not allowed.");
    }
    await helper.TypeText(crpvalue, specialValue);
    var textBoxValue = await scope.driver.findElement(By.name(CRPvalue))
    var size = textBoxValue.length;
    if (size == 0) {
        console.log("special characters are not allowed.");
    }

});

Then("Enter CRP Value Greater than 10000", async () => {
    var crpvalue = await scope.driver.findElement(By.name(CRPvalue));
    var numberValue = "10000000";
    await helper.TypeText(crpvalue, numberValue);
    helper.sleep(4000)

});

Then("Enter CRP Value less than 0", async () => {
    var crpvalue = await scope.driver.findElement(By.name(CRPvalue));
    var numberValue = "0";
    await helper.TypeText(crpvalue, numberValue);
    helper.sleep(3000)

});

Then("Validate YES button shows in red", async () => {
    var clicksave = await scope.driver.findElement(By.className("btn btn-primary btn btn-secondary"));
    var savecolor = await clicksave.getCssValue("backgroundColor");
    var red = ("rgba(236, 37, 38, 1)");
    expect(savecolor).to.contain(red);
    console.log(savecolor);
});


Then("Enter CRP value to convert to 2 decimals", async () => {
await PromotionMain.CRPgetText();
});

Then("Click Save button", async () => {
   var clicksave = await scope.driver.findElement(By.className(save_click));
    await clicksave.click();
    await helper.sleep(3000);
});

Then("click ok", async () => {

  await PromotionMain.ok_click();
});

Then("Click No, Stay on Page and validate user stays on same page", async () => {
    var clickclose = await scope.driver.findElement(By.className(click_close));
    await clickclose.click();
    console.log("Closed without saving");
    await helper.sleep(3000);

});

Then("Validate Promotion SRP Markdown is not null", async () => {
    remain = await PromotionMain.promoSRP();
    expect(remain).to.not.be.null;
});

Then("Click On NO button on modal pop up", async () => {
    await PromotionMain.ReviewPageNoButton();
    await helper.sleep(1000);
    remain = await PromotionMain.ModalText();
    console.log(remain);
    //}
});

Then("Validate Modal Text",  async () => {
    var text = await PromotionMain.CRPModalTextNew();
    console.log("Modal text Message",text);
    expect(text).to.be.contains("Promotion CRP must have a value greater than zero or less than 10,000.");
    await PromotionMain.ok_click();

});

Then("Click YES button on modal pop up", async () => {
    remain = await PromotionMain.ModalText();
    await PromotionMain.ReviewPageYESButton();
    console.log(remain);
    
});

Then("Validate Changes not saved to landing Page", async () => {
    await PromotionMain.gettoggletext();
    var detpromoname = await PromotionMain.promoName();
    await helper.sleep(1000);
    var offername = await PromotionMain.getoffername();
    console.log(remain);
    
});

Then('Validate participate reason updated to landing page', function () {
    console.log("Validate API data and POST CALL")

});

Then('Validate landing page data matches details page', async () => {
    // await PromotionMain.getfirstrecord();
    remain = await PromotionMain.getfirstrecord();
    var editButtonclick = await PromotionMain.editButton_click();
    for (var i = 0; i < editButtonclick.length; i++) {
        scope.driver.executeScript("arguments[0].scrollIntoView(true);", editButtonclick[i]);
        if (editButtonclick[i].isEnabled()) {
            await helper.sleep(1000);
            editButtonclick[i].click();
            break;
        }
        else {
            console.log("Button not enabled");
        }
    }
    remain1 = await PromotionMain.leftPanelDetails();
    if (remain === remain1) {
        console.log("Records Matches");
    }
    else {
        console.log("Incorrect Data");
    }
});

Then("Validate details page UI and API", async () => {
    var promoname = await PromotionMain.Getofferdetails();
    var offerdetails = await PromotionMain.GetLandingPageDetails(promoname);
    console.log("test");
    var landingpagedetails = [];
    for (var i = 0; i < offerdetails.length; i++) {
        var sitem = {};
        var value = Object.values(offerdetails[i]);
        console.log(value);
        console.log("check", value[0]);
        sitem["Name"] = value[0];
        landingpagedetails.push(sitem);
        console.log(sitem);
    }
    landingpagedetails = JSON.stringify(landingpagedetails);
    console.log("My ItemList  :" + landingpagedetails);
});

Then("Validate bold", async () => {
    // await PromotionMain.validatecolor();
    await PromotionMain.validateBoldcheck();
});

