/*
Overview: Code fires when clone action occurs.
1. Create a Custom Script record
2. Populate Code field  with example code
3. Alter template as necessary to set the OriginalLines or ClonedClines in the clonedLines parameter.
4. Alter template as necessary to set the OriginalLines or ClonedClines in the Quote parameter.
*/

export function onBeforeCloneLine(quote, clonedLines) {
clonedLines.originalLines.standard.forEach(function (line){

});

   return Promise.resolve();
}

export function onAfterCloneLine(quote, clonedLines) {
    clonedLines.originalLines.standard.forEach(function (line){
    //do stuff on source quote lines
    });
clonedLines.clonedLines.standard.forEach(function (line){
    line.record["SBQQ__Discount__c"] = null;
    line.record["SBQQ__AdditionalDiscountAmount__c"] = null;
});
   return Promise.resolve();
}
