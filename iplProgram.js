var XLSX = require('xlsx')
var workbook = XLSX.readFile('matches.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


workbook = XLSX.readFile('deliveries.xlsx');
sheet_name_list = workbook.SheetNames;
var xlData1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


//console.log(xlData1.length);
var obj={};
var arr=[];
var objWinner={};
var arrWinner=[];
for(let i=0;i<xlData.length;i++){
    var x=xlData[i];
   arr.push(x.season);
   arrWinner.push(x.winner);
}

arrWinner.sort();
var a=arr[0];
var count=1;
var b=arrWinner[0];
var countw=1;
for(let j=1;j<arr.length;j++){
    var y=arr[j];
    if(a===arr[j]){
        count++;
    }
    else{
        a=arr[j];
        count=0;
        j--;
    }
    if(count!==0)
    obj[y]=count;
}
for(var g in obj){
for(let j=1;j<arr.length;j++){
    var z=arrWinner[j];
    if(b===z){
        countw++;
    }
    else{
        b=arrWinner[j];
        countw=0;
        j--;
    }
    if(countw!==0&&z!==undefined)
    objWinner[z]=countw;
}
}
console.log("1). The number of matches played per year of all the years in IPL")
console.log(obj)

console.log("---------------------------------------------------------")
console.log("2). Matches won of all teams over all the years of IPL")
console.log(objWinner)
/*
var obj3={};
var arrERun=[];
for(let i=0;i<xlData1.length;i++){
    let p=xlData1[i];
    arrERun.push(x.bowling_team);
}
console.log(arrERun.length)*/