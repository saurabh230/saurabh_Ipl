var fs = require('fs')
var csv = require('fast-csv')
require('./IdOfAnySeason.js')();
var deliveriesStream = fs.createReadStream('deliveries.csv');
var extraRunsPerTeam = {};
var season = '2016'
var matchesIn2016 = getIdOfAnySeason(season);
csv
.fromStream(deliveriesStream, {headers : true})
.on("data", function(delivery){
   if (existInArray(delivery['match_id'],matchesIn2016)){
       if (extraRunsPerTeam[delivery['bowling_team']] !== undefined) {
           extraRunsPerTeam[delivery['bowling_team']] += parseInt(delivery['extra_runs'])
       }
       else {
           extraRunsPerTeam[delivery['bowling_team']] = parseInt(delivery['extra_runs'])
       }
   }
})
.on("end", function(){
    console.log(extraRunsPerTeam);
});

function existInArray(value,array){
    var count=array.length;
    for(var i=0;i<count;i++){
        if(array[i] === value)
            return true;
    }
    return false;
}