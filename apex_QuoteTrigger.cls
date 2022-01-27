trigger quoteTrigger on SBQQ__Quote__c (after insert) {
   List<SBQQ__QuoteLine__c> amendmentLinesFromContract = new List<SBQQ__QuoteLine__c>();
   if(trigger.isAfter){  
       if(checkRecursive.runOnce()){
           amendmentLinesFromContract = addAmendmentLines.addLines(Trigger.new);
           if(amendmentLinesFromContract.size() > 0){
               insert amendmentLinesFromContract;
           }
       }
   }
}
