const UP_ARROW_CLASS = "ti ti-arrow-bar-up";
const DOWN_ARROW_CLASS = "ti ti-arrow-bar-down";
const X_BUTTON_CLASS = "ti ti-x";

const rankingHeading = document.getElementById("ranking-heading");
const bdayHeading = document.getElementById("bday-heading");

const tbody = document.getElementById("table-body");

let bdayAscButton = document.createElement("i").className;

const sortStates = ["rankAsc", "rankDesc", "dateAsc", "dateDesc", "unsorted"];

let currentState = "unsorted";

rankingHeading.onclick = (e) => {
  switch(currentState) {
    case "unsorted":
      currentState = "rankAsc";
      break;
  }
}
 
function renderRows(date) {
  let row = document.createElement("tr");
  let rankCol = document.createElement("td");
  let bdayCol = document.createElement("td");
  let rankText = document.createTextNode(`#${date.rank}`);
  let bdayText = document.createTextNode(dayjs(`2023-${date.birthday}`).format("MMMM D"));
  rankCol.appendChild(rankText);
  bdayCol.appendChild(bdayText);
  row.appendChild(rankCol);
  row.appendChild(bdayCol);
  tbody.appendChild(row);
}

fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => { 
        data.forEach(date => {
          renderRows(date);
        })
     });



