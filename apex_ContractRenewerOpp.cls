/**
* Simple Class to use the Renew API to renew a contract
*/
public with sharing class ContractRenewerOpp {

    public Opportunity opp { get; private set; }
    
    public ContractRenewerOpp(ApexPages.StandardController controller) {
        opp =  (Opportunity) controller.getRecord();
    }
    
    @AuraEnabled
    public static PageReference renewContract(List<Contract> renewedContracts, Id oppId) {
        try {
            ContractRenewer renewer = new ContractRenewer();
            RenewalContext input = new RenewalContext();
            input.masterContractId = null;
            input.renewedContracts = renewedContracts;
            
            if (!input.renewedContracts.isEmpty()) {
                renewer.load(null, JSON.serialize(input));
            }

            PageReference pageRef = new PageReference('/'+oppId);
            pageRef.setRedirect(true);
            return pageRef; //Returns to the opp page
        } catch(Exception e) {
            ApexPages.addMessages(e);
            return null;
        }  
    }  
}
