public class fetchStandardPriceBook{
    private static Pricebook2 standardPricebook;
    
    private static void queryStandardPriceBook(){
        if (standardPricebook == null) {
            List<Pricebook2> pricebooks = [SELECT Id, IsActive, IsStandard 
                                           FROM Pricebook2 
                                           WHERE IsActive = TRUE AND IsStandard = TRUE 
                                           LIMIT 1];
            if (!pricebooks.isEmpty()) {
                standardPricebook = pricebooks[0];
            }
        }
    }

    public static Id getStandardPriceBookId(){
        queryStandardPriceBook();
        return standardPricebook != null ? standardPricebook.Id : null;
    }
  
    public static Pricebook2 getStandardPriceBook(){
        queryStandardPriceBook();
        return standardPricebook;
    }
}
