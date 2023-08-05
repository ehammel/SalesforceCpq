trigger AccountTrigger on Account (before update) {
    AccountHandler.beforeUpdate(Trigger.new);
}

public class AccountHandler {

    // This set holds the IDs of accounts that we have already processed.
    private static Set<Id> processedAccounts = new Set<Id>();

    public static void beforeUpdate(List<Account> newAccounts) {
        for(Account acc : newAccounts) {
            if (!processedAccounts.contains(acc.Id)) {
                // Mark this account as processed so we don't double-process it
                processedAccounts.add(acc.Id);

                // Do your processing here...
                // ... 

                // Be careful about making updates within this loop - if you do so, it may invoke this trigger again. 
                // That's what the processedAccounts set is protecting against.
            }
        }
    }
}
