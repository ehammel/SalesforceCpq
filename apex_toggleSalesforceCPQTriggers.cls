public class toggleSalesforceCPQTriggers{
    public static void disableTriggers(boolean TurnOff){
        if(TurnOff){
            SBQQ.TriggerControl.disable();
        } else {
            SBQQ.TriggerControl.enable();
        }
    }
}
