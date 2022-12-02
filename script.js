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

  let formattedDate = dayjs(`${monthVal} ${dateVal}, ${YEAR}`).format("MM-DD");
  
  fetch("./data/array_vals_1.json")
    .then(response => response.json())
    .then(data => { 
      if (!dayjs(`${monthVal} ${dateVal}, ${YEAR}`).isValid()) {
        result.innerHTML = "Sorry, that date is invalid."
      } else {
        let dataResult = data.filter(obj => obj.birthday === formattedDate)[0];
        let rankResult = dataResult.rank;
        result.innerHTML = `<p class="mainResult">Your lucky ranking is <strong>#${rankResult}</strong>!</p>`;
        if (1 < rankResult && rankResult <= 50) {
          result.innerHTML += "<p style='font-style: italic'>Wow, 2023 is really gonna be your year! Maybe you'll find a dollar on the ground.</p>";
        } else if (rankResult === 1) {
          result.innerHTML += "<p style='font-style: italic'>Today is my friend Izzy's birthday so they need to be the luckiest person ever for their special day :).</p>";
        }else if (50 < rankResult && rankResult <= 100) {
          result.innerHTML += "<p style='font-style: italic'>You're gonna experience some good luck in 2023, yippee!</p>";
        } else if (100 < rankResult && rankResult <= 200) {
          result.innerHTML += "<p style='font-style: italic'>Your luck will be pretty average in 2023. Don't expect anything grand to happen, okay?</p>";
        } else if (200 < rankResult && rankResult <= 300) {
          result.innerHTML += "<p style='font-style: italic'>Your luck's not gonna be the best in 2023, but keep your head up! This doesn't determine everything.</p>";
        } else if (300 < rankResult && rankResult <= 366) {
          result.innerHTML += "<p style='font-style: italic'>Um.</p> <img src='./images/MakoCringe.png' alt='Um.' />";
        } else {
          result.innerHTML += "";
        }
      }
    });
}