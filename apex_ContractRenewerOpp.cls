/**
* Simple Class to use the Renew API to renew a contract
*/
public with sharing class ContractRenewerOpp {

    public Opportunity opp { get; private set; }
    
    public ContractRenewerOpp(ApexPages.StandardController controller) {
        opp =  (Opportunity) controller.getRecord();
    }
    
    public PageReference renewContract() {
        ContractRenewer renewer = new ContractRenewer();
        RenewalContext input = new RenewalContext();
        input.masterContractId = null;
        input.renewedContracts = [SELECT Id FROM Contract WHERE Id = :opp.SBQQ__RenewedContract__c];
        
        if (!input.renewedContracts.isEmpty()) {
            renewer.load(null, JSON.serialize(input));
        }

        PageReference pageRef = new PageReference('/'+opp.Id);
        pageRef.setRedirect(true);
        return pageRef; //Returns to the opp page
    }  
}
