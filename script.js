const YEAR = 2023;

const form = document.getElementById("form");
const birthday = document.getElementById("bday")
const result = document.getElementById("result");

const monthsDropdown = document.getElementById("months");
const datesDropdown = document.getElementById("dates");
const monthsDatalist = document.getElementById("monthInput");
const datesDatalist = document.getElementById("dateInput");

const monthsArray = Array.from(Array(12).keys());
const datesArray = Array.from(Array(31).keys());

for (let i = 0; i < monthsArray.length; i++) {
  let monthName = dayjs().month(i).format("MMMM");
  let opt = document.createElement("option");
  opt.value = monthsArray[i];
  opt.append(monthName);
  monthsDropdown.append(opt);
}

for (let i = 0; i < datesArray.length; i++) {
  let opt = document.createElement("option");
  opt.value = datesArray[i] + 1;
  datesDropdown.append(opt);
};

form.onsubmit = function(e) {
  e.preventDefault();

  let monthVal = monthsDatalist.value;
  let dateVal = datesDatalist.value;
  console.log(monthVal, dateVal);

  let formattedDate = dayjs(`${monthVal} ${dateVal}, ${YEAR}`).format("MM-DD");
  console.log(formattedDate);
  
  fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      let dataResult = data.filter(obj => obj.birthday === formattedDate)[0];
      let rankResult = dataResult.rank;
      result.innerHTML = `Your lucky ranking is #${rankResult}!`;
    });
}