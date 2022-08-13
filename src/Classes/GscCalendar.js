/**
 * @file GscCalendar.js
 */
/* eslint-disable jsdoc/valid-types */
class GscCalendar {
  /**
   * @class
   * @summary Properties and methods relating to copying scheduling from spreadsheet to calendar.
   * @param {object} config - Module configuration.
   */
  constructor(config = {}) {
    // accepts an object of named arguments
    const options = {};

    // merge GscApp.settings, config and options objects to create this instance's settings
    this.settings = { ...options, ...config };
  }

  /* Setters and Getters */

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    // merge settings objects
    this._settings = { ...this._settings, ...settings };
  }

  /* Methods */

  /**
   * devApp
   *
   * @summary Get dates from sheet and post to calendar
   * @static
   * @memberof GscCalendar
   * @returns {boolean} True if successful
   */
  static devApp() {
    const { user } = gscAppInstance.settings;
    const { name: userName } = user;
    const sheetName = new Date().getFullYear();

    // const columnIndex = GscSheet.getColumnIndex(sheetName, userName);
    const firstHeaderRowIndex = GscSheet.getRowIndex(sheetName, userName);
    const sheet = GscSheet.getSheet(sheetName);
    const lastColumnIndex = sheet.getLastColumn();

    // getRange(row, column, numRows, numColumns)
    const headerColumnRange = sheet.getRange(firstHeaderRowIndex, 1, 1, lastColumnIndex);
    let headerValues = headerColumnRange.getValues().flat();
    headerValues = headerValues.filter((item) => (item !== ''));

    let date = null;

    headerValues.forEach((val) => {
      if (GscUtils.isDate(val)) {
        date = val;
      }
    });

    console.log('first header row found');

    return true;
  }
}
