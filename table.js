const UP_ARROW_CLASS = "ti ti-arrow-bar-up";
const DOWN_ARROW_CLASS = "ti ti-arrow-bar-down";
const SORT_CLASS = "ti ti-arrows-up-down";

const sortStates = ["rankAsc", "rankDesc", "dateAsc", "dateDesc", "unsorted"];
let currentState = "unsorted";

const rankingHeading = document.getElementById("ranking-heading");
const bdayHeading = document.getElementById("bday-heading");

let rankArrows = document.createElement("i");
let bdayArrows = document.createElement("i");

rankArrows.className = SORT_CLASS;
bdayArrows.className = SORT_CLASS;

rankingHeading.appendChild(rankArrows);
bdayHeading.appendChild(bdayArrows);

const tbody = document.getElementById("table-body");

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
        const ORIGINAL_STATE = data;

        ORIGINAL_STATE.forEach(date => {
          renderRows(date);
        });

        rankingHeading.onclick = (e) => {
          e.preventDefault();
          console.log("click rank header");
          switch(currentState) {
            case "rankAsc":
              currentState = "rankDesc";
              rankArrows.className = DOWN_ARROW_CLASS;
              data.sort((a, b) => b.rank - a.rank);
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              data.forEach(date => renderRows(date));
              break;
            case "rankDesc":
              currentState = "unsorted";
              rankArrows.className = SORT_CLASS;
              bdayArrows.className = SORT_CLASS;
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              ORIGINAL_STATE.forEach(date => renderRows(date));
              break;
            default:
              currentState = "rankAsc";
              rankArrows.className = UP_ARROW_CLASS;
              data.sort((a, b) => a.rank - b.rank);
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              data.forEach(date => renderRows(date));
              break;
          }
        }

        bdayHeading.onclick = (e) => {
          e.preventDefault();
          console.log("click bday header");
          switch(currentState) {
            case "bdayAsc":
              currentState = "bdayDesc";
              bdayArrows.className = DOWN_ARROW_CLASS;
              data.sort((a, b) => dayjs(`2023-${b.birthday}`) - dayjs(`2023-${a.birthday}`));
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              data.forEach(date => renderRows(date));
              break;
            case "bdayDesc":
              currentState = "unsorted";
              rankArrows.className = SORT_CLASS;
              bdayArrows.className = SORT_CLASS;
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              ORIGINAL_STATE.forEach(date => renderRows(date));
              break;
            default:
              currentState = "bdayAsc";
              bdayArrows.className = UP_ARROW_CLASS;
              data.sort((a, b) => dayjs(`2023-${a.birthday}`) - dayjs(`2023-${b.birthday}`));
              tbody.innerHTML = "";
              console.log(tbody.innerHTML);
              data.forEach(date => renderRows(date));
              break;
          }
        }
     });



