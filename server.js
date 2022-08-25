import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fetch from "node-fetch";
const request = "https://api.spoonacular.com/recipes/random?number=1&apiKey="; //your key;

const fs = require("fs");
async function makeRequest(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
async function proceede(i) {
  const data = await makeRequest(request);
  for (i; i > 0; i--) {
    let item = await makeRequest(request);
    data.recipes.push(item.recipes[0]);
  }
  return data;
}
async function write(i) {
  const json = JSON.stringify(await proceede(i));
  fs.writeFile("recipeData.json", json, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
write(3);
