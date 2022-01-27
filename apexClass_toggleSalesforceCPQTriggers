//Dependency TriggerControl (Installed Package: Salesforce CPQ)

public class toggleSalesforceCPQTriggers{
//toggleSalesforceCPQTriggers
//Inputs: Checkbox, TurnOff variable
    public static void disableTriggers(boolean TurnOff){
        //Disable CPQ Triggers if TurnOff = TRUE
        if(TurnOff){
        //Check: Are CPQ triggers already disabled?  Also serves as a recursive check
            if(!SBQQ.TriggerControl.isEnabled()){
            return;
            }else{
                SBQQ.TriggerControl.disable();
            }
        }
        //Enable CPQ Triggers if TurnOff = FALSE
        if(!TurnOff){
            //Check: Are CPQ triggers already enabled?  Also serves as a recursive check
            if(SBQQ.TriggerControl.isEnabled()){
                return;
            }else{
                SBQQ.TriggerControl.enable();
            }
        }
    }
}

/*
=====================================================================
EXAMPLE IMPLEMENTATION that uses a Quote field as an input
=====================================================================

//Helper Class For Trigger_SBQQ_Quote Trigger
public without sharing class SBQQ_QuoteTriggerHelper {

    public static List<SBQQ__Quote__c> newQuotes;
    public static List<SBQQ__Quote__c> oldQuotes;
    public static Map<Id, SBQQ__Quote__c> newMapQuotes;
    public static Map<Id, SBQQ__Quote__c> oldMapQuotes;
    
    public static boolean runTrigger = TRUE;
    
    
    public static void runCheckToDisableCPQTriggers() {
        for( SBQQ__Quote__c quoteObj : newQuotes ) {
        //Disable CPQ Triggers is checked on Quote
            if(quoteObj.UZ_DisableCPQTriggers__c) {
                toggleSalesforceCPQTriggers.disableTriggers(true);
            }
        }
    }

}

*/
