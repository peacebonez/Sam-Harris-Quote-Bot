const { GoogleSpreadsheet } = require("google-spreadsheet");
const key = require("./config");

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(key);
  }

  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo();
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use this.doc.sheetsById[id]
    await sheet.addRows(rows);
  }
  async getRows() {
    const sheet = this.doc.sheetsByIndex[0]; // or use this.doc.sheetsById[id]
    return await sheet.getRows();
  }
};
