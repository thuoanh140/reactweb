import React from "react";
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { sheet2: ws }, SheetNames: ['Sheet1', "sheet2"] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};

class CSV {
    constructor() {
        this.wb = { Sheets: {}, SheetNames: [] }
    }

    add(data, sheetName) {
        const ws = XLSX.utils.json_to_sheet(data);
        this.wb.Sheets = { ...this.wb.Sheets, [sheetName]: ws }
        this.wb.SheetNames.push(sheetName)
    }

    save(fileName) {
        const excelBuffer = XLSX.write(this.wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
}

export { exportToCSV, CSV };