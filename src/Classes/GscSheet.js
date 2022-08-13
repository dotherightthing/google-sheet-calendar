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
   * @param {object} sheetName Sheet name
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
   * @param {object} sheetName Sheet name
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
   * getSheet
   *
   * @summary Get suburbs or town spreadsheet (if the user is allowed to access it).
   * @memberof GscSheet
   * @static
   * @param {object} sheetName Sheet name
   * @returns {object} sheet
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
}
