import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fetch from "node-fetch";
const request = "https://api.spoonacular.com/recipes/random?number=100&apiKey="; //your key;

const fs = require("fs");
async function makeRequest(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
async function proceede() {
  const data = await makeRequest(request);
  return data;
}
async function write() {
  const json = JSON.stringify(await proceede());
  fs.writeFile("recipeData.json", json, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
write();
