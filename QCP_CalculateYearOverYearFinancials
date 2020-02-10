export function onInit(lines) {
  for(var i = 0, len = lines.length; i < len; i++){
    if(lines[i].parentItem && lines[i].record["Size__c"] == null){
      lines[i].record["Size__c"] = lines[i].parentItem.record["Size__c"];
    }
    if(lines[i].parentItem && lines[i].record["Number_of_Users__c"] == null){
      lines[i].record["Number_of_Users__c"] = lines[i].parentItem.record["Number_of_Users__c"];
    }
    if(lines[i].parentItem && lines[i].record["Number_of_Locations__c"] == null){
      lines[i].record["Number_of_Locations__c"] = lines[i].parentItem.record["Number_of_Locations__c"];
    }
  }
return Promise.resolve();
}

let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

//percent change between previous year and current year
function calculateYoyChange(currentLine, previousLine, fieldName){
  var percentChange = 0;
  var startingValue = 0;
  var newValue = 0;
  if(previousLine.record[fieldName] !== null){
    startingValue = previousLine.record[fieldName];
  }
  if(currentLine.record[fieldName] !== null){
    newValue = currentLine.record[fieldName];
  }
  percentChange = (newValue - startingValue) / startingValue  * 100;
  return percentChange;
}

//difference between previous year and current year
function calculateYoyDifferenceFields(currentLine, previousLine, currentYearField, previousYearField){
  var value = 0;
  value = currentLine.record[currentYearField] - previousLine.record[previousYearField];
  return value;
}

//difference between previous year and current year
function calculateDifferenceVars(currentYearVar, previousYearVar){
  var value = 0;
  value = currentYearVar - previousYearVar;
  return value;
}

export function onAfterCalculate(quote, lines) {
    //used to check for duplicate grouping products, see findDuplicates function above
    var groupingsStrArray = [];
  //Recurring Revenue
  var recurringRevYear1 = 0;
  var recurringRevYear2 = 0;
  var recurringRevYear3 = 0;
  var recurringRevYear4 = 0;
  var recurringRevYear5 = 0;
  //Carveouts
  var carveoutYear1 = 0;
  var carveoutYear2 = 0;
  var carveoutYear3 = 0;
  var carveoutYear4 = 0;
  var carveoutYear5 = 0;
  //Bookings
  var bookingsYear1 = 0;
  var bookingsYear2 = 0;
  var bookingsYear3 = 0;
  var bookingsYear4 = 0;
  var bookingsYear5 = 0;
  //Annualized bookings
  var annualizedBookingsYear1 = 0;
  var annualizedBookingsYear2 = 0;
  var annualizedBookingsYear3 = 0;
  var annualizedBookingsYear4 = 0;
  var annualizedBookingsYear5 = 0;
  //TCV
  var sumTcvYear1 = 0;
  var sumTcvYear2 = 0;
  var sumTcvYear3 = 0;
  var sumTcvYear4 = 0;
  var sumTcvYear5 = 0;
  //ACV
  var sumAcvYear1 = 0;
  var sumAcvYear2 = 0;
  var sumAcvYear3 = 0;
  var sumAcvYear4 = 0;
  var sumAcvYear5 = 0;
  //Models
  var modelsYear1 = 0;
  var modelsYear2 = 0;
  var modelsYear3 = 0;
  var modelsYear4 = 0;
  var modelsYear5 = 0;
  //Data
  var dataYear1 = 0;
  var dataYear2 = 0;
  var dataYear3 = 0;
  var dataYear4 = 0;
  var dataYear5 = 0;
  //Apps
  var appsYear1 = 0;
  var appsYear2 = 0;
  var appsYear3 = 0;
  var appsYear4 = 0;
  var appsYear5 = 0;
  //Platform
  var platformYear1 = 0;
  var platformYear2 = 0;
  var platformYear3 = 0;
  var platformYear4 = 0;
  var platformYear5 = 0;
  //Services
  var servicesYear1 = 0;
  var servicesYear2 = 0;
  var servicesYear3 = 0;
  var servicesYear4 = 0;
  var servicesYear5 = 0;
  //legacy Software
  var legacySoftwareYear1 = 0;
  var legacySoftwareYear2 = 0;
  var legacySoftwareYear3 = 0;
  var legacySoftwareYear4 = 0;
  var legacySoftwareYear5 = 0;
  //Discount off List
  var totalDiscountYear1 = 0; // equals SUM TOTAL DISCOUNT AMT YEAR 1 / SUM OF NET TOTAL YEAR 1
  var totalDiscountYear2 = 0;
  var totalDiscountYear3 = 0;
  var totalDiscountYear4 = 0;
  var totalDiscountYear5 = 0;
  //regular total
  var listTotalYear1 = 0;
  var listTotalYear2 = 0;
  var listTotalYear3 = 0;
  var listTotalYear4 = 0;
  var listTotalYear5 = 0;
  //Annualized TCV
  var annualizedTcvYear1 = 0;
  var annualizedTcvYear2 = 0;
  var annualizedTcvYear3 = 0;
  var annualizedTcvYear4 = 0;
  var annualizedTcvYear5 = 0;
  var tcv = 0;
  var annualizedTcv = 0;
  var annualizedBookings = 0;

  //******* END TOTALS FIELDS on QUOTE DECLARATION ******

  //QL fields to compare current year against previous year (i.e. Discounts, Uplifts, Amounts, Quantities, Avg Change)
  var fieldsYoyChange = ["SBQQ__Uplift__c","SBQQ__Discount__c", "SBQQ__AdditionalDiscountAmount__c", "SBQQ__NetTotal__c"];
  var fieldsBookings = ["SBQQ__NetTotal__c", "Recurring_Amount__c", "Unprorated_Net_Total__c", "Unprorated_Recurring_Amount__c"];
  var fieldsToSum = ["Models_Amount__c", "Data_Amount__c", "Apps_Amount__c", "Platform_Amount__c", "Legacy_Software_Amount__c", "Services_Amount__c"];
  var previousTotalsOnQuote = [];
  for(var i = 0, len = lines.length; i < len; i++){
      var carveoutAmt = 0;
    var unproratedRecurringAmountPY = 0; //recurring Amount Previous Year
    var segmentIndex = lines[i].record["SBQQ__SegmentIndex__c"];
    var subscriptionType = lines[i].record["SBQQ__SubscriptionType__c"];
    var renewedSubscription = lines[i].record["SBQQ__RenewedSubscription__c"];
    var prorateMultiplier = lines[i].record["SBQQ__ProrateMultiplier__c"];
    var prorateMultiplierPreviousYear = 0;
    var acvAmt = 0;
    var quantity = lines[i].record["SBQQ__Quantity__c"];
    var effectiveQuantity = lines[i].record["SBQQ__EffectiveQuantity__c"];
    var subPricing = lines[i].record["SBQQ__SubscriptionPricing__c"];
    var netTotal = lines[i].record["SBQQ__NetTotal__c"];
    var listTotal = lines[i].record["SBQQ__ListTotal__c"];
    //var totalDiscount = lines[i].record["SBQQ__ListTotal__c"] - lines[i].record["SBQQ__NetTotal__c"];
    var totalDiscount = lines[i].record["SBQQ__AdditionalDiscountAmount__c"];
    var netTotalPrecise = lines[i].record["Net_Unit_Price_Custom__c"];
    var unproratedNetTotal = netTotalPrecise * quantity / prorateMultiplier;
    //includes reductions and cancellations (negative annualized bookings possible )
    var unproratedNetTotalBookings = netTotalPrecise * effectiveQuantity / prorateMultiplier;
    var returnResults = [];
    var productResultsName = lines[i].record["Product_Results_Group_Field_Name__c"];
    //If product is subscription, set ACV to unproratedNetTotal
    if(subscriptionType == 'Renewable' || subscriptionType == 'Renewable/Evergreen' || subscriptionType == 'Evergreen'){
      lines[i].record["ACV__c"] = unproratedNetTotal;
      acvAmt = unproratedNetTotal;
    }
    //if one time, ACV is 0
    else{
      lines[i].record["ACV__c"] = 0;
      acvAmt = 0;
    }
    //Set Year over Year (MDQ) Discount and Uplift percent changes
    //Condition: if after year 1.  Compares year over year
    if(segmentIndex > 1){
      prorateMultiplierPreviousYear = lines[i-1].record["SBQQ__ProrateMultiplier__c"];
      lines[i].record["YoY_Uplift_Change__c"] = calculateYoyChange(lines[i], lines[i-1], fieldsYoyChange[0]);
      lines[i].record["YoY_Net_Total_Change__c"] =  calculateYoyChange(lines[i], lines[i-1], fieldsYoyChange[3]); //percent
      lines[i].record["YoY_Net_Total_AMT_Change__c"] = calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsYoyChange[3], fieldsYoyChange[3]);
      //Condition: if discount % is on QL
      if(lines[i].record["SBQQ__AdditionalDiscount__c"] !== null){
        lines[i].record["YoY_Discount_Change__c"] = calculateYoyChange(lines[i],  lines[i-1], fieldsYoyChange[1]);
      }
      else{
        //Otherwise:  discount amt is on QL
        lines[i].record["YoY_Discount_Change__c"] = calculateYoyChange(lines[i],  lines[i-1], fieldsYoyChange[2]);
      }
    }
    //Set bookings on Quote Line
    //Condition: if one-time product, Bookings always = Net Amount.
    if((subscriptionType == 'One-time' || subPricing == null) && lines[i].record.SBQQ__UpgradedAsset__c == null){
       lines[i].record["Bookings__c"] = netTotal;
       annualizedBookings = unproratedNetTotalBookings;
       carveoutAmt = unproratedNetTotal;
       lines[i].record["Carveout_Amount__c"] = carveoutAmt;
       lines[i].record["Annualized_Bookings__c"] = annualizedBookings;
    }
    else if(lines[i].record.SBQQ__UpgradedAsset__c !== null){
      carveoutAmt = 0;
      lines[i].record["Carveout_Amount__c"] = carveoutAmt;
    }
    //Condition: not renewal line, segment 1 and recurring
    else if (renewedSubscription == null && segmentIndex == 1 && subscriptionType !== 'One-time') {
       lines[i].record["Bookings__c"] = netTotal;
       annualizedBookings = unproratedNetTotalBookings;
       lines[i].record["Annualized_Bookings__c"] = annualizedBookings;
    }
    //If renewal quote line and segment 1
    else if (segmentIndex == 1 && renewedSubscription !== null){
      annualizedBookings = unproratedNetTotalBookings - lines[i].record["Previous_Latest_Segment_Bookings__c"];
      lines[i].record["Annualized_Bookings__c"] = annualizedBookings;
    }
    //Condition: if line is recurring and year 2 or geater,then Current Year Total - Previous Year Total
    else if (segmentIndex > 1 && subscriptionType !== 'One-time'){
      lines[i].record["Bookings__c"] = calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[0], fieldsBookings[0]);
      annualizedBookings = calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[2], fieldsBookings[2]);
      lines[i].record["Annualized_Bookings__c"] = annualizedBookings;
    }
    //END BOOKINGS

    //SET TCV
    //Equals original
    if(lines[i].record.SBQQ__UpgradedSubscription__c == null && lines[i].record.SBQQ__UpgradedAsset__c == null){
      tcv = netTotal;
    }
    else if (lines[i].record.SBQQ__UpgradedSubscription__c !== null){
      tcv = lines[i].record.Previous_Client_Total__c + netTotal;
    }
   else if(lines[i].record.SBQQ__UpgradedAsset__c !== null){
      tcv = 0;
   }
   annualizedTcv = acvAmt + carveoutAmt;
   lines[i].record["Annualized_TCV__c"] = annualizedTcv;
    //Sum annual totals from Quote Line
    if(segmentIndex == 1){
      lines[i].record["Latest_Segment_Bookings__c"] = lines[i + (quote.record.Duration_In_Years__c - 1)].record.Unprorated_Net_Total__c;
      bookingsYear1 = bookingsYear1 + netTotal;
      annualizedBookingsYear1 = annualizedBookingsYear1 + annualizedBookings;
      recurringRevYear1 = recurringRevYear1 + lines[i].record["Recurring_Revenue__c"];
      sumTcvYear1 = sumTcvYear1 + tcv;
      sumAcvYear1 = sumAcvYear1 + acvAmt;
      totalDiscountYear1 = totalDiscountYear1 + totalDiscount;
      listTotalYear1 = listTotalYear1 + listTotal;
      annualizedTcvYear1 = annualizedTcvYear1 + annualizedTcv;
      carveoutYear1 = carveoutYear1 + carveoutAmt;
      modelsYear1 = modelsYear1 + lines[i].record[fieldsToSum[0]];
      dataYear1 = dataYear1 + lines[i].record[fieldsToSum[1]];
      appsYear1 = appsYear1 + lines[i].record[fieldsToSum[2]];
      platformYear1 = platformYear1 + lines[i].record[fieldsToSum[3]];
      legacySoftwareYear1 = legacySoftwareYear1 + lines[i].record[fieldsToSum[4]];
      servicesYear1 = servicesYear1 + lines[i].record[fieldsToSum[5]];
    }
    //Condition: if year 2
    if(segmentIndex == 2){
      bookingsYear2 = bookingsYear2 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[0], fieldsBookings[1]);
      annualizedBookingsYear2 = annualizedBookingsYear2 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[2], fieldsBookings[3]);
      recurringRevYear2 = recurringRevYear2 + lines[i].record["Recurring_Revenue__c"];
      sumTcvYear2 = sumTcvYear2 + tcv;
      sumAcvYear2 = sumAcvYear2 + acvAmt;
      totalDiscountYear2 = totalDiscountYear2 + totalDiscount;
      annualizedTcvYear2 = annualizedTcvYear2 + annualizedTcv;

      listTotalYear2 = listTotalYear2 + listTotal;
      carveoutYear2 = carveoutYear2 + carveoutAmt;
      modelsYear2 = modelsYear2 + lines[i].record[fieldsToSum[0]];
      dataYear2 = dataYear2 + lines[i].record[fieldsToSum[1]];
      appsYear2 = appsYear2 + lines[i].record[fieldsToSum[2]];
      platformYear2 = platformYear2 + lines[i].record[fieldsToSum[3]];
      legacySoftwareYear2 = legacySoftwareYear2 + lines[i].record[fieldsToSum[4]];
      servicesYear2 = servicesYear2 + lines[i].record[fieldsToSum[5]];
    }
    //Condition: if year 3
    if(segmentIndex == 3){
      bookingsYear3 = bookingsYear3 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[0], fieldsBookings[1]);
      annualizedBookingsYear3 = annualizedBookingsYear3 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[2], fieldsBookings[3]);
      recurringRevYear3 = recurringRevYear3 + lines[i].record["Recurring_Revenue__c"];
      sumTcvYear3 = sumTcvYear3 + tcv;
      sumAcvYear3 = sumAcvYear3 + acvAmt;
      totalDiscountYear3 = totalDiscountYear3 + totalDiscount;
      listTotalYear3 = listTotalYear3 + listTotal;
      annualizedTcvYear3 = annualizedTcvYear3 + annualizedTcv;
      carveoutYear3 = carveoutYear3 + carveoutAmt;
      modelsYear3 = modelsYear3 + lines[i].record[fieldsToSum[0]];
      dataYear3 = dataYear3 + lines[i].record[fieldsToSum[1]];
      appsYear3 = appsYear3 + lines[i].record[fieldsToSum[2]];
      platformYear3 = platformYear3 + lines[i].record[fieldsToSum[3]];
      legacySoftwareYear3 = legacySoftwareYear3 + lines[i].record[fieldsToSum[4]];
      servicesYear3 = servicesYear3 + lines[i].record[fieldsToSum[5]];
    }
    //Condition: if year 4
    if(segmentIndex == 4){
      bookingsYear4 = bookingsYear4 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[0], fieldsBookings[1]);
      annualizedBookingsYear4 = annualizedBookingsYear4 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[2], fieldsBookings[3]);
      recurringRevYear4 = recurringRevYear4 + lines[i].record["Recurring_Revenue__c"];
      sumTcvYear4 = sumTcvYear4 + tcv;
      sumAcvYear4 = sumAcvYear4 + acvAmt;
      listTotalYear4 = listTotalYear4 + listTotal;
      totalDiscountYear4 = totalDiscountYear4 + totalDiscount;
      annualizedTcvYear4 = annualizedTcvYear4 + annualizedTcv;
      carveoutYear4 = carveoutYear4 + carveoutAmt;
      modelsYear4 = modelsYear4 + lines[i].record[fieldsToSum[0]];
      dataYear4 = dataYear4 + lines[i].record[fieldsToSum[1]];
      appsYear4 = appsYear4 + lines[i].record[fieldsToSum[2]];
      platformYear4 = platformYear4 + lines[i].record[fieldsToSum[3]];
      legacySoftwareYear4 = legacySoftwareYear4 + lines[i].record[fieldsToSum[4]];
      servicesYear4 = servicesYear4 + lines[i].record[fieldsToSum[5]];
    }
    //Condition: if year 5
    if(segmentIndex == 5){
      bookingsYear5 = bookingsYear5 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[0], fieldsBookings[1]);
      annualizedBookingsYear5 = annualizedBookingsYear5 + calculateYoyDifferenceFields(lines[i], lines[i-1], fieldsBookings[2], fieldsBookings[3]);
      recurringRevYear5 = recurringRevYear5 + lines[i].record["Recurring_Revenue__c"];
      sumTcvYear5 = sumTcvYear5 + tcv;
      sumAcvYear5 = sumAcvYear5 + acvAmt;
      totalDiscountYear5 = totalDiscountYear5 + totalDiscount;
      annualizedTcvYear5 = annualizedTcvYear5 + annualizedTcv;
      listTotalYear5 = listTotalYear5 + listTotal;
      carveoutYear5 = carveoutYear5 + carveoutAmt;
      modelsYear5 = modelsYear5 + lines[i].record[fieldsToSum[0]];
      dataYear5 = dataYear5 + lines[i].record[fieldsToSum[1]];
      appsYear5 = appsYear5 + lines[i].record[fieldsToSum[2]];
      platformYear5 = platformYear5 + lines[i].record[fieldsToSum[3]];
      legacySoftwareYear5 = legacySoftwareYear5 + lines[i].record[fieldsToSum[4]];
        servicesYear5 = servicesYear5 + lines[i].record[fieldsToSum[5]];
      }
    //Ending annual summations

    //Lastly, populate grouping array to later check for Quote Line duplicates
        if (lines[i].record["Grouping__c"] == true) {
            groupingsStrArray.push(String(lines[i].record["SBQQ__ProductCode__c"]));
        }
    //End of Quote Line loop
    }
  //On Quote record, set Totals
  //bookings
  quote.record["Total_Bookings__c"] = bookingsYear1 + bookingsYear2 + bookingsYear3 + bookingsYear4 + bookingsYear5;
  quote.record["Bookings_Year_1__c"] = bookingsYear1;
  quote.record["Bookings_Year_2__c"] = bookingsYear2;
  quote.record["Bookings_Year_3__c"] = bookingsYear3;
  quote.record["Bookings_Year_4__c"] = bookingsYear4;
  quote.record["Bookings_Year_5__c"] = bookingsYear5;
  //annualized bookings
  quote.record["Total_Annualized_Bookings__c"] = annualizedBookingsYear1 + annualizedBookingsYear2 + annualizedBookingsYear3 + annualizedBookingsYear4 + annualizedBookingsYear5;
  quote.record["Annualized_Bookings_Year_1__c"] = annualizedBookingsYear1;
  quote.record["Annualized_Bookings_Year_2__c"] = annualizedBookingsYear2;
  quote.record["Annualized_Bookings_Year_3__c"] = annualizedBookingsYear3;
  quote.record["Annualized_Bookings_Year_4__c"] = annualizedBookingsYear4;
  quote.record["Annualized_Bookings_Year_5__c"] = annualizedBookingsYear5;
  //carveouts
  quote.record["Total_Carveouts__c"] = carveoutYear1 + carveoutYear2 + carveoutYear3 + carveoutYear4 + carveoutYear5;
  quote.record["Carveouts_Year_1__c"] = carveoutYear1;
  quote.record["Carveouts_Year_2__c"] = carveoutYear2;
  quote.record["Carveouts_Year_3__c"] = carveoutYear3;
  quote.record["Carveouts_Year_4__c"] = carveoutYear4;
  quote.record["Carveouts_Year_5__c"] = carveoutYear5;
  //Recurring Revenue
  quote.record["Total_Recurring_Amount__c"] = recurringRevYear1 + recurringRevYear2 + recurringRevYear3 + recurringRevYear4 + recurringRevYear5;
  quote.record["Recurring_AMT_Year_1__c"] = recurringRevYear1;
  quote.record["Recurring_AMT_Year_2__c"] = recurringRevYear2;
  quote.record["Recurring_AMT_Year_3__c"] = recurringRevYear3;
  quote.record["Recurring_AMT_Year_4__c"] = recurringRevYear4;
  quote.record["Recurring_AMT_Year_5__c"] = recurringRevYear5;
  //TCV
  quote.record["Total_TCV__c"] = sumTcvYear1 + sumTcvYear2 + sumTcvYear3 + sumTcvYear4 + sumTcvYear5 + quote.record["ExistingNonRecurring__c"];
  quote.record["TCV_Year_1__c"] = sumTcvYear1;
  quote.record["TCV_Year_2__c"] = sumTcvYear2;
  quote.record["TCV_Year_3__c"] = sumTcvYear3;
  quote.record["TCV_Year_4__c"] = sumTcvYear4;
  quote.record["TCV_Year_5__c"] = sumTcvYear5;
  //ACV__c
  quote.record["Total_ACV__c"] = sumAcvYear1 + sumAcvYear2 + sumAcvYear3 + sumAcvYear4 + sumAcvYear5;
  quote.record["ACV_Year_1__c"] = sumAcvYear1;
  quote.record["ACV_Year_2__c"] = sumAcvYear2;
  quote.record["ACV_Year_3__c"] = sumAcvYear3;
  quote.record["ACV_Year_4__c"] = sumAcvYear4;
  quote.record["ACV_Year_5__c"] = sumAcvYear5;
  //Annualized TCV
  quote.record["Total_Annualized_TCV__c"] = annualizedTcvYear1 + annualizedTcvYear2 + annualizedTcvYear3 + annualizedTcvYear4 + annualizedTcvYear5;
  quote.record["Annualized_TCV_Year_1__c"] = annualizedTcvYear1;
  quote.record["Annualized_TCV_Year_2__c"] = annualizedTcvYear2;
  quote.record["Annualized_TCV_Year_3__c"] = annualizedTcvYear3;
  quote.record["Annualized_TCV_Year_4__c"] = annualizedTcvYear4;
  quote.record["Annualized_TCV_Year_5__c"] = annualizedTcvYear5;
  //Models
  quote.record["Total_Models_Amount_All_Years__c"] = modelsYear1 + modelsYear2 + modelsYear3 + modelsYear4 + modelsYear5;
  quote.record["Total_Models_Amount_Year_1__c"] = modelsYear1;
  quote.record["Total_Models_Amount_Year_2__c"] = modelsYear2;
  quote.record["Total_Models_Amount_Year_3__c"] = modelsYear3;
  quote.record["Total_Models_Amount_Year_4__c"] = modelsYear4;
  quote.record["Total_Models_Amount_Year_5__c"] = modelsYear5;
  //Data
  quote.record["Total_Data_Amount_All_Years__c"] = dataYear1 + dataYear2 + dataYear3 + dataYear4 + dataYear5;
  quote.record["Total_Data_Amount_Year_1__c"] = dataYear1;
  quote.record["Total_Data_Amount_Year_2__c"] = dataYear2;
  quote.record["Total_Data_Amount_Year_3__c"] = dataYear3;
  quote.record["Total_Data_Amount_Year_4__c"] = dataYear4;
  quote.record["Total_Data_Amount_Year_5__c"] = dataYear5;
  //Apps
  quote.record["Total_Apps_Amount_All_Years__c"] = appsYear1 + appsYear2 + appsYear3 + appsYear4 + appsYear5;
  quote.record["Total_Apps_Amount_Year_1__c"] = appsYear1;
  quote.record["Total_Apps_Amount_Year_2__c"] = appsYear2;
  quote.record["Total_Apps_Amount_Year_3__c"] = appsYear3;
  quote.record["Total_Apps_Amount_Year_4__c"] = appsYear4;
  quote.record["Total_Apps_Amount_Year_5__c"] = appsYear5;
  //Platform
  quote.record["Total_Platform_Amount_All_Years__c"] = platformYear1 + platformYear2 + platformYear3 + platformYear4 + platformYear5;
  quote.record["Total_Platform_Amount_Year_1__c"] = platformYear1;
  quote.record["Total_Platform_Amount_Year_2__c"] = platformYear2;
  quote.record["Total_Platform_Amount_Year_3__c"] = platformYear3;
  quote.record["Total_Platform_Amount_Year_4__c"] = platformYear4;
  quote.record["Total_Platform_Amount_Year_5__c"] = platformYear5;
  //Legacy Software
  quote.record["Total_Legacy_Software_Amount_All_Years__c"] = legacySoftwareYear1 + legacySoftwareYear2 + legacySoftwareYear3 + legacySoftwareYear4 + legacySoftwareYear5;
  quote.record["Total_Legacy_Software_Amount_Year_1__c"] = legacySoftwareYear1;
  quote.record["Total_Legacy_Software_Amount_Year_2__c"] = legacySoftwareYear2;
  quote.record["Total_Legacy_Software_Amount_Year_3__c"] = legacySoftwareYear3;
  quote.record["Total_Legacy_Software_Amount_Year_4__c"] = legacySoftwareYear4;
  quote.record["Total_Legacy_Software_Amount_Year_5__c"] = legacySoftwareYear5;
  //Services
  quote.record["Total_Services_All_Years__c"] = servicesYear1 + servicesYear2 + servicesYear3 + servicesYear4 + servicesYear5;
  quote.record["Total_Services_Year_1__c"] = servicesYear1;
  quote.record["Total_Services_Year_2__c"] = servicesYear2;
  quote.record["Total_Services_Year_3__c"] = servicesYear3;
  quote.record["Total_Services_Year_4__c"] = servicesYear4;
  quote.record["Total_Services_Year_5__c"] = servicesYear5;
  //discount off List
  quote.record["Discount_Off_List_Total_Year_1__c"] = totalDiscountYear1 / listTotalYear1 * 100;
  quote.record["Discount_Off_List_Total_Year_2__c"] = totalDiscountYear2 / listTotalYear2 * 100;
  quote.record["Discount_Off_List_Total_Year_3__c"] = totalDiscountYear3 / listTotalYear3 * 100;
  quote.record["Discount_Off_List_Total_Year_4__c"] = totalDiscountYear4 / listTotalYear4 * 100;
  quote.record["Discount_Off_List_Total_Year_5__c"] = totalDiscountYear5 / listTotalYear5 * 100;
    //Check for duplicate grouping Quote Line products
  if (findDuplicates(groupingsStrArray).length > 0) {
        window.alert('There are duplicate grouping products on the Quote: ' + groupingsStrArray +'.  Please ensure that only one grouping of each type is present on the Quote before saving.');
    }
  return Promise.resolve();
}

//sets fields to not editable if return false
export function isFieldEditable(fieldName, line) {
  if(line){
    if (fieldName == 'Software_Compatibility__c' || fieldName == 'AdditionalDiscountUnit__c' || fieldName == 'List_Unit_Price_QLE__c' || fieldName == 'Regular_Unit_Price_QLE__c') {
      return false
    }
  }
  if(line.SBQQ__SegmentIndex__c == 1 && line.SBQQ__RenewedSubscription__c == null) {
    if (fieldName == 'SBQQ__Uplift__c') {
    }
  }
  if(line.SBQQ__Bundle__c){
    if (fieldName == 'Package_Discount_Perc__c') {
      return false
    }
  }
  if(line.SBQQ__UpgradedAsset__c){
      if (fieldName == 'SBQQ__Quantity__c' || fieldName == 'SBQQ__Uplift__c') {
          return false
        }
  }
return null;
}
