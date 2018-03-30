/*
  Reads the data CSV and outputs a clean json file
*/

var fs = require("fs");
var file = fs.readFileSync("./data.csv").toString()
  .replace(/\r/g, "")
  .split("\n");
file = file.slice(1, file.length - 1)
  .map(function(element){
    element = element.split(",");
    return {
      name: element[0],
      start: parseInt(element[1]),
      end: parseInt(element[2]),
      other_years: element[3],
      country_codes: element.slice(4, element.length)
    };
  })
  .sort(function(a, b){
    return a.start - b.start;
  });

fs.writeFileSync("./data.json", JSON.stringify(file));
