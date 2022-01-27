trigger opportunityTrigger on Opportunity (before insert) {
    for(Opportunity opp : Trigger.new){
        opp.SBQQ__QuotePricebookId__c = Id.valueOf(fetchStandardPriceBookID.queryStandardPriceBookId());
        //system.debug(opp.SBQQ__QuotePricebookId__c);
        //opp.Pricebook2Id = fetchStandardPriceBookID.queryStandardPriceBookId();
        system.debug(opp.Pricebook2Id);
    }
}
