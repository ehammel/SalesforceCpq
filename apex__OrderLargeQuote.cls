public with sharing class OrderLargeQuote {
    public Id quoteId { get; set; }
    
    public OrderLargeQuote(Id quoteId) {
        this.quoteId = quoteId;
    }
    
    public PageReference orderQuote() {
        SBQQ__Quote__c quote = [SELECT Id, OwnerId FROM SBQQ__Quote__c WHERE Id = :quoteId];
        FutureMethodQuoteOrdering.processRecord(quoteId);
        PageReference pageRef = new PageReference('/' + quoteId);
        pageRef.setRedirect(true);
        return pageRef;
    }
}

public class FutureMethodQuoteOrdering {
    @future
    public static void processRecord(Id quoteRecordId) {
        // Get the record based on the ID
        SBQQ__Quote__c quote = [SELECT Id, SBQQ__Ordered__c FROM SBQQ__Quote__c WHERE Id = :quoteRecordId];
        quote.SBQQ__Ordered__c  = true;
        update quote;
    }
}
