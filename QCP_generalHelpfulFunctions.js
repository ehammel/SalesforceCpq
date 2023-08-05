//Helpful Custom Script (AKA "QCP") JavaScript Functions for Salesforce CPQ.  

// 1. Convert Date field to Text to display to end user:

function convertDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
}

// 1. Example Implementation
//Use case: set quote field to dispaly an expiration date message to the end user 
export function onAfterPriceRules(quoteModel, quoteLines) {
quoteLines.forEach(function (line) {
var productStatusMessage = "";
productStatusMessage += '* The end of sales date for this product is ' + convertDate(line.record["SBQQ__Product__r"]["EndOfLifeDate__c"]) + ' and occurs before the opportunity is expected to close ' + '\\n';
line.record["ProductStatus__c"] = productStatusMessage.trim();
});
return Promise.resolve()
}


// 2. If looking to completely wipe out all discounts, uplifts (i.e. MDQ), and reset Additional Discount to 'Amount' :

function clearLineDiscountAndUplift(line){
    line.record["SBQQ__AdditionalDiscountAmount__c"] = null;
    line.record["SBQQ__Discount__c"] = null;
    line.record["AdditionalDiscountUnit__c"] = 'Amount';
    line.record["SBQQ__Uplift__c"] = null;
    line.record["SBQQ__UpliftAmount__c"] = null;
}

// 2. Example Implementation
//...toggled by user as a checkbox field
var clearDiscounts = quote.record["Mass_Edit_Clear_Discount_Uplifts_Flag__c"];
       
if(clearDiscounts = true && effectiveQuantity > 0){
  clearLineDiscountAndUplift(line);
}
//...

// 3. If looking to inherit the field value from Parent Quote Line to Child Quote Line (i.e. An Option of the Parent):

function inheritFieldValueFromParent(line, field){
    if(!line.record[field]){
        line.record[field] = line.parentItem?.record[field] || null;
    }
}

//3. Example Implementation

export function onInit(quoteLines) {
    if (quoteLines) {
        quoteLines.forEach(function (line) {
            inheritFieldValueFromParent(line, 'Type__c');
            inheritFieldValueFromParent(line, 'Size__c');
            inheritFieldValueFromParent(line, 'NumberOfAxels__c');
            });
    }
    return Promise.resolve();
}

 
// 4. Creating a list of unique values to compare against (i.e. If this field "Includes" x, y, z) :

  function addThisUniqueString(textArea, someString) {
    if (textArea == '') {
        textArea = someString;
    } else if (!textArea.includes(someString)) {
        textArea += ', ' + someString;
    }
    //console.log()'unique string return result ' + textArea);
    return textArea;
  }

//4. Example Implementation

function populateGroupList(approvalGroups, lineProductFamily, productLine, isLegacyProduct) {
    var thisGroup = '';
     if (productLine == 'Automotive') {
            thisGroup = 'SVP Automotive Operations';
            approvalGroups = addThisUniqueString(approvalGroups, thisGroup);
        }
        if (productLine == 'Home Energy') {
            thisGroup = 'SVP Home Energy Operations';
            approvalGroups = addThisUniqueString(approvalGroups, thisGroup);
        }
        if (productLine == 'Generators') {
            thisGroup = 'SVP Delivery Management';
            approvalGroups = addThisUniqueString(approvalGroups, thisGroup);
        }
    if (lineProductFamily == 'Offering' && isLegacyProduct) {
        thisGroup = 'Sales Operations';
        approvalGroups = addThisUniqueString(approvalGroups, thisGroup);
    }
    //console.log('show me Approval Groups: ' + approvalGroups);
    return approvalGroups;
  }
  
  function addThisUniqueString(textArea, someString) {
    if (textArea == '') {
        textArea = someString;
    } else if (!textArea.includes(someString)) {
        textArea += ', ' + someString;
    }
    return textArea;
  }

// 5. Calculate user entered Quote Discount for approvals.  Calculates total additional discount against Price after system discounts applied.  Basically compares Regular and Customer Total.

function calculateQuoteDiscount(quoteModel, sum_addedRegularTotal, sum_addedCustomerTotal) {
    return (sum_addedRegularTotal !== 0) ? 
        Number((100 * (sum_addedRegularTotal - sum_addedCustomerTotal) / sum_addedRegularTotal).toFixed(0)) : 0;
}

// 5. Example Implementation
quoteLines.forEach(function(line) {
  var optional = line.record.SBQQ__Optional__c;
  var effectiveQuantity = line.record.SBQQ__EffectiveQuantity__c;
    //Not Optional lines and only added lines' totals.  Excludes canceled quote lines negative totals.
  if (!optional && effectiveQuantity > 0) {
    addedCustomerTotal = line.record.SBQQ__CustomerTotal__c;
    addedRegularTotal = line.record.SBQQ__RegularTotal__c;
  }
});
sum_addedCustomerTotal = sum_addedCustomerTotal + addedCustomerTotal;
sum_addedRegularTotal = sum_addedRegularTotal + addedRegularTotal;
quoteModel.record["QuoteDiscount__c"] = calculateQuoteDiscount(quoteModel, sum_addedRegularTotal, sum_addedCustomerTotal);

// 6. Access Net Total before After Calculate Step.  Note: this needs to be tested for every implementation and should be at the end of the pricing sequence, preferably in the !

function preCalcNetTotal(listPrice, optionDiscount, prorateMultiplier, discount, addDisc, bundled, effQ) {
    var calculatedRegularPrice = 0;
    var effectiveOptionDiscount = optionDiscount / 100;
    var appliedOptionDiscount = 1 - effectiveOptionDiscount;
    calculatedRegularPrice = listPrice * appliedOptionDiscount * prorateMultiplier;
    var calculatedCustomerPrice = calculatedRegularPrice;
    //CHECK for Disc % vs Disc AMT
    if (discount) {
        calculatedCustomerPrice = calculatedRegularPrice * (1 - discount / 100);
    }
    if (addDisc) {
        //no proration by default
        calculatedCustomerPrice = calculatedRegularPrice - addDisc;
    }
    //Skip Partner and Distributor discount so Net Price inherits the Customer Price
    var calculatedNetPrice = calculatedCustomerPrice;
    var calculatedNetTotal = 0;
    if (bundled) {
        calculatedNetTotal = 0;
    } else {
        calculatedNetTotal = calculatedNetPrice * effQ;
    }
    if(isNaN(calculatedNetTotal) || calculatedNetTotal == 0){
        calculatedNetTotal = 0;
    }
    return calculatedNetTotal;
}

// 7. Evaluates current, parent line and and a field to sum.  Adds the field for all child products and the current, parent line's field value. 

function sumFieldToParentProduct(parentLine, fieldToSum) {
    return parentLine.components.reduce((sum, comp) => sum + comp.record[fieldToSum], 0) +
        parentLine.components[0].parentItem.record[fieldToSum];
}

//7. Implementation
export function onAfterCalculate(quoteModel, quoteLineModels) {
  quoteLineModels.forEach(function(line) {
    var isBundleParentProduct = line.record.SBQQ__Bundle__c;
        if (isBundleParentProduct) {
            line.record["Package_Net_Total__c"] = sumFieldToParentProduct(line, 'Custom_Net_Total__c');
        }
  });
  return Promise.resolve();
}


//8. Evaluates whether there are groups on the Quote.  Marks a Quote field true or false depending on whether groups exist.  Useful to combine with product rule if suggesting/enforcing groups.
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    if (quoteModel.groups.length === 0) {
        quoteModel.record["NoGroupsOnQuote__c"] = true;
    } else {
        quoteModel.record["NoGroupsOnQuote__c"] = false;
    }
  return Promise.resolve();
}


//9. Leverages Quote Process field on the Solution Group object to set the Quote Process on the Quote Line Group when it is created.  Useful when looking to create a different Quote Process for each Quote Line Group on the Quote.
//Requires Solution Groups with a Quote Process lookup field.  And a formula on the Quote Line Group object.
function setQuoteProcessOnGroupFromSolutionGroup(){
var defaultQuoteProcess = [];
var defaultSiteType = 'Large Site';
var whereLiteral = "'" + defaultSiteType + "'";
var defaultCapexSiteQuery = 'SELECT Id, Name, Site_Type__c, Quote_Process__c FROM SBQQ__SolutionGroup__c WHERE Site_Type__c =' + whereLiteral;
 return conn.query(defaultCapexSiteQuery).then(function(site) {
     try {
             if (site.records.length > 0) {
                 site.records.forEach(function(OneSite) {
                    defaultQuoteProcess[0] = OneSite;
                 });
             }
      } catch (e) {
             console.log(e);
      }

      quoteModel.groups.forEach(function(group) {
         if (group.record != null) {
             if (group.record["SBQQ__SolutionGroup__c"] !== null) {
                 if (group.record["Solution_Group_Quote_Process__c"] !== null) {
                    group.record["SBQQ__QuoteProcess__c"] = group.record["Solution_Group_Quote_Process__c"];
                 }
             } else if (quoteModel.record.QuoteSalesType__c == 'Hardware' && group.record.SBQQ__SolutionGroup__c == null && group.record.SBQQ__QuoteProcess__c == null) {
                       group.record["Name"] = defaultQuoteProcess[0].Site_Type__c;
                       group.record["SBQQ__QuoteProcess__c"] = defaultQuoteProcess[0].Quote_Process__c;
                }
          }
      });
 return resolve(null);
 });
}

//10. Reference Product field value instead of mapped twin field (similar to Formula field)
// Use Case: Admin changes date on Product and all Quote Lines should be impacted (instead of newly added quote lines henceforth)
// Note: Need to create twin field on Quote Line to ensure QCP works
// Example:
var endOfLifeOnProductRecord = line.record["SBQQ__Product__r"]["EndOfLifeDate__c"];


//11. Set Quote Line Group fields via QCP
//Use Case: Each group is a separate customer "site".  Looking to find Site summary totals.  
//Below code sets Group fields HardwareTotal__c and HardwareQuantity__c
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    //mark quote true if no groups are present
    if (quoteModel.groups.length === 0) {
        quoteModel.groups.forEach(function(group) {
            var hardwareTotal = 0;
            var hardwareQty = 0;

            group.lineItems.forEach(function(line) {
                var qty = line.record.SBQQ__Quantity__c;
                var netTotal = line.record.SBQQ__NetTotal__c;
                var productFamily = line.record.SBQQ__ProductFamily__c;
                if (productFamily == 'Hardware') {
                    hardwareTotal += netTotal;
                    hardwareQty += qty;
                }
            });
            group.record["HardwareTotal__c"] = hardwareTotal;
            group.record["HardwareQuantity__c"] = hardwareQty;
        });
        return Promise.resolve();
    }
}
