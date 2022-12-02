const YEAR = 2023;

const form = document.getElementById("form");
const birthday = document.getElementById("bday")
const result = document.getElementById("result");

const monthsDropdown = document.getElementById("months");
const datesDropdown = document.getElementById("dates");

const monthsArray = Array.from(Array(12).keys());
const datesArray = Array.from(Array(31).keys());

for (let i = 0; i < monthsArray.length; i++) {
  let monthName = dayjs().month(i).format("MMMM");
  let opt = document.createElement("option");
  opt.value = monthName;
  opt.append(monthName);
  monthsDropdown.append(opt);
}

for (let i = 0; i < datesArray.length; i++) {
  let opt = document.createElement("option");
  opt.value = datesArray[i] + 1;
  opt.append(datesArray[i] + 1);
  datesDropdown.append(opt);
};

form.onsubmit = function(e) {
  e.preventDefault();

  let monthVal = monthsDropdown.value;
  let dateVal = datesDropdown.value;
  console.log(monthVal, dateVal);

  let formattedDate = dayjs(`${monthVal} ${dateVal}, ${YEAR}`).format("MM-DD");
  
  fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      if (!dayjs(`${monthVal} ${dateVal}, ${YEAR}`).isValid()) {
        result.innerHTML = "Sorry, that date is invalid."
      } else {
        let dataResult = data.filter(obj => obj.birthday === formattedDate)[0];
        let rankResult = dataResult.rank;
        result.innerHTML = `<p>Your lucky ranking is <strong>#${rankResult}</strong>!</p>`;
      }
    });
}