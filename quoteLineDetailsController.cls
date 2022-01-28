public with sharing class quoteLineDetailsController{

    public Id recordId {get; set;}
    public SBQQ__QuoteLine__c record {get;set;}
       
    public quoteLineDetailsController(ApexPages.StandardController stdController){
        //When you use the id parameter, the standard controller / extension gets populated automatically
        this.recordId = stdController.getId();
        this.record = (SBQQ__QuoteLine__c )stdController.getRecord();                    
    }
}
