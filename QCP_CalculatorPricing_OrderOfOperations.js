/*
Custom Script (QCP).  Function: prints Quote, Quote Line and Connection Models (conn) in the browser.  Copy and paste this code into a Custom Script record and then populate the name of the Custom Script record in the CPQ installed package settings 
Order of Operations (OOP) numerated and compared against the OOP for Price Rules.
*/

//1. Price Rules with Calculator Evaluation Event "On Init" execute

//2. QCP onInit executes
export function onInit(quoteLineModels, conn) {
    console.log('=====START ===== ON INIT PRICE RULES=====');
    console.log('onInit()', quoteLineModels, conn);
    console.log('=====END ===== ON INIT PRICE RULES=====');
    return Promise.resolve();
}

// 3. Price Rules Calculator Evaluation Event "on before calculate" execute

// 4. QCP onBeforeCalculate executes
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    console.log('=====START ===== BEFORE CALCULATE PRICE RULES=====');
    console.log('onBeforeCalculate()', quoteModel, quoteLineModels, conn);
    console.log('=====END ===== BEFORE CALCULATE PRICE RULES=====');
    return Promise.resolve();
}

// 5. QCP onBeforePriceRules executes
export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {        
   console.log('=====START ===== BEFORE PRICE RULES PRICE RULES=====');
   console.log('onBeforePriceRules()', quoteModel, quoteLineModels, conn);
   console.log('=====END ===== BEFORE PRICE RULES PRICE RULES=====');
    return Promise.resolve();
}

// 6. Price Rules with Calculator Evaluation Event "On Calculate" Execute

// 7. QCP onAfterPriceRules executes
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
   console.log('=====START ===== AFTER PRICE RULES PRICE RULES=====');
    console.log('onAfterPriceRules()', quoteModel, quoteLineModels, conn);
   console.log('=====END ===== AFTER PRICE RULES PRICE RULES=====');
    return Promise.resolve();
}

// 8. Price rules with Calculator Evaluation Event "After Calculate" Execute

// 9. QCP OnAfterCalculate executes
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    console.log('=====START ===== AFTER CALCULATE PRICE RULES=====');
    console.log('onAfterCalculate()', quoteModel, quoteLineModels, conn);
    console.log('=====END ===== AFTER CALCULATE PRICE RULES=====');
    return Promise.resolve();
}
