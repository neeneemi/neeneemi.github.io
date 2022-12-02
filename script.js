const form = document.getElementById("form");
const result = document.getElementById("result");

fetch("./data/array_vals.json")
    .then(res => console.log(res.json));

fetch("./data/hash_vals.json")
    .then(res => console.log(res.json));

form.addEventListener("submit", function(e) {
  e.preventDefault();
})