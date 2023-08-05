trigger quoteTrigger on SBQQ__Quote__c (after insert) {
    QuoteTriggerHandler.handleAfterInsert(Trigger.new);
}

public class QuoteTriggerHandler {
    public static void handleAfterInsert(List<SBQQ__Quote__c> newQuotes) {
        List<SBQQ__QuoteLine__c> amendmentLinesFromContract = new List<SBQQ__QuoteLine__c>();
        if (CheckRecursive.runOnce()) {
            amendmentLinesFromContract = AddAmendmentLines.addLines(newQuotes);
            if (amendmentLinesFromContract != null && !amendmentLinesFromContract.isEmpty()) {
                try {
                    insert amendmentLinesFromContract;
                } catch (DmlException e) {
                    // Handle exception here. The way you handle the exception depends on the requirements
                    System.debug('An error occurred when inserting amendmentLinesFromContract: ' + e.getMessage());
                }
            }
        }
    }
}
