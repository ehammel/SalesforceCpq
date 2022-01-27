public class fetchStandardPriceBook{
  public static Id queryStandardPriceBookId(){
      List<Pricebook2> standardPricebook = [SELECT Id, IsActive, IsStandard FROM Pricebook2 WHERE IsActive = TRUE AND IsStandard = TRUE LIMIT 1];
      Id standardPriceBookId = standardPricebook[0].Id;
      return standardPriceBookId;
  }
  public static Pricebook2 queryStandardPriceBook(){
      List<Pricebook2> standardPricebook = [SELECT Id, IsActive, IsStandard FROM Pricebook2 WHERE IsActive = TRUE AND IsStandard = TRUE LIMIT 1];
      return standardPricebook[0];
  }
}
