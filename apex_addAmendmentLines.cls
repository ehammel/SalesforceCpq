Public Class addAmendmentLines{

    Public static List<SBQQ__QuoteLine__c> addLines(List<SBQQ__Quote__c> quoteList){
        Set<ID> contractIds = new Set<ID>();
        List<SBQQ__QuoteLine__c> amendmentLines = new List<SBQQ__QuoteLine__c>();
        Map<ID, ID> masterContractIdToQuote = new Map<ID, ID>();
        for(SBQQ__Quote__c quote : quoteList){
               if(quote.SBQQ__Type__c == 'Amendment'){
                   if(quote.SBQQ__MasterContract__c != null){
                        contractIds.add(quote.SBQQ__MasterContract__c);
                        masterContractIdToQuote.put(quote.SBQQ__MasterContract__c, quote.ID);
                   }
                }
           }
        List<Asset> assets = new List<Asset>();
        if(contractIds.size() > 0){
            assets = [SELECT id, Product2Id, Contract__c, Quantity, SBQQ__SegmentIndex__c, SBQQ__SegmentLabel__c, SBQQ__SegmentKey__c, SBQQ__PriceDimension__c, SBQQ__ListPrice__c, SBQQ__RegularPrice__c, SBQQ__PricingMethod__c, PricebookEntryID__c, Terminated_Date__c  FROM Asset WHERE Contract__c in :contractIds]; 
        }
        if(assets.size() > 0){
            for(Asset ass : assets){
                if(ass.Terminated_Date__c == null){
                    SBQQ__QuoteLine__c amendmentLine = new SBQQ__QuoteLine__c();
                    amendmentLine.SBQQ__Quote__c = masterContractIdToQuote.get(ass.Contract__c);
                    amendmentLine.SBQQ__UpgradedAsset__c = ass.Id;
                    amendmentLine.SBQQ__Product__c = ass.Product2Id;
                    amendmentLine.SBQQ__Quantity__c = ass.Quantity;
                    amendmentLine.SBQQ__AllowAssetRefund__c = TRUE;
                    //Effective Quantity = 0
                    amendmentLine.SBQQ__PriorQuantity__c = ass.Quantity;
                    amendmentLine.SBQQ__SegmentIndex__c = ass.SBQQ__SegmentIndex__c;
                    amendmentLine.SBQQ__SegmentLabel__c = ass.SBQQ__SegmentLabel__c;
                    amendmentLine.SBQQ__SegmentKey__c = ass.SBQQ__SegmentKey__c;
                    amendmentLine.SBQQ__Dimension__c = ass.SBQQ__PriceDimension__c;
                    amendmentLine.SBQQ__ListPrice__c = ass.SBQQ__ListPrice__c;
                    amendmentLine.SBQQ__RegularPrice__c = ass.SBQQ__RegularPrice__c;
                    amendmentLine.SBQQ__PricingMethod__c = ass.SBQQ__PricingMethod__c;
                    amendmentLine.SBQQ__PricebookEntryId__c = ass.PricebookEntryID__c;
                    amendmentLine.SBQQ__Existing__c = TRUE;
                    amendmentLine.SBQQ__UpgradedQuantity__c = ass.Quantity;
                    amendmentLines.add(amendmentLine);
                }
            }
        }
        return amendmentLines;
    }

}
