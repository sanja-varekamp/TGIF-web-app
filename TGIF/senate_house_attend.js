let members = dataJ.results[0].members;

//variables 
let atGlanceTable = {
    "democrats": 0,
    "republicans": 0,
    "independents": 0,
    "dem_avg_votes": 0,
    "rep_avg_votes": 0,
    "ind_avg_votes": 0,
    "dem_msd_votes": 0,
    "rep_msd_votes": 0,
    "ind_msd_votes": 0
};

let allRep = 0;
let sumMissedD = 0;
let sumMissedR = 0;
let sumMissedI = 0;
let averageMissedD = 0;
let averageMissedR = 0;
let averageMissedI = 0;
let totalPercent = 0;
let democrats = [];
let republicans = [];
let independents = [];
let missedVotesDescending = [];
let missedVotesAscending = [];
let array10PercentDesc = [];
let array10PercentAscd = [];

let numberVotes = [];

//function calls (tested and working)
partyArray(members, 'D', democrats);
partyArray(members, 'R', republicans);
partyArray(members, 'I', independents);
let sumD = sumPartyVotes(democrats);
let sumR = sumPartyVotes(republicans);
let sumI = sumPartyVotes(independents);
let averageD = partyAverageVotes(democrats, sumD);
let averageR = partyAverageVotes(republicans, sumR);
let averageI = partyAverageVotes(independents, sumI);
let allMembers = totalNumber(democrats.length, republicans.length, independents.length);

//function declarations 
//array of party members
function partyArray(array, partyX, partyArray) {
    for (i = 0; i < array.length; i++) {
        if (array[i].party === partyX) {
            partyArray.push(array[i]);
        }
    }
}

// sum of votes
function sumPartyVotes(array) {
    let sum = 0;
    for (j = 0; j < array.length; j++) {
        sum = sum + array[j].votes_with_party_pct;
    }
    return sum
}

// average votes %
function partyAverageVotes(array, sumX) {
    let averageX = 0;
    averageX = Math.round(sumX / array.length);
    return averageX; 
}
atGlanceTable.dem_avg_votes = averageD
atGlanceTable.rep_avg_votes = averageR;
atGlanceTable.ind_avg_votes = averageI || 0;

// members per party calculation
let res = members.reduce(function (obj, v) {
    obj[v.party] = (obj[v.party] || 0) + 1;
    return obj; 
}, {})
atGlanceTable.democrats = res.D;
atGlanceTable.republicans = res.R;
atGlanceTable.independents = res.I || 0;

console.log(atGlanceTable);

// members total
function totalNumber(a, b, c) {
    let x = 0;
    x = a + b + c;
    return x
}

//percentage total 
function totalNumber2() {
    x = atGlanceTable.democrats * (averageD / members.length) || 0;
    y = atGlanceTable.republicans * (averageR / members.length)|| 0;
    z = atGlanceTable.independents * (averageI / members.length)|| 0;
    totalPercent = (x + y + z).toFixed(2);
}

totalNumber2();

//table Senate At A Glance
let table = document.querySelector("table");
let headerRow = ["Party", "Number Of Representatives", "Voted With Party"];

function generateTableHead(table, array) {

    let thead = table.createTHead();
    let row = thead.insertRow(0);
    for (i = 0; i < array.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = array[i];
        row.appendChild(cell);
    }
}

function generateTable(table) {
    let row = table.insertRow();
    let cell1 = row.insertCell();
    cell1.innerHTML = "Democrats";

    let cell2 = row.insertCell();
    cell2.innerHTML = atGlanceTable.democrats;

    let cell3 = row.insertCell();
    cell3.innerHTML = atGlanceTable.dem_avg_votes + " " + "%";

    let row1 = table.insertRow();
    let cell4 = row1.insertCell();
    cell4.innerHTML = "Republicans";

    let cell5 = row1.insertCell();
    cell5.innerHTML = atGlanceTable.republicans;

    let cell6 = row1.insertCell();
    cell6.innerHTML = atGlanceTable.rep_avg_votes + " " + "%";

    let row2 = table.insertRow();
    let cell7 = row2.insertCell();
    cell7.innerHTML = "Independents";

    let cell8 = row2.insertCell();
    cell8.innerHTML = atGlanceTable.independents;

    let cell9 = row2.insertCell();
    cell9.innerHTML = atGlanceTable.ind_avg_votes + " " + "%";

    let row3 = table.insertRow();
    let cell10 = row3.insertCell();
    cell10.innerHTML = "Total";
    cell10.style.fontWeight = 'bold';

    let cell11 = row3.insertCell();
    cell11.innerHTML = allMembers;
    cell11.style.fontWeight = 'bold';

    let cell12 = row3.insertCell();
    cell12.innerHTML = totalPercent + " " + "%";
    cell12.style.fontWeight = 'bold';

}

generateTableHead(table, headerRow);
generateTable(table);

//Least Engaged, bottom 10% array calculations 
// sorted array in descending order of missed votes, missedVotesDescending
function calculation10Bottom(array) {
    missedVotesDescending = array.slice(0).sort((a, b) => Number(b.missed_votes) - Number(a.missed_votes));
    calculate10Percent = Math.round(missedVotesDescending.length * 0.10);
    if (array.length == 105) {
        array10PercentDesc = missedVotesDescending.slice(0, 11);
    } else {
        array10PercentDesc = missedVotesDescending.slice(0, 45);
    }
}
calculation10Bottom(members);

//table Least Engaged, bottom 10% 
let header1 = ["Name", "Number of Missed Votes", "Missed Votes %"];
let table1 = document.getElementById("least-engaged");

function generateTableHead1(table, array) {

    let thead = table.createTHead();
    let row = thead.insertRow(0);
    for (i = 0; i < array.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = array[i];
        row.appendChild(cell);
    }
}

generateTableHead1(table1, header1);

function generateTable1(table, data) {
    for (let element of data) {

        let row = table.insertRow();
        let cell1 = row.insertCell();
        let a = document.createElement('a');
        let link = document.createTextNode(element['first_name'] + ' ' + (element['middle_name'] || '') + ' ' + element['last_name']);
        a.appendChild(link);
        a.href = element.url;
        a.title = link;
        document.body.appendChild(a);
        cell1.appendChild(a);

        let cell3 = row.insertCell();
        let text3 = document.createTextNode(element['missed_votes']);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(Math.round(element.missed_votes_pct));
        cell4.appendChild(text4);
    }
}

let data1 = Object.keys(array10PercentDesc);
generateTable1(table1, array10PercentDesc);

// Most Engaged, top 10% 
// sorted array in ascending order of missed votes, missedVotesAscending
function calculation10Top(array) {
    missedVotesAscending = array.slice(0).sort((a, b) => Number(a.missed_votes) - Number(b.missed_votes));
    calculate10Percent = Math.round(missedVotesAscending.length * 0.10);
    if (array.length == 105) {
        array10PercentAscd = missedVotesAscending.slice(0, 11);
    } else {
        array10PercentAscd = missedVotesAscending.slice(0, 45);
    }
}
calculation10Top(members);

// table Most Engaged, top 10% 
let header2 = ["Name", "Number of Missed Votes", "Missed Votes %"];

function generateTableHead2(table, array) {

    let thead = table.createTHead();
    let row = thead.insertRow(0);
    for (i = 0; i < array.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = array[i];
        row.appendChild(cell);
    }
}
let table2 = document.getElementById("most-engaged");
generateTableHead2(table2, header2);

function generateTable2(table, data) {
    for (let element of data) {

        let row = table.insertRow();
        let cell1 = row.insertCell();
        let a = document.createElement('a');
        let link = document.createTextNode(element['first_name'] + ' ' + (element['middle_name'] || '') + ' ' + element['last_name']);
        a.appendChild(link);
        a.href = element.url;
        a.title = link;
        document.body.appendChild(a);
        cell1.appendChild(a);

        let cell3 = row.insertCell();
        let text3 = document.createTextNode(element['missed_votes']);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(Math.round(element.missed_votes_pct));
        cell4.appendChild(text4);
    }
}

let data2 = Object.keys(array10PercentAscd);
generateTable2(table2, array10PercentAscd);