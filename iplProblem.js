var fs = require('fs')
var match=fs.readFileSync('matches.csv', 'utf8');
var arr=match.split('\n');
var delivery=fs.readFileSync('deliveries.csv', 'utf8');
var arrDel=delivery.split('\n');


var matches=[];
var obj={};
for(var i=0;i<arr.length;i++){
   matches[i]=arr[i].split(',');
}
var deliveries=[];

for(var i=0;i<arrDel.length;i++){
   deliveries[i]=arrDel[i].split(',');
}
var years = getYears().sort();
console.log("-----------------------------------------------------------");

console.log('All Matches Played Per Year in IPL: ');
console.log('-------------------------------------------------------');
var x=0;
for(var i=0;i<years.length;i++){
   var n=0;
   for(var j=1;j<matches.length;j++)   {
       if(years[i]==matches[j][1])
           n++;
   }
    obj[years[i]]=n;
}
function getYears(){
   var year = [];
   for(var i=matches.length-1;i>0;i--){
       var count = 0;
       for(var j=i-1;j>0;j--){
           if(matches[i][1]==matches[j][1]){
               count++;
               break;
           }
       }
       if(count==0&&matches[i][1]!==undefined)
           year.push(matches[i][1])
   }
   return year;
}
console.log(obj);
//-----------------------------------------------------------------------------------------

var obj2={};
temp=[];
for(let i=1;i<matches.length;i++){
    temp.push(matches[i][1]);
}
temp.sort();
var h=1;
for(let i=0;i<years.length;i++){
    var objTemp={};
    var arrTemp=[];
    while(years[i]===temp[h]&&matches[h][10]!==undefined){
        arrTemp.push(matches[h][10]);
        h++;
    }
    var count1=1;
    arrTemp.sort();
    var c=arrTemp[0];
    for(let p=1;p<arrTemp.length;p++){
        let o=arrTemp[p];
        if(c===arrTemp[p]){
            count1++;
        }
        else {
            c=arrTemp[p];
            count1=0;
        }
        if(count1!==0&&o!=undefined)
            objTemp[o]=count1;
    }
    obj2[years[i]]=objTemp;
}
console.log("-----------------------------------------------------------");
console.log('2). Matches per year each team:');
console.log("-----------------------------------------------------------");

console.log(obj2);


//-----------------------------------------------------------------
console.log("-----------------------------------------------------------");
console.log('3). The year 2016 the extra runs conceded per team');
console.log("-----------------------------------------------------------");
var obj3={};
var arrOfMatchId=[];
for(let i=1;i<matches.length;i++){
    if(parseInt(matches[i][1])===2016){
        arrOfMatchId.push(matches[i][0]);
    }
}
let max=parseInt(arrOfMatchId[arrOfMatchId.length-1]);
let min=parseInt(arrOfMatchId[0]);
for(let i=0;i<deliveries.length;i++){
    let del=parseInt(deliveries[i][0]);
    if(del>=min&&del<=max){
        var bowTeam=deliveries[i][3];
        var extra=parseInt(deliveries[i][16]);
        if(obj3[bowTeam]===undefined)
            obj3[bowTeam]='0';
        obj3[bowTeam]=parseInt(obj3[bowTeam])+extra;
    }
}

console.log(obj3);

//-----------------------------------------------------------------
console.log("-----------------------------------------------------------");
console.log('4). The year 2015 the top economical bowlers');
console.log("-----------------------------------------------------------");

/*var obj4={};
var arrOfMatchId1=[];
for(let i=1;i<matches.length;i++){
    if(parseInt(matches[i][1])===2015){
        arrOfMatchId1.push(matches[i][0]);
    }
}
let max=parseInt(arrOfMatchId1[arrOfMatchId1.length-1]);
let min=parseInt(arrOfMatchId1[0]);

for(let i=0;i<deliveries.length;i++){
    let del=parseInt(deliveries[i][0]);
    if(del>=min&&del<=max){
        


    }
}*/
var matchIdSeason = getKeyValue();
function getKeyValue()
{
    var ob = {};
    for(var i=1;i<matches.length;i++)
    {
        ob[matches[i][0]]=matches[i][1];
    }
    return ob;
}
var bowlers = getBowlers();
var bowlerObj = {};
for(var i=0;i<bowlers.length;i++){
   var runs = 0;
   var del = 0;
   for(var j=1;j<deliveries.length;j++){
       if(bowlers[i]==deliveries[j][8] && matchIdSeason[deliveries[j][0]]=='2015'){
           del++;
           runs=runs+parseInt(deliveries[j][9])+parseInt(deliveries[j][10])+parseInt(deliveries[j][13])+parseInt(deliveries[j][15]);
       }
   }
   var overs = del/6;   
    bowlerObj[bowlers[i]]=(runs/overs);
}
var sortBwlr = [];
for (var bwlr in bowlerObj) {
   sortBwlr.push([bwlr, bowlerObj[bwlr]]);
}
function getBowlers(){
   var ar1 = [];
   for(var i=1;i<deliveries.length;i++){
       if(matchIdSeason[deliveries[i][0]]=='2015'){
           ar1.push(deliveries[i][8]);
       }
   }
   var bowler = [];
   for(var i=0;i<ar1.length;i++){
       var count = 0;
       for(var j=i+1;j<ar1.length;j++){
           if(ar1[i]==ar1[j]){
               count++;
               break;
           }
       }
       if(count==0)
           bowler.push(ar1[i]);
   }
   return bowler;
}
var obj4={};
for(var i=0;i<10;i++)
{
    var str = sortBwlr[i].toString();
    var temp = str.split(',');

    obj4[temp[0]]=temp[1];
}
console.log(obj4);
