/*
CPQ Pricing Order of Operations with in-line Custom Script (QCP).  Function: prints Quote, Quote Line and Connection Models (conn) in the browser's console when on the Edit Lines (Line Editor) Visualforce page.  Copy and paste this code into a Custom Script record and then populate the name of the Custom Script record in the CPQ installed package settings 
Order of Operations (OOP) numerated and compared against the OOP for Price Rules.
*/

// Salesforce loads related records

//1. Price Rules with Calculator Evaluation Event "On Init" execute

//2. QCP onInit executes
export function onInit(quoteLineModels, conn) {
    printModels('onInit', quoteModel, quoteLineModels, conn);
    return Promise.resolve();
}

// Salesforce reloads related records, including computing Quote Line Formulas

// 3. Price Rules Calculator Evaluation Event "on before calculate" execute

// 4. QCP onBeforeCalculate executes
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    printModels('onBeforeCalculate', quoteModel, quoteLineModels, conn);
    return Promise.resolve();
}

// Salesforce reloads related records, and calculates quote line quantities

// 5. QCP onBeforePriceRules executes
export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {        
    printModels('onBeforePriceRules', quoteModel, quoteLineModels, conn);
    return Promise.resolve();
}

// 6. Price Rules with Calculator Evaluation Event "On Calculate" Execute

// 7. QCP onAfterPriceRules executes
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
    printModels('onAfterPriceRules', quoteModel, quoteLineModels, conn);
    return Promise.resolve();
}
// Salesforce reloads related records, including internal pricing logic. 
// NOTE: Internal pricing logic includes system discounts (i.e. discount schedules), additional disc (manual user-entered discounts), partner and distributor discounting, and special price and contracted price discounting.

// 8. Price rules with Calculator Evaluation Event "After Calculate" Execute

// 9. QCP OnAfterCalculate executes
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    printModels('OnAfterCalculate', quoteModel, quoteLineModels, conn);
    return Promise.resolve();
}

// Salesforce reloads related records and calculates all formulas
function printModels (calcStep, quoteModel, quoteLineModels, conn){
    console.log('=====START ===== ' + calcStep);
    console.log('Models: ', quoteModel, quoteLineModels, conn);            
    console.log('=====END ===== ' + calcStep);            
}
