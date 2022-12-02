const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("data/values.csv")
    .then(res => res.text)
    .then(text => console.log(text));

form.addEventListener("submit", function(e) {
  e.preventDefault();
})