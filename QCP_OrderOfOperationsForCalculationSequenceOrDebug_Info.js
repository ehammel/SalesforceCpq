/* READ ME **
CPQ Pricing Order of Operations with in-line Custom Script (QCP).  

Function: Displays field and data during various steps of calculation sequence. Helpful for debugging and advanced pricing development.
Numbers designate a pricing step executing.

Note: This must be populated in a Custom Script record. Input the name of the Custom Script record under Installed Packages > CPQ > Plugins > Quote Calculator Plugin
Remove or comment the printModels method before deployment.
*/

// Salesforce loads related records

//1. Price Rules with Calculator Evaluation Event "On Init" execute

//2. QCP onInit executes
export function onInit(quoteLineModels, conn) {
    printModels('onInit', quoteLineModels, conn);
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
