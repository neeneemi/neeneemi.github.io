const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("values.csv")
    .then(res => res.text)
    .then(text => console.log(text));

form.addEventListener("submit", function(e) {
  e.preventDefault();
})