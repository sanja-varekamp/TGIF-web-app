let members = dataJ.results[0].members
let headerRow = ["Senator/Congress(wo)man", "Party Affiliation", "State", "Years in office", "Votes with Party"]
let table = document.querySelector("table");
let data = Object.keys(members[0]);
const checkBox = document.getElementsByName('party');


generateTable('senate-data', members);


function generateTable(tableID, data) {
    
    let table = document.getElementById(tableID)
    document.querySelector("table").innerHTML = "";
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (i = 0; i < headerRow.length; i++) {
        let cell = document.createElement("th");
        cell.innerHTML = headerRow[i];
        row.appendChild(cell);
    }
    
    for (let element of data) {

        let row1 = table.insertRow();
        let cell1 = row1.insertCell();
        let a = document.createElement('a');
        let link = document.createTextNode(element['first_name'] + ' ' + (element['middle_name'] || '') + ' ' + element['last_name']);
        a.appendChild(link);
        a.href = element.url;
        a.title = link;
        document.body.appendChild(a);
        cell1.appendChild(a);

        let cell3 = row1.insertCell();
        let text3 = document.createTextNode(element['party']);
        cell3.appendChild(text3);

        let cell4 = row1.insertCell();
        let text4 = document.createTextNode(element['state']);
        cell4.appendChild(text4);

        let cell5 = row1.insertCell();
        let text5 = document.createTextNode(element['seniority']);
        cell5.appendChild(text5);

        let cell6 = row1.insertCell();
        let text6 = document.createTextNode(Math.round(element['votes_with_party_pct']) + " " + "%");
        cell6.appendChild(text6);
    }
}

function checkingBoxes() {
    let selected = [];
    for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            selected.push(checkBox[i].value);
        }
    }
    return selected
}

//dropdown list
// array of states
let noDoublesArray = []
checkList = document.getElementById('state-list');
checkList.addEventListener("change", function () {
    generateTable('senate-data', filter())
});

boxD = document.getElementById("democrats");
boxD.addEventListener("click", function () {
    generateTable('senate-data', filter())
});
boxR = document.getElementById("republicans");
boxR.addEventListener("change", function () {
    generateTable('senate-data', filter())
});
boxI = document.getElementById("independents");
boxI.addEventListener("change", function () {
    generateTable('senate-data', filter())
});
function removeDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        if (noDoublesArray.indexOf(array[i].state) == -1) {
            noDoublesArray.push(array[i].state)
        }
    }
    noDoublesArray.sort((a, b) => a.localeCompare(b));
}
removeDuplicates(members);

//adding the options in the dropdown
function createOptions(element, array) {
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        txt = document.createTextNode(array[i]);
        option.appendChild(txt);
        element.insertBefore(option, element.lastChild);
    }
}
createOptions(checkList, noDoublesArray);

function filter() {
    let filteredArray = [];
    const checkBoxes = checkingBoxes();
    for (let i = 0; i < members.length; i++) {
        if (checkBoxes.includes(members[i].party) && (checkList.value == members[i].state || checkList.value == "all")) {
            filteredArray.push(members[i])
        }
    }
    return filteredArray;
}