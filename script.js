const form = document.getElementById("form");
const birthday = document.getElementById("bday")
const result = document.getElementById("result");

const monthsDropdown = document.getElementById("months");
const datesDropdown = document.getElementById("dates");
const monthsDatalist = document.getElementById("monthInput");
const datesDatalist = document.getElementById("dateInput");

const monthsArray = Array(12);
console.log(monthsArray);
const datesArray = Array(31);
console.log(datesArray);

monthsArray.forEach((month, index) => {
  console.log("month", month);
  let monthName = dayjs().month(index).format("MMMM");
  let opt = document.createElement("option");
  opt.value = index;
  opt.append(monthName);
  monthsDropdown.append(opt);
})

datesArray.forEach((date, index) => {
  console.log("date", date);
  let opt = document.createElement("option");
  opt.value = index + 1;
  datesDropdown.append(opt);
})

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let monthVal = monthsDatalist.value;
  let dateVal = datesDatalist.value;
  console.log(monthVal, dateVal);
  
  fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));
})