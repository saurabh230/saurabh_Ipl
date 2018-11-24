var fs = require('fs')
var csv = require('fast-csv')
var matchesStream = fs.createReadStream("matches.csv");
var matchesPerSeason = {};
csv
.fromStream(matchesStream, {headers : true})
.on("data", function(match){
    if (matchesPerSeason[match['season']] !== undefined){
        matchesPerSeason[match['season']] += 1
    }
    else {
        matchesPerSeason[match['season']] = 1
    }
})
.on("end", function(){
    console.log(matchesPerSeason);
});
