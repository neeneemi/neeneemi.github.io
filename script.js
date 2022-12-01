Tesseract.recognize(
  "./images/1.jpeg",
  "eng",
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
});