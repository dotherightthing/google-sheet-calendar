/**
 * @file GscSheet.js
 */
/* eslint-disable jsdoc/valid-types */
class GscSheet {
  /**
   * @class
   * @summary Properties and methods relating to querying of the spreadsheet.
   * @param {object} config                  - Module configuration.
   * @param {object} config.spreadsheetId    - Unique ID of the spreadsheet (taken from their URL).
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
   * getCellByString
   *
   * @summary Get a reference to spreadsheet cells containing the specified text.
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {object} Range object
   */
  static getCellByString(sheetName, cellText) {
    let match = [];
    const sheet = GscSheet.getSheet(sheetName);

    try {
      match = sheet.createTextFinder(cellText).matchEntireCell(true).findNext();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return match;
  }

  /**
   * getColumnIndex
   *
   * @summary Get the number of the spreadsheet column containing the specified text (to find the column headers).
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {number} columnIndex
   * @see {@link https://stackoverflow.com/a/64289303}
   * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()})
   */
  static getColumnIndex(sheetName, cellText) {
    const cacheKey = `column-index-${GscUtils.stringToId(sheetName)}-${GscUtils.stringToId(cellText)}`;
    let columnIndex = GscCache.getCacheItem(cacheKey);

    if (typeof columnIndex === 'number') {
      return columnIndex;
    }

    const match = GscSheet.getCellByString(sheetName, cellText);

    if (match) {
      columnIndex = match.getColumn();
      columnIndex = parseInt(columnIndex, 10);
    }

    GscCache.setCacheItem(cacheKey, columnIndex);

    return columnIndex;
  }

  /**
   * getColumnIndexDate
   *
   * @summary Get the number of the spreadsheet column containing each week's starting date.
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @returns {number} columnIndex
   */
  static getColumnIndexDate(sheetName) {
    let columnIndex = -1;

    // getRange(row, column, numRows, numColumns)
    const sheet = GscSheet.getSheet(sheetName);
    const rowIndexFirst = GscSheet.getRowIndexFirst();
    const lastColumnIndex = sheet.getLastColumn();

    const headerColumnRange = sheet.getRange(rowIndexFirst, 1, 1, lastColumnIndex);
    let headerValues = headerColumnRange.getValues().flat();
    headerValues = headerValues.filter((item) => (item !== ''));

    headerValues.forEach((val, index) => {
      if (GscUtils.isDate(val)) {
        columnIndex = index + 1;
      }
    });

    return columnIndex;
  }

  /**
   * getColumnIndexUser
   *
   * @summary Get the number of the spreadsheet column containing the user's name.
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @returns {number} columnIndex
   */
  static getColumnIndexUser(sheetName) {
    const { user } = gscAppInstance.settings;
    const { name: userName } = user;

    const columnIndex = GscSheet.getColumnIndex(sheetName, userName);

    return columnIndex;
  }

  /**
   * getRowIndex
   *
   * @summary Get the number of the spreadsheet row containing the specified text, to find the runs start and end rows.
   * @memberof GscSheet
   * @static
   * @param {object} sheetName Sheet name
   * @param {string} cellText Cell text
   * @returns {number} rowIndex
   */
  static getRowIndex(sheetName, cellText) {
    const cacheKey = `row-index-${GscUtils.stringToId(sheetName)}-${GscUtils.stringToId(cellText)}`;
    let rowIndex = GscCache.getCacheItem(cacheKey);

    if (typeof rowIndex === 'number') {
      return rowIndex;
    }

    const match = GscSheet.getCellByString(sheetName, cellText);

    // match is a range so always exists even if blank
    if (match) {
      rowIndex = match.getRow();
      rowIndex = parseInt(rowIndex, 10);
    }

    GscCache.setCacheItem(cacheKey, rowIndex);

    return rowIndex;
  }

  /**
   * getRowIndexFirst
   *
   * @summary Get the number of the first populated spreadsheet row (containing column headers).
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @returns {number} rowIndex
   */
  static getRowIndexFirst(sheetName) {
    const { user } = gscAppInstance.settings;
    const { name: userName } = user;

    const rowIndex = GscSheet.getRowIndex(sheetName, userName) || 1;

    return rowIndex;
  }

  /**
   * getRowIndexLast
   *
   * @summary Get the number of the last populated spreadsheet row.
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @returns {number} rowIndex
   */
  static getRowIndexLast(sheetName) {
    const sheet = GscSheet.getSheet(sheetName);

    const rowIndex = sheet.getLastRow();

    return rowIndex;
  }

  /**
   * getSheet
   *
   * @summary Get (this year's) sheet.
   * @memberof GscSheet
   * @static
   * @param {string} sheetName Sheet name
   * @returns {*} sheet
   */
  static getSheet(sheetName) {
    const { spreadsheetId } = gscAppInstance.settings;

    let sheet = null;

    try {
      sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return sheet;
  }

  /**
   * getSheetName
   *
   * @summary Get the name of (this year's) sheet.
   * @memberof GscSheet
   * @static
   * @returns {string} sheetName
   */
  static getSheetName() {
    const sheetName = new Date().getFullYear();

    return sheetName;
  }
}
