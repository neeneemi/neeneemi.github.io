Tesseract.recognize(
  "https://github.com/neeneemi/neeneemi.github.io/blob/main/images/1.jpeg",
  "eng",
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
});