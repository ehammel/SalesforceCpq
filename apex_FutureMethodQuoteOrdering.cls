public class FutureMethodQuoteOrdering{
    @future
    public static void processRecords(List<ID> quoteRecordIds)
    {   
         // Get records based on the IDs
         List<SBQQ__Quote__c> quotes = [SELECT Id, SBQQ__Ordered__c FROM SBQQ__Quote__c WHERE Id IN :quoteRecordIds];
         // Check Ordered on Quote records
         for(SBQQ__Quote__c quote : quotes){
             quote.SBQQ__Ordered__c  = TRUE;
         }
        update quotes;
    }
}
