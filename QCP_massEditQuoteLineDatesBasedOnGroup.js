/*
Methods:
1) massEditStart.  Inputs: Quote Line Group field Override_Start_Date__c (checkbox field)
2) massEditEnd.  Inputs: Quote Line Group field Override_End_Date__c (checkbox field)

Function:
** Sets Quote Line's Start Date and End Date based on Quote Line Group start date and end date value
** Minimizes data entry on Quote Line Editor (reduces clicks!)

How to use:
1. Create Override_Start_Date__c and Override_End_Date__c checkboxes on Quote Line Group object
2. Ensure Quote Line Group field set "Line Editor" has Override_Start_Date__c and Override_End_Date__c on it
3. Optional, but can add Start Date and End Date to Quote Line field set Line Editor to see Quote Line dates Set
4. Toggle Quote Line Group override checkboxes to override
*/


function massEditStart(line){
  if(line.group.record["Override_Start_Date__c"]){
    return line.group.record["SBQQ__StartDate__c"];
  }
}

function massEditEnd(line){
  if(line.group.record["Override_End_Date__c"]){
    return line.group.record["SBQQ__EndDate__c"];
  }
}

export function onBeforeCalculate(quote, lines) {
    for (var i = 0, len = lines.length; i < len; i++) {
      if(lines[i].group != null){
        if(lines[i].group.record["Override_Start_Date__c"]){
          lines[i].record["SBQQ__StartDate__c"] = massEditStart(lines[i]);
        } 
        if(lines[i].group.record["Override_End_Date__c"]){
          lines[i].record["SBQQ__EndDate__c"] = massEditEnd(lines[i]);
        } 
      }
    }    
return Promise.resolve();
}
