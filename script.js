const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("values.csv")
    .then(res => console.log(res.text))

form.addEventListener("submit", function(e) {
  e.preventDefault();
})