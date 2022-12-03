const btt = document.getElementById("btt");

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btt.style.display = "block";
  } else {
    btt.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
} 

window.onscroll = () => scrollFunction();

btt.onclick = () => topFunction();

const UP_ARROW_CLASS = "ti ti-arrows-up";
const DOWN_ARROW_CLASS = "ti ti-arrows-down";
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
        console.log(ORIGINAL_STATE);

        ORIGINAL_STATE.forEach(date => {
          renderRows(date);
        });

        rankingHeading.onclick = (e) => {
          e.preventDefault();
          let sorted = data;
          console.log("click rank header");
          switch(currentState) {
            case "rankAsc":
              currentState = "rankDesc";
              rankArrows.className = DOWN_ARROW_CLASS;
              sorted.sort((a, b) => b.rank - a.rank);
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
            case "rankDesc":
              currentState = "unsorted";
              rankArrows.className = SORT_CLASS;
              bdayArrows.className = SORT_CLASS;
              sorted.sort((a, b) => a.rank - b.rank);
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
            default:
              currentState = "rankAsc";
              rankArrows.className = UP_ARROW_CLASS;
              sorted.sort((a, b) => a.rank - b.rank);
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
          }
        }

        bdayHeading.onclick = (e) => {
          e.preventDefault();
          let sorted = data;
          console.log("click bday header");
          switch(currentState) {
            case "bdayAsc":
              currentState = "bdayDesc";
              bdayArrows.className = DOWN_ARROW_CLASS;
              sorted.sort((a, b) => dayjs(`2023-${b.birthday}`) - dayjs(`2023-${a.birthday}`));
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
            case "bdayDesc":
              currentState = "unsorted";
              rankArrows.className = SORT_CLASS;
              bdayArrows.className = SORT_CLASS;
              sorted.sort((a, b) => a.rank - b.rank);
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
            default:
              currentState = "bdayAsc";
              bdayArrows.className = UP_ARROW_CLASS;
              sorted.sort((a, b) => dayjs(`2023-${a.birthday}`) - dayjs(`2023-${b.birthday}`));
              tbody.innerHTML = "";
              sorted.forEach(date => renderRows(date));
              break;
          }
        }
     });



