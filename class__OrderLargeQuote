public with sharing class OrderLargeQuote {
    public Id quoteId { get; set; }
    public SBQQ__Quote__c quote { get; set; }
    public Id owner {get; set;}
    
    public OrderLargeQuote(ApexPages.StandardController controller) {
       quote =  (SBQQ__Quote__c) controller.getRecord();
       owner = quote.OwnerId;
       quoteId = quote.Id;
    }
    
    public pageReference orderQuote(){
       List<Id> quoteIds = new List<Id>();
       quoteIds.add(quoteId);
       FutureMethodQuoteOrdering.processRecords(quoteIds);
       PageReference pageRef = new PageReference('/'+quoteId);
       pageRef.setRedirect(true);
       return pageRef;
    }
}
