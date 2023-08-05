/* Note! Remember that toggling of SBQQ.TriggerControl is a heavy operation. 
Use it wisely and remember that it will not only bypass CPQ validations but all CPQ logic that is set to run on these triggers. 
Make sure you're not bypassing any necessary validations or logic by disabling these triggers.
*/

public class resetOrder {
  public static void resetOrder(List<Order> orders) {
    //disable CPQ triggers to get around validation
    SBQQ.TriggerControl.disable();
    
    List<OrderItem> orderProds = [SELECT Id, SBQQ__Contracted__c FROM OrderItem WHERE OrderId in: orders];
    for(OrderItem op : orderProds){
      op.SBQQ__Contracted__c = FALSE;
    }
    update orderProds;
      
    for(Order o : orders){
      o.SBQQ__Contracted__c = FALSE;
      o.Status = 'Draft';
    }
    update orders;
    
    //re-enable CPQ triggers
    SBQQ.TriggerControl.enable();
  }
}
