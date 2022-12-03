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
        if (1 <= rankResult && rankResult <= 50) {
          result.innerHTML += "<p style='font-style: italic'>Wow, 2023 is really gonna be your year! Maybe you'll find a dollar on the ground.</p>";
        } else if (50 < rankResult && rankResult <= 100) {
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

        switch (dataResult.birthday) {
          case "03-29":
            result.innerHTML += "<p style='font-style: italic'>Fun fact, you also share a birthday with Tomoya Mashiro from Ra*bits. Hurray for the year of the rabbit!</p>";
            break;
          case "04-27":
            result.innerHTML += "<p style='font-style: italic'>Fun fact, you also share a birthday with Nazuna Nito from Ra*bits. Hurray for the year of the rabbit!</p>";
            break;
          case "07-15":
            result.innerHTML += "<p style='font-style: italic'>Fun fact, you also share a birthday with Hajime Shino from Ra*bits. Hurray for the year of the rabbit!</p>";
            break;
          case "09-07":
            result.innerHTML += "<p style='font-style: italic'>Fun fact, you also share a birthday with Mitsuru Tenma from Ra*bits. Hurray for the year of the rabbit!</p>";
            break;
          default:
            break;
        }
      }
    });
}