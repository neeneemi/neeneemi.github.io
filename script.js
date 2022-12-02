const form = document.getElementById("form");
const birthday = document.getElementById("bday")
const result = document.getElementById("result");

const monthsDropdown = document.getElementById("months");
const datesDropdown = document.getElementById("dates");
const monthsDatalist = document.getElementById("monthInput");
const datesDatalist = document.getElementById("dateInput");

const monthsArray = Array.from(Array(12).keys());
console.log(monthsArray);
const datesArray = Array.from(Array(31).keys());

for (let i = 0; i < monthsArray.length; i++) {
  console.log("month", monthsArray[i]);
  let monthName = dayjs().month(i).format("MMMM");
  let opt = document.createElement("option");
  opt.value = monthsArray[i];
  opt.append(monthName);
  monthsDropdown.append(opt);
}

for (let i = 0; i < datesArray.length; i++) {
  console.log("date", datesArray[i]);
  let opt = document.createElement("option");
  opt.value = datesArray[i] + 1;
  datesDropdown.append(opt);
};

form.onsubmit = function(e) {
  e.preventDefault();

  let monthVal = monthsDatalist.value;
  let dateVal = datesDatalist.value;
  console.log(monthVal, dateVal);
  
  fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));
}