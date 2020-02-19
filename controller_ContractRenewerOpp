/**
* Simple Class to use the Renew API to renew a contract
*/
public with sharing class ContractRenewerOpp {

    public Id Id { get; set; }
    public Id contractID {get; set;}
    public Opportunity opp { get; set; }
    public Id owner {get; set;}
 
    public ContractRenewerOpp(ApexPages.StandardController controller) {
        opp =  (Opportunity) controller.getRecord();
        contractID = opp.SBQQ__RenewedContract__c;
        owner = opp.OwnerId;
        Id = opp.Id;
    }
    
    public pageReference renewContract(){
       List<Id> ContractIds = new List<Id>();
       RenewalContext input = new RenewalContext();
       input.masterContractId = null;
       ContractIds.add(contractID);
       List<Contract> contractsToRenew = [SELECT Id FROM Contract WHERE Id IN : ContractIds];
       input.renewedContracts = contractsToRenew;
       ContractRenewer renewer = new ContractRenewer();
       String jsonInput = JSON.serialize(input);
       if(contractsToRenew.size() > 0){
          QuoteModel[] quotes = renewer.load(null, jsonInput);
       }
       PageReference pageRef = new PageReference('/'+Id);
       pageRef.setRedirect(true);
       return pageRef; //Returns to the opp page
    }  
}
