const form = document.getElementById("form");
const birthday = document.getElementById("bday")
const result = document.getElementById("result");

const monthsDropdown = document.getElementById("months");
const datesDropdown = document.getElementById("dates");

const monthsArray = Array(12);
const datesArray = Array(31);

monthsArray.forEach((month, index) => {
  let monthName = dayjs().month(index).format("MMMM");
  let opt = document.createElement("option");
  opt.value = index;
  opt.append(monthName);
  monthsDropdown.append(opt);
})

datesArray.forEach((date, index) => {
  let opt = document.createElement("option");
  opt.value = index + 1;
  datesDropdown.append(opt);
})

fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));

fetch("./data/hash_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let bdayValue = birthday.value;
  console.log(bdayValue);
})