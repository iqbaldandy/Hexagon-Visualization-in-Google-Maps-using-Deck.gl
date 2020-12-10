const csvToJson = require('convert-csv-to-json');
 
const input = './covid19_italy_province.csv'; 
const output = './public/italy-cvd19(1).json';
 
csvToJson.fieldDelimiter(',')
         .formatValueByType()
         .generateJsonFileFromCsv(input, output);