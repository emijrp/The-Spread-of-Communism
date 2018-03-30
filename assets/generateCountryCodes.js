/*
  Reads the country code CSV and outputs a clean json file
*/

var fs = require("fs");
var file = fs.readFileSync("./country_codes.csv").toString()
  .replace(/\r/g, "")
  .split("\n");
file = file.slice(0, file.length - 1)
  .map(function(element){
    element = element.split(",");
    return {
      code: element[1],
      name: element[0]
    };
  })
  .sort(function(a, b){
    return a.code.localeCompare(b.code);
  });

fs.writeFileSync("./country_codes.json", JSON.stringify(file));
