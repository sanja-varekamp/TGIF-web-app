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
let array10LeastLoyal = [];

let array10MostLoyal = [];
let numberVotes2 = [];

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
        sum += array[j].votes_with_party_pct;
    }
    return sum
}

// average votes %
function partyAverageVotes(array, sumX) {
    let averageX = 0;
    averageX = Math.round(sumX / array.length);
    console.log(sumX, array, averageX)
    return averageX;
}
atGlanceTable.dem_avg_votes = averageD;
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

// members total
function totalNumber(a, b, c) {
    let x = 0;
    x = a + b + c;
    return x
}

//percentage total 
function totalNumber2() {
    console.log(atGlanceTable.democrats, averageD)
    x = atGlanceTable.democrats * (averageD / members.length) || 0;
    y = atGlanceTable.republicans * (averageR /  members.length) || 0;
    z = atGlanceTable.independents * (averageI /  members.length) || 0;
    totalPercent = (x + y + z).toFixed(2);
}

totalNumber2();

//table Senate/House At A Glance
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

// array of objects from the 10% Least Loyal based on least votes with party %
function calculation10Bottom(array) {
    leastPartyVotes = array.slice(0).sort((a, b) => Number(a.votes_with_party_pct) - Number(b.votes_with_party_pct));
    calculate10Percent = Math.round(leastPartyVotes.length * 0.10);
    if (array.length == 105) {
        array10LeastLoyal = leastPartyVotes.slice(0, 11);
    } else {
        array10LeastLoyal = leastPartyVotes.slice(0, 45);
    }
}
calculation10Bottom(members);

//number of votes for the 10% Least Loyal, array of 11 (no need to calculate it for the original array of 105)
function partyVotes(array) {
    for (i = 0; i < array.length; i++) {
        numberVotes.push(Math.round(array[i].total_votes * (array[i].votes_with_party_pct / 100)));
    }
}
partyVotes(array10LeastLoyal);

//adding a key-value pair to the sliced array of 10%, for dinamic printing (updating the JSON object)
function updatingArrayKeys(array) {
    for (i = 0; i < array.length; i++) {
        array.map(i => i.party_votes = 0);
    }
}
updatingArrayKeys(array10LeastLoyal);

//updating the value in the key-value pair
function updatingPartyVotes(array, array2) {
    for (i = 0; i < array.length; i++) {
        array[i].party_votes = array2[i];
    }
}
updatingPartyVotes(array10LeastLoyal, numberVotes);

// table Least Loyal, Bottom 10% 
let header3 = ["Name", "No. Party Votes", "% Party Votes"];

function generateTableHead3(table, array) {

    let thead = table.createTHead();
    let row = thead.insertRow(0);
    for (i = 0; i < array.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = array[i];
        row.appendChild(cell);
    }
}

function generateTable3(table, data) {
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
        let text3 = document.createTextNode(element['party_votes']);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(Math.round(element.votes_with_party_pct));
        cell4.appendChild(text4);
    }
}

let table3 = document.getElementById("least-loyal");
let data3 = Object.keys(array10LeastLoyal);
generateTableHead3(table3, header3);
generateTable3(table3, array10LeastLoyal);

// array of objects from the 10% Most Loyal based on most votes with party %
function calculation10Top(array) {
    mostPartyVotes = array.slice(0).sort((a, b) => Number(b.votes_with_party_pct) - Number(a.votes_with_party_pct));
    calculate10Percent = Math.round(mostPartyVotes.length * 0.10);
    if (array.length == 105) {
        array10MostLoyal = mostPartyVotes.slice(0, 11);
    } else {
        array10MostLoyal = mostPartyVotes.slice(0, 45);
    }
}
calculation10Top(members);
console.log(array10MostLoyal);

//number of votes for the 10% Most Loyal, array of 11 (no need to calculate it for the original array of 105)
function partyVotes2(array) {
    for (i = 0; i < array.length; i++) {
        numberVotes2.push(Math.round(array[i].total_votes * (array[i].votes_with_party_pct / 100)));
    }
}
partyVotes2(array10MostLoyal);
console.log(numberVotes2);

//adding a key-value pair to the sliced array of 10%, for dinamic printing (updating the JSON object)
function updatingArrayKeys(array) {
    for (i = 0; i < array.length; i++) {
        array.map(i => i.party_votes = 0);
    }
}
updatingArrayKeys(array10MostLoyal);
console.log(array10MostLoyal);

//updating the value in the key-value pair
function updatingPartyVotes(array, array2) {
    for (i = 0; i < array.length; i++) {
        array[i].party_votes = array2[i];
    }
}
updatingPartyVotes(array10MostLoyal, numberVotes2);

// table Most Loyal, Top 10% 
let header4 = ["Name", "No. Party Votes", "% Party Votes"];

function generateTableHead4(table, array) {

    let thead = table.createTHead();
    let row = thead.insertRow(0);
    for (i = 0; i < array.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = array[i];
        row.appendChild(cell);
    }
}

function generateTable4(table, data) {
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
        let text3 = document.createTextNode(element['party_votes']);
        cell3.appendChild(text3);

        let cell4 = row.insertCell();
        let text4 = document.createTextNode(Math.round(element.votes_with_party_pct));
        cell4.appendChild(text4);
    }
}

let table4 = document.getElementById("most-loyal");
let data4 = Object.keys(array10MostLoyal);
generateTableHead3(table4, header4);
generateTable3(table4, array10MostLoyal);






