/*
Method:
SumFieldToParentProduct.  Inputs: Parent Quote Line Model, Quote Line API name for field to sum

Function:
** Sums parent Quote Line's field and child products' same field values to the parent Quote Line.
** Particuarly useful when multiple bundles of the same product can exist on a Quote.

How to use:
1. Input field Quote Line field API names in fieldsToSum, i.e. ["field1__c", "field2__c", ... field100__c];
2. Set parent quote line (Placement product) field under "Bundle" and "Option Level" condition based on position of field in fieldsToSum array, i.e.
   // second field in array 
   // lines[i].record["field2__c"] = sumFieldToParentProduct(lines[i], fieldsToSum[1]);
   
Customizations: 
1.  If you are only looking to sum the child products and NOT INCLUDE the parent product's price, simply set includeParentPrice to false.
*/

function sumFieldToParentProduct(parentLine, fieldToSum, includeParentPrice){
   let childProductSum = parentLine.components.reduce((acc, component) => {
     return acc + component.record[fieldToSum];
   }, 0);

   if(includeParentPrice){
      childProductSum += parentLine.components[parentLine.components.length - 1].parentItem.record[fieldToSum];
   }
   
   return childProductSum;
}

export function onBeforeCalculate(quote, lines) {
    //add Quote Line fields to fieldsToSum array
    let fieldsToSum =  ["SBQQ__OriginalPrice__c"];
    let includeParentPrice = true;

    for (let i = 0, len = lines.length; i < len; i++) {
       let line = lines[i];
       if(line.record["SBQQ__Bundle__c"] && !(line.record["SBQQ__OptionLevel__c"])){
          line.record["Total_Unit_Price__c"] = sumFieldToParentProduct(line, fieldsToSum[0], includeParentPrice);
       }
    }  
return Promise.resolve();
}
