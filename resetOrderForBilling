public class resetOrder{
  public static void resetOrder(List<Order> orders){
      List<OrderItem> orderProds = [SELECT Id, SBQQ__Contracted__c FROM OrderItem WHERE OrderId in: orders];
      for(OrderItem op : orderProds){
        op.SBQQ__Contracted__c = FALSE;
      }
      update orderProds;
      
      //disable CPQ triggers to get around validation
      SBQQ.TriggerControl.disable();
      for(Order o : orders){
        o.SBQQ__Contracted__c = FALSE;
        o.Status = 'Draft';
      }
      update orders;
      //re-enable CPQ triggers
      SBQQ.TriggerControl.enable();
  }
}
