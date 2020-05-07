/* eslint-disable no-unused-vars */
var webdriver = require("selenium-webdriver");
var scope = require("../support/scope");

const until = webdriver.until;
const By = webdriver.By;
const helper = require("../support/Helper");

const promoHeader = "page-header";
const promodetailsleft = "col-sm-4 col-left";
const columnHeader = "ag-header-viewport";
const editbutton = "edit-button";
const changeeffdate = "//div[@col-id='change_effective_date'][@tabindex='-1']";
const promoendDate = "//div[@col-id='end_date'][@tabindex='-1']";
const offerdetails = "//div[@class='ag-center-cols-container']//div[@role='row']";
const changeReason = "category-table";
const slider = "slider round";
const test1 = "//span[contains(@class, 'col-header') and text() = 'Change Effective Date: ']";
const closeButton = "btn btn-outline-secondary mr-3";
const crpmodaltext = "modal-content";
const crpokbutton = "btn-sideNav-ok";
const participateflag = "//div[@col-id='participate'][@tabindex='-1']";
const detailseffdate = "changeDate";
const detailsReason = "changeReason";
const detailspromoName = "promotionName";
const detailspromodesc = "promotionDescription";
const detailspromostartdate = "promotionStart";
const promoenddatevalue = "promotionEnd";
const promoSRPvalue = "promotionSRPMarkdown";
const promoCRPvalue = "promotionCRPMarkdown";
//const firstdata = "//div[@class='ag-center-cols-clipper']//div[@class='ag-row ag-row-no-focus ag-row-even ag-row-level-0 ag-row-position-absolute ag-row-first'][@row-index='0'][@row-id='0']//div[@col-id=";
const firstdata = "//div[@class='ag-center-cols-clipper'][@row-index='0'][@row-id='0']//div[@col-id=";
const ReviewPageNoButtonSelector = "btn-sideNav-stay-on";
const ReviewPageYesButtonSelectorbtn = "btn btn-primary btn btn-secondary";
const editclick = "btn btn-sm btn-secondary"
const saveclick = "btn btn-outline-primary"
const okclick = "btn btn-secondary btn btn-secondary"

//preceding-sibling

const getfirstrecord = async () => {
    let firstrowarray = [];
    ////div[@class='ag-center-cols-clipper']//div[@row-index='0'][@row-id='0']//div[@col-id='participate']
    var coloumnitems = ["participate", "change_reason", "offer_name", "change_effective_date"];
    for (var i = 0; i < coloumnitems.length; i++) {
        var selector = firstdata.concat("'", coloumnitems[i], "'", "]");
       // console.log(selector)
        await helper.findElementsByXpath(selector).then(async (rowdata) => {
         //   console.log(rowdata[i]);
            for (var i = 0; i < rowdata.length; i++) {
                var rowitem = await rowdata[i].getText();
                firstrowarray.push(rowitem);
                console.log(rowitem);
            }
            console.log(rowitem);

        });
    }
};

const navigateback = async () => {
    //  scope.driver.get(scope.url);
    //   scope.driver.navigate.back();
    scope.driver.navigateback;
    await helper.sleep(8000);

    console.log("LANDING PAGE");
    // History.back();

};

const validatecolor = async () => {
    await helper.findElementsByClassName("btn btn-sm btn-outline-primary clockin").then(async (color1) => {
        var rowcolour = await color1.getCssValue("background-color");
        // var rowcolour = await rowdata[i].getCssValue("background-color");
        console.log(rowcolour);
    });
};

// if promotion not started (change effdate should be>= today) Font size should be bold
const validateBoldcheck = async () => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today);
    return await helper.findElementsByXpath(changeeffdate).then(async (allDates) => {
        return await helper.findElementsByXpath(offerdetails).then(async (coloumnitems) => {
            for (var i = 0; i < coloumnitems.length; i++) {
                var sitem = await coloumnitems[i].getText();
                var rowitem = await coloumnitems[i].getCssValue("font-weight");
                var sitem = await allDates[i].getText();
                console.log("Row items", sitem);
                console.log("Font weight items", rowitem);
                console.log(sitem);
                if (sitem[i] >= today) {
                    if (rowitem >= 700) {
                        console.log("FONT IS NOT SHOWING AS BOLD");
                    }
                    else {
                        console.log("PROMO Not yet started and FONT is in BOL");
                    }
                }
                console.log("Promo already started and hence rows are not BOLD");
            }
        });
    });
};



const ValidateHeaderfields = async () => {
    let expectedArray = ["Promotion Participation", "Store # 10654"];
    let actualArray = [];
    return await scope.driver.findElements(By.className(promoHeader)).then(async (lndpagefields) => {
        for (var i = 0; i < lndpagefields.length; i++) {
            var getTextValue = await lndpagefields[i].getText();
            var font = await lndpagefields[i].g;
            actualArray.push(getTextValue);
        }
        console.log("All fields of Landing Page  : " + actualArray);

        for (var j = 0; j < expectedArray.length; j++) {
            var expectedValue = expectedArray[j];
            if (JSON.stringify(actualArray).includes(expectedValue)) {
                console.log(`${expectedValue} is present in UI`);
            } else {
                console.log(`${expectedValue} is not present in UI`);
            }
        }
    },

    function (err) {
        return null;
    });
};

const leftPanelDetails = async () => {
    let expectedArray = ["Change Effective Date", "Change Reason", "Promotion Name", "Promotion Description", "Promotion Start Date", "Promotion End Date", "Promotion SRP Markdown", "Promotion CRP Markdown: $", "Participate"];
    let actualArray = [];
    return await scope.driver.findElements(By.className("row col-container")).then(async (lndpagefields) => {
        for (var i = 0; i < lndpagefields.length; i++) {
            var getTextValue = await lndpagefields[i].getText();
            actualArray.push(getTextValue);
        }
        for (var j = 0; j < expectedArray.length; j++) {
            var expectedValue = expectedArray[j];
            if (JSON.stringify(actualArray).includes(expectedValue)) {
                console.log(`${expectedValue} is present in UI`);
            } else {
                console.log(`${expectedValue} is not present in UI`);
            }
        }
    },
    function (err) {
        return null;
    });
};

const rightpaneldetails = async () => {
    let expectedArray = ["Item Description", "Item Number", "Group Description", "Group ID"];
    let actualArray = [];
    return await scope.driver.findElements(By.className("col-sm-8 col-right")).then(async (lndpagefields) => {
        for (var i = 0; i < lndpagefields.length; i++) {
            var getTextValue = await lndpagefields[i].getText();
            console.log("The table includes the following columns  : " + getTextValue);
            actualArray.push(getTextValue);
        }
        for (var j = 0; j < expectedArray.length; j++) {
            var expectedValue = expectedArray[j];
            console.log("Expected Value" + expectedValue);
            if (JSON.stringify(actualArray).includes(expectedValue)) {
                console.log(`${expectedValue} is present in UI`);
            } else {
                console.log(`${expectedValue} is not present in UI`);
            }
        }
    },

    function (err) {
        return null;
    });
};

const ValidateLogoavailable = async () => {

    return await scope.driver.findElements(By.className("page-header-title")).then(async (lndpagefields) => {
        var ImagePresent = scope.driver.executeScript("return arguments[0].complete && typeof arguments[0].naturalWidth != \"undefined\" && arguments[0].naturalWidth > 0", lndpagefields);
        if (ImagePresent != null) {
            console.log("Image not displayed.");
        } else {
            console.log("Image displayed.");
        }
    });
};

const clickparticipate = async (selector) => {
    var clicksave = await scope.driver.findElement(By.xpath(selector));
    await clicksave.click();
    console.log("Record Saved");
    await helper.sleep(500);
};

const validateascdescsort1 = async (ColumnName, selectorName, sortingType) => {
    var allDateitems = [];
    await helper.sleep(500);
    for (var j = 0; j < 15; j++) {
        var sortarrow = "//*[@row-index=".concat("'", [j], "'", "]");
        var sortaw = "//div[@col-id='" + ColumnName + "'][@tabindex='-1']";
        var concat = sortarrow.concat(sortaw);
        await helper.findElementsByXpath("//div/*[@row-index=" + j + "]//div[@col-id='" + ColumnName + "'][@tabindex='-1']").then(async (allDates) => {
            for (var i = 0; i < allDates.length; i++) {
                var sitem = await allDates[i].getText();
                allDateitems.push(sitem);

            }
        });
    }
    console.log("allDateitems", allDateitems);
    var dateArraySort = allDateitems.slice(0);
    //console.log('dateArraySort', dateArraySort);
    if (selectorName.includes("Date")) {
        allDateitems.sort(function (a, b) {
            let c = new Date(new Date(a).getTime() + Math.abs(new Date(a).getTimezoneOffset() * 60000));
            let d = new Date(new Date(b).getTime() + Math.abs(new Date(b).getTimezoneOffset() * 60000));
            if (sortingType == "asc") {
                return d - c;
            } else {
                return c - d;
            }
        });
    } else {
        if (sortingType == "asc") {
            allDateitems.sort();
        } else {
            allDateitems.sort().reverse();
        }
    }
    //console.log('after sort', allDateitems);
    let oddDate = [];
    for (let i = 0; i < allDateitems.length && i < dateArraySort.length; i++) {
        if (allDateitems[i] === dateArraySort[i]) {
            // console.log(true);
        }
        else {
            oddDate.push(allDateitems[i]);
        }
    }
    // console.log(oddDate);
    if (oddDate.length !== 0) {
        console.log("Records are not sorted in", sortingType, "order");
    }
    else {
        console.log("Records are sorted in ", sortingType, " order");
    }


};

const validatedatesort = async (changeeffdate) => {
    var allDateitems = [];
    return await helper.findElementsByXpath(changeeffdate).then(async (allDates) => {
        for (var i = 0; i < allDates.length; i++) {
            var sitem = await allDates[i].getText();
            allDateitems.push(sitem);
        }
        console.log(allDateitems);
        var dateArraySort = allDateitems.slice(0);
        let oddDate = [];
        allDateitems.sort(function (a, b) {
            let c = new Date(new Date(a).getTime() + Math.abs(new Date(a).getTimezoneOffset() * 60000));
            let d = new Date(new Date(b).getTime() + Math.abs(new Date(b).getTimezoneOffset() * 60000));
            return d - c;
        });
        for (let i = 0; i < allDateitems.length && i < dateArraySort.length; i++) {
            if (allDateitems[i] === dateArraySort[i]) {
                console.log(true);
            }
            else {
                oddDate.push(allDateitems[i]);
            }
        }
        console.log(oddDate);

        if (oddDate.length !== 0) {
            console.log("Records are not sorted in descending order");
        }
        else {
            console.log("Records are sorted in descending order");
        }
    }, function (err) {
        return null;
    });
};

const GetALLofferdetails = async () => {
    return await helper.findElementsByXpath(offerdetails).then(async (allDates) => {
        for (var i = 0; i < allDates.length; i++) {
            var sitem = await allDates[i].getText();
            console.log("Row items", sitem);

        }
    }, function (err) {
        return null;
    });
};

const promoEndvalidation = async () => {
    var allDateitems = [];
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return await helper.findElementsByXpath(promoendDate).then(async (allDates) => {
        for (var i = 0; i < allDates.length; i++) {
            var sitem = await allDates[i].getText();
            console.log(sitem);
            if (sitem[i] <= today) {
                console.log("System Shows Expired Promotion in Landing screen");
            }
            else {
                console.log("Does not show Expired promotion");
            }
        }
    }, function (err) {
        return null;
    });
};

const Validatecolumnstable = async () => {
    let expectedArray = ["Participate", "Change Reason", "Promotion Name", "Effectcive Date", "Promotion End Date"];
    let actualArray = [];
    return await scope.driver.findElements(By.className(columnHeader)).then(async (lndpagefields) => {
        for (var i = 0; i < lndpagefields.length; i++) {
            var getTextValue = await lndpagefields[i].getText();
            // console.log("The table includes the following columns  : " + getTextValue);
            actualArray.push(getTextValue);
        }
      //  console.log("All fields of Landing Page  : " + actualArray);
        for (var j = 0; j < expectedArray.length; j++) {
            var expectedValue = expectedArray[j];
            if (JSON.stringify(actualArray).includes(expectedValue)) {
                console.log(`${expectedValue} is present in UI`);
            } else {
                console.log(`${expectedValue} is not present in UI`);
            }
        }
    },

    function (err) {
        return null;
    });
};

const validateYN = async () => {
    let total = 0;
    return await helper.findElementsByXpath(participateflag).then(async (itemd) => {
        for (var i = 0; i < itemd.length; i++) {
            var d = await itemd[i].getText();
            console.log("Partcipate", d);
            if (d == "Y" || d == "N") {
                console.log("Decision is correct");
            }
            else {
                console.log("Incorrect decision values");
            }
        }
    });
};

const getdetailseffdate = async () => {
    return await helper.findElementById(detailseffdate).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        return d;
    },
    function (err) {
        return null;
    });
};

const CRPgetText = async () => {
    var crpvalue = await scope.driver.findElement(By.name(promoCRPvalue));
    var numberValue = "299";
    console.log("Enter CRP Value");
    await helper.TypeText(crpvalue, numberValue);
  // waiting to add enter key , enter key is not worked , pending bug fix from karthik
    var textBoxValue = await scope.driver.findElement(By.name(promoCRPvalue))
    var value = textBoxValue.getText();
    if (value !== 2.99) {
        console.log("Incorrect number");
    }
    else{
        console.log("Decimal Value Converted to 2 decimals");

    }
};


const getoffername = async () => {
    await helper.findElementsByXpath(detailseffdate).then(async (lndpage) => {
        console.log(lndpage.length);
        for (var i = 0; i < lndpage.length; i++) {
            console.log(lndpage.length);
            var rowitem = await lndpage[i].getText();
            console.log("KJGKJHKJHK", rowitem);
        }
    });
};

const getdetailsreason = async () => {
    return await helper.findElementById(detailsReason).then(async (ele) => {
        var d = await ele.getText();
        return d;
    },
    function (err) {
        return null;
    });
};

const promoName = async () => {
    return await helper.findElementById(detailspromoName).then(async (ele) => {
        var d = await ele.getText();
        return d;
    },
    function (err) {
        return null;
    });
};

const promodesc = async () => {
    return await helper.findElementById(detailspromodesc).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        // console.log("check");
        // console.log(ele.getText());
        return d;
    },
    function (err) {
        return null;
    });
};

const promostartdate = async () => {
    return await helper.findElementById(detailspromostartdate).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        return d;
    },
    function (err) {
        return null;
    });
};

const promoenddate = async () => {
    return await helper.findElementById(promoenddatevalue).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        // console.log("check");
        // console.log(ele.getText());
        return d;
    },
    function (err) {
        return null;
    });
};

const promoSRP = async () => {
    return await helper.findElementById(promoSRPvalue).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        return d;
    },
    function (err) {
        return null;
    });
};

const promoCRP = async () => {
    return await helper.findElementById(promoCRPvalue).then(async (ele) => {
        var d = await ele.getText();
        console.log(d);
        return d;
    },
    function (err) {
        return null;
    });
};

const TogglePromoParticipate = async () => {
    scope.driver.wait(until.elementLocated(By.className(slider)));
    return await scope.driver.findElement(By.className(slider)).click();
};

const clickClose = async () => {
    scope.driver.wait(until.elementLocated(By.className(closeButton)));
    return await scope.driver.findElement(By.className(closeButton)).click();
};

const gettoggletext = async () => {
    scope.driver.wait(until.elementLocated(By.className("slider round")));
    return await scope.driver.findElement(By.className("slider round")).getText();
};

const gettogglecolor = async () => {
    scope.driver.wait(until.elementLocated(By.className("slider round")));
    return await scope.driver.findElement(By.className("slider round")).getCssValue("background-color");
};

const editButton_click = async () => {
    return await helper.findElementsByClassName(editclick);
};

const save_click = async () => {
    // var clicksave =  await helper.findElementsByClassName(saveclick);
    // await clicksave.click();
    var clicksave = await scope.driver.findElement(By.className(saveclick));
    await clicksave.click();

};

const ok_click = async () => {
    var clickclose = await scope.driver.findElement(By.className(okclick));
    await clickclose.click();
};

const ReviewPageNoButton = async () => {
    return await helper.findElementById(ReviewPageNoButtonSelector).then(function (webElement) {
        if (webElement) {
            return webElement.click();
        } else {
            expect(webElement).to.not.equals("null", "Unable to find the element");
        }
    });
};

const ReviewPageYESButton = async () => {
    return await helper.findElementByClassName(ReviewPageYesButtonSelectorbtn).then(function (webElement) {
        return webElement.click;
    });
};

    const CRPModalTextNew = async() => {
        return await scope.driver.findElement(By.className(crpmodaltext)).then(function(messgae) {
            return messgae.getText();
        }, function(err) {
            return null;
        });
    };
    

const ModalText = async () => {
    return await scope.driver.findElement(By.className("modal-body")).then(function (messgae) {
        var message = messgae.getText();
        if (message == "You have unsaved changes which will be lost if you navigate away. Would you like to proceed?") {
            console.log("Valid Message");
        } else {
            console.log("InValid Message");
        }
        // eslint-disable-next-line no-unused-vars
    }, function (err) {
        return null;
    });
};

const enterPromoCRP = async (crp) => {
    return await scope.driver.findElement(By.id("promotionCRPMarkdown")).then(function (ele) {
    });
};

const changeReason1 = async (dte) => {
    return await scope.driver.findElements(By.name(changeReason)).then(function (ele) {
        var textvalue = ele.getText();
        console.log(textvalue);
        return textvalue.getAttribute(textvalue);

    });
};

module.exports = {
    ValidateHeaderfields,
    ValidateLogoavailable,
    Validatecolumnstable,
    editButton_click,
    leftPanelDetails,
    getdetailseffdate,
    getdetailsreason,
    promoName,
    promodesc,
    promostartdate,
    promoenddate,
    promoSRP,
    promoCRP,
    changeReason1,
    enterPromoCRP,
    ModalText,
    TogglePromoParticipate,
    validateYN,
    validatedatesort,
    rightpaneldetails,
    ReviewPageNoButton,
    ReviewPageYESButton,
    getfirstrecord,
    gettoggletext,
    validateBoldcheck,
    validatecolor,
    save_click,
    promoEndvalidation,
    navigateback,
    getoffername,
    clickClose,
    GetALLofferdetails,
    clickparticipate,
    validateascdescsort1,
    gettogglecolor,
    CRPModalTextNew,
    CRPgetText,
    ok_click
};