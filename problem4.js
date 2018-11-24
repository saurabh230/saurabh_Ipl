var fs = require('fs')
var match = fs.readFileSync('matches.csv', 'utf8');
var lineArrOfMatches = match.split('\n');
var delivery = fs.readFileSync('deliveries.csv', 'utf8');
var lineArrOfDelivery = delivery.split('\n');
var matches = [];
for(var rowsInMatch = 1; rowsInMatch < lineArrOfMatches.length; rowsInMatch++){
   matches[rowsInMatch] = lineArrOfMatches[rowsInMatch].split(',');
}
var deliveries = [];
for(var rowsIndelivery = 1; rowsIndelivery < lineArrOfDelivery.length; rowsIndelivery++){
   deliveries[rowsIndelivery] = lineArrOfDelivery[rowsIndelivery].split(',');
}
var year='2015';
var economicalTopBowler = {};
var objOfMatchIdSeason = getKeyValueFromMatch();
function getKeyValueFromMatch(){
    var tempObj = {};
    for(var i = 1; i < matches.length; i++){
        tempObj[matches[i][0]] = matches[i][1];
    }
    return tempObj;
}
var bowlers = getBowlersOfAnySeason();
var bowlerObj = {};
for(var i = 0; i < bowlers.length; i++){
   var runs = 0;
   var del = 0;
   for(var j = 1; j < deliveries.length; j++){
       if(bowlers[i] === deliveries[j][8] && objOfMatchIdSeason[deliveries[j][0]] === year){
           del++;
           runs = runs+parseInt(deliveries[j][9])+parseInt(deliveries[j][10])+parseInt(deliveries[j][13])+parseInt(deliveries[j][15]);
       }
   }
   var overs = del/6;   
    bowlerObj[bowlers[i]] = (runs/overs);
}
function sortValues(){
    var sortBwlr = [];
for (var bwlr in bowlerObj) {
    sortBwlr.push([bwlr, bowlerObj[bwlr]]);
}
sortBwlr.sort(function(a, b) {
    return a[1] - b[1];
});
    return sortBwlr;
}

function getBowlersOfAnySeason(){
    var tempArr = [];
    for(var i = 1; i < deliveries.length; i++){
        if(objOfMatchIdSeason[deliveries[i][0]] === year){
            tempArr.push(deliveries[i][8]);
        }
    }
    var bowlerArr = [];
    for(var i = 0; i < tempArr.length; i++){
        var count = 0;
        for(var j = i+1; j < tempArr.length; j++){
            if(tempArr[i] === tempArr[j]){
                count++;
                break;
            }
        }
        if(count === 0)
            bowlerArr.push(tempArr[i]);
    }
    return bowlerArr;
 }
 
var sortBwlr = sortValues();
for(var i = 0; i < 10; i++){    
    var str = sortBwlr[i].toString();
    var temp = str.split(',');
    economicalTopBowler[temp[0]] = temp[1];
}
console.log('====Economical Top Bowler Of Season 2015====')
console.log(economicalTopBowler);