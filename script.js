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
  
  fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => { 
      if (!dayjs(`${monthVal} ${dateVal}, ${YEAR}`).isValid()) {
        result.innerHTML = "Sorry, that date is invalid."
      } else {
        let dataResult = data.filter(obj => obj.birthday === formattedDate)[0];
        let rankResult = dataResult.rank;
        result.innerHTML = `<p class="mainResult">Your lucky ranking is <strong>#${rankResult}</strong>!</p>`;
        switch(rankResult) {
          case rankResult <= 50:
            result.innerHTML += "<p style='font-style: italic'>Wow, it's really your lucky year! Maybe you'll find a dollar on the ground.</p>";
            break;
          case 50 < rankResult && rankResult <= 100:
            result.innerHTML += "<p style='font-style: italic'>You're gonna experience some good luck, yippee!</p>";
            break;
          case 100 < rankResult && rankResult <= 200:
            result.innerHTML += "<p style='font-style: italic'>Your luck is pretty average this year. Don't expect anything grand to happen, okay?</p>";
            break;
          case 200 < rankResult && rankResult <= 300:
            result.innerHTML += "<p style='font-style: italic'>Your luck's not gonna be the best, but keep your head up! This doesn't mean everything.</p>";
            break;
          case 300 < rankResult && rankResult <= 366:
            result.innerHTML += "<p style='font-style: italic'>Um.</p> <img src='./images/MakoCringe.png' alt='Um.' />";
            break;
          default:
            break;
        }
      }
    });
}