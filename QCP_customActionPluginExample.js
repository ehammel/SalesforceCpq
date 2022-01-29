// *When to use it:* When advanced pricing logic is required on a Clone action, leverage this custom action plugin to set field values on the source record, cloned record and Quote.  Clone custom actions include:

// Sample use case
// When cloning a Quote Line, the discount on the new, cloned quote line should be reset to blank field values.

export function onBeforeCloneLine(quote, clonedLines) {
clonedLines.originalLines.standard.forEach(function (line){

});

   return Promise.resolve();
}

export function onAfterCloneLine(quote, clonedLines) {
    clonedLines.originalLines.standard.forEach(function (line){
    //do stuff to Original, Source lines
    });
   clonedLines.clonedLines.standard.forEach(function (line){
    //do stuff to new, cloned lines
    line.record["SBQQ__Discount__c"] = null;
    line.record["SBQQ__AdditionalDiscountAmount__c"] = null;
});
   return Promise.resolve();
}
