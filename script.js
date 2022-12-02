const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("./data/array_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));

fetch("./data/hash_vals.json")
    .then(response => response.json())
    .then(data => console.log(data));

form.addEventListener("submit", function(e) {
  e.preventDefault();
})