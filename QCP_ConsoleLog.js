/*
Custom Script (QCP).  Function: prints Quote, Quote Line and Connection Models (conn) in the browser.  Copy and paste this code into a Custom Script record and then populate the name of the Custom Script record in the CPQ installed package settings 
*/

export function onInit(quoteLineModels, conn) {
    console.log('=====START ===== ON INIT PRICE RULES=====');
    console.log('onInit()', quoteLineModels, conn);
    console.log('=====END ===== ON INIT PRICE RULES=====');
    return Promise.resolve();
}

export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    console.log('=====START ===== BEFORE CALCULATE PRICE RULES=====');
    console.log('onBeforeCalculate()', quoteModel, quoteLineModels, conn);
    console.log('=====END ===== BEFORE CALCULATE PRICE RULES=====');
    return Promise.resolve();
}

export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {        
   console.log('=====START ===== BEFORE PRICE RULES PRICE RULES=====');
   return Promise.resolve();
   console.log('=====END ===== BEFORE PRICE RULES PRICE RULES=====');
}

export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
   console.log('=====START ===== AFTER PRICE RULES PRICE RULES=====');
    console.log('onAfterPriceRules()', quoteModel, quoteLineModels, conn);
   console.log('=====END ===== AFTER PRICE RULES PRICE RULES=====');
    return Promise.resolve();
}

export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    console.log('=====START ===== AFTER CALCULATE PRICE RULES=====');
    console.log('onAfterCalculate()', quoteModel, quoteLineModels, conn);
    console.log('=====END ===== AFTER CALCULATE PRICE RULES=====');
    return Promise.resolve();
}
