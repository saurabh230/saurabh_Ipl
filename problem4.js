var fs = require('fs')
var csv = require('fast-csv')
require('./IdOfAnySeason.js')();
var deliveriesStream = fs.createReadStream('deliveries.csv');
var economicalBwrsPerSeason = {};
var blrAllRuns={};
var blrAllBolls={};
var season = '2015'
var matchesIn2015 = getIdOfAnySeason(season);
csv
.fromStream(deliveriesStream, {headers : true})
.on("data", function(delivery){
   if (existInArray(delivery['match_id'],matchesIn2015)){
    let runPerBall=parseInt(delivery['total_runs'])-parseInt(delivery['bye_runs'])-parseInt(delivery['legbye_runs']);
    if (blrAllRuns[delivery['bowler']] !== undefined){
        blrAllRuns[delivery['bowler']] +=runPerBall;
     } else {
        blrAllRuns[delivery['bowler']] =runPerBall;
     }
     if (blrAllBolls[delivery['bowler']] !== undefined){
        blrAllBolls[delivery['bowler']] +=1;
     } else {
        blrAllBolls[delivery['bowler']] =1;
     }

     



   }

   for(var x in blrAllBolls){
       blrAllOvers[x]=blrAllBolls[x]/6;
   }
})
.on("end", function(){
    console.log(blrAllOvers);
});
function existInArray(value,array){
    var count=array.length;
    for(var i=0;i<count;i++){
        if(array[i] === value)
            return true;
    }
    return false;
}