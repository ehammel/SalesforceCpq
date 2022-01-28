//Helpful Custom Script (AKA "QCP") JavaScript Functions for Salesforce CPQ.  


// 1. Convert Date field to Text to display to end user:

function convertDate(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
}

//Example Implementation
export function onAfterPriceRules(quoteModel, quoteLines) {
quoteLines.forEach(function (line) {
var productStatusMessage = "";
productStatusMessage = productStatusMessage  + '* The end of sales date for this product is ' + convertDate(line.record["SBQQ__Product__r"]["End_of_Sale_New__c"]) + ' and occurs before the opportunity is expected to close ' + '\\n';
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

//Example Implementation
//...
var clearDiscounts = quote.record["Mass_Edit_Clear_Discount_Uplifts__c"];
       
if(clearDiscounts && effectiveQuantity > 0){
  clearLineDiscountAndUplift(line);
}
//...

// 3. If looking to inherit the field value from Parent Quote Line to Child Quote Line (i.e. An Option of the Parent):

function inheritFieldValueFromParent(line, field){
    if(String(line.record[field]) == 'undefined'  ||  line.record[field] == ""){
        line.record[field] = null;
    }
    if(line.record[field] == null && line.parentItem !== null){
        if(line.parentItem.record[field] !== null){
            line.record[field] = line.parentItem.record[field];
        }
    }
}

//Example Implementation

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
        textArea = textArea + ', ' + someString;
    }
    //console.log()'unique string return result ' + textArea);
    return textArea;
  }

//Example Implementation

function populateGroupList(approvalGroups, lineProductFamily, productLine, isCustomProduct, isLegacyProduct) {
    var thisGroup = '';
    if (isCustomProduct) {
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
        textArea = textArea + ', ' + someString;
    }
    //console.log()'unique string return result ' + textArea);
    return textArea;
  }

// 5. Calculate user entered Quote Discount for approvals.  Calculates total additional discount against Price after system discounts applied.  IOW, compares Regular and Customer Total.

function calculateQuoteDiscount(quoteModel, sum_addedRegularTotal, sum_addedCustomerTotal) {
    var calculatedDiscountPercent = 0;
    if (sum_addedRegularTotal !== 0) {
        calculatedDiscountPercent = 100 * (sum_addedRegularTotal - sum_addedCustomerTotal) / sum_addedRegularTotal;
        calculatedDiscountPercent.toFixed(0);
    }
    //console.log('show me calc discount percent: ' + calculatedDiscountPercent);
    return calculatedDiscountPercent;
  }

//Example Implementation
quoteLines.forEach(function(line) {
  var optional = line.record.SBQQ__Optional__c;
  var effectiveQuantity = line.record.SBQQ__EffectiveQuantity__c;
  if (!optional && effectiveQuantity > 0) {
    addedCustomerTotal = line.record.SBQQ__CustomerTotal__c;
    addedRegularTotal = line.record.SBQQ__RegularTotal__c;
  }
});
sum_addedCustomerTotal = sum_addedCustomerTotal + addedCustomerTotal;
sum_addedRegularTotal = sum_addedRegularTotal + addedRegularTotal;
quoteModel.record["QuoteDiscount__c"] = calculateQuoteDiscount(quoteModel, sum_addedRegularTotal, sum_addedCustomerTotal);

// 6. Access Net Total before After Calculate Step.  Note: this needs to be tested for every implementation!

function preCalcNetTotal(listPrice, optionDiscount, prorateMultiplier, discount, addDisc, bundled, effQ) {
    var calculatedRegularPrice = 0;
    var effectiveOptionDiscount = optionDiscount / 100;
    var appliedOptionDiscount = 1 - effectiveOptionDiscount;
    calculatedRegularPrice = listPrice * appliedOptionDiscount * prorateMultiplier;
    //console.log('calc reg price ' + calculatedRegularPrice);
    var calculatedCustomerPrice = calculatedRegularPrice;
    //CHECK for Disc % vs Disc AMT
    if (discount) {
        //console.log('discount percent detected');
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
    //console.log('calc net total ' + calculatedNetTotal);
    if(isNaN(calculatedNetTotal) || calculatedNetTotal == 0){
        calculatedNetTotal = 0;
    }
    return calculatedNetTotal;
}

// 7. Evaluates current, parent line and and a field to sum.  Adds the field for all child products and the current, parent line's field value. 

function sumFieldToParentProduct(parentLine, fieldToSum) {
    var childProductSum = 0;
    for (var i = 0, length = parentLine.components.length; i < length; i++) {
        childProductSum += parentLine.components[i].record[fieldToSum];
        if (i == parentLine.components.length - 1) {
            return (childProductSum + parentLine.components[i].parentItem.record[fieldToSum]);
        }
    }
}

//Implementation
export function onAfterCalculate(quoteModel, quoteLineModels) {
  quoteLineModels.forEach(function(line) {
    var isBundleParentProduct = line.record.SBQQ__Bundle__c;
        if (isBundleParentProduct) {
            line.record["Package_Net_Total__c"] = sumFieldToParentProduct(line, 'IPC_Net_Total1__c');
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
