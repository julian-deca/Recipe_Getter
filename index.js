import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fetch from "node-fetch";
const request =
  "https://api.spoonacular.com/recipes/random?number=100&apiKey=2661985fd53543f189f3e6af41ac5e7e"; //your key;

const fs = require("fs");
async function makeRequest(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let filteredData = data.recipes.filter((item) => {
        if (
          item.analyzedInstructions &&
          item.extendedIngredients &&
          item.image &&
          item.title
        ) {
          if (item.analyzedInstructions[0]) {
            if (item.analyzedInstructions[0].steps) {
              return true;
            }
          }
        }
        return false;
      });
      let relevant = filteredData.map((item) => {
        return {
          name: item.title,
          image: item.image,
          steps: item.analyzedInstructions[0].steps,
          ingredients: item.extendedIngredients,
        };
      });
      return relevant;
    });
}
async function proceede(i) {
  const data = await makeRequest(request);

  for (i; i > 0; i--) {
    let item = await makeRequest(request);
    data.push(...item);
  }
  console.log(data.length);
  return data;
}
async function write(i) {
  const json = JSON.stringify(await proceede(i));
  fs.writeFile("recipeData.json", json, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}
write(15);
