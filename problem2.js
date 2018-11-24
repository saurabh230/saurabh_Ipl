var fs = require('fs')
var csv = require('fast-csv')
var matchesStream = fs.createReadStream("matches.csv");
var matchesWonPerTeamPerSeason = {};
csv
.fromStream(matchesStream, {headers : true})
.on("data", function(match){
    if (matchesWonPerTeamPerSeason[match['season']] !== undefined){
       if( matchesWonPerTeamPerSeason[match['season']][match['winner']] !== undefined){
           matchesWonPerTeamPerSeason[match['season']][match['winner']] += 1
       }
       else {
           matchesWonPerTeamPerSeason[match['season']][match['winner']] = 1
       }
    }
    else {
       matchesWonPerTeamPerSeason[match['season']] = {}
    }
})
.on("end", function(){
    console.log(matchesWonPerTeamPerSeason);
});