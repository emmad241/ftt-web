const XLSX = require("xlsx");
const data = new Date()
const workbook = XLSX.readFile("report.xlsx");
const worksheet = workbook.Sheets['Sheet1'];


const arrReport = XLSX.utils.sheet_to_json(worksheet);
const reportData = {}
console.log("xml:\n", jsontoxml({
    worksheet: JSON.parse(JSON.stringify(Object.values(worksheet))).map(worksheet => worksheet.map(data =>{
        for(property in data){
            const newPropertyName = property.replace(/\s/g, "");
            if (property !== newPropertyName) {
                Object.defineProperty(data, newPropertyName,
                    Object.getOwnPropertyDescriptor(data, property));
                delete data[property];
            }
        }
        return data;

    
}))
},{}), "\n\n");

//modify the xlsx file
worksheet.Sheet1.push({
    "Date" : Date,
    "Stock Name" : "dsguk",
    "Current Price": "24",
    "Price 6 months" : "43",
    "Price 12 months" : "64",
    "Crpto Stock" : "dgak",

});

//update the xlsx file
XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
XLSX.writeFile(workbook, "file-example.xlsx");
//convert file into csv
var xlsxFile = aspose.cells.Workbook("report.xlsx");
xlsxFile.save("report.csv", aspose.cells.SaveFormat.CSV);
//add date into file name
let filename = `report_${(new Date().toJSON().slice(0,10))}.csv`
console.log(`Add here ${filename}`);


