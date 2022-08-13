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

  static getWeeks() {
    const {
      rowsAfterWeek,
      rowsInWeek,
    } = gscAppInstance.settings;

    const sheetName = GscSheet.getSheetName();
    const columnIndexDate = GscSheet.getColumnIndexDate(sheetName);
    const columnIndexUser = GscSheet.getColumnIndexUser(sheetName);
    const rowIndexFirst = GscSheet.getRowIndexFirst(sheetName);
    const rowIndexLast = GscSheet.getRowIndexLast(sheetName);
    const totalRows = (rowIndexLast - rowIndexFirst);

    const rowsBeforeWeek = 1; // header row
    const rowsPerWeek = (rowsBeforeWeek + rowsInWeek + rowsAfterWeek);
    const totalWeeks = Math.floor(totalRows / rowsPerWeek); // possible weeks, need to verify that date exists to weed out trailing comments

    const sheet = GscSheet.getSheet(sheetName);
    // getRange(row, column, numRows, numColumns)
    const rangeStart = sheet.getRange(rowIndexFirst, columnIndexDate, rowsPerWeek, columnIndexUser);

    let range = rangeStart;
    let rowOffset = 0;
    let weekDate;
    const weeks = [];

    for (let w = 0; w < totalWeeks; w += 1) {
      if (w > 0) {
        rowOffset += rowsPerWeek;
      }

      range = rangeStart.offset(rowOffset, 0);
      weekDate = range.getValue(); // Returns the value of the top-left cell in the range.

      // allow for extra rowsAfterWeek
      while (!GscUtils.isDate(weekDate)) {
        rowOffset += 1;
        range = rangeStart.offset(rowOffset, 0);
        weekDate = range.getValue(); // Returns the value of the top-left cell in the range.
      }

      // array of weeks, each week contains an array of days
      weeks.push(range.getValues());
    }

    return weeks;
  }

  /**
   * devApp
   *
   * @summary Get dates from sheet and post to calendar
   * @static
   * @memberof GscCalendar
   * @returns {boolean} True if successful
   */
  static devApp() {
    const sheetName = GscSheet.getSheetName();
    const columnIndexDate = GscSheet.getColumnIndexDate(sheetName);
    const columnIndexUser = GscSheet.getColumnIndexUser(sheetName);

    const weeks = GscCalendar.getWeeks();
    const userWeeks = [];

    weeks.forEach((week) => {
      let weekStartDate = null;
      const userDays = [];

      week.forEach((day, index) => {
        const dateCol = day[columnIndexDate - 1];
        const userCol = day[columnIndexUser - 1];

        // omit empty rows
        if (day[0] === '') {
          return;
        }

        // omit trailing comments
        if ((index === 0) && (typeof dateCol === 'object')) {
          if (GscUtils.isDate(dateCol.toString())) {
            const dd = dateCol.getDate().toString().padStart(2, '0');
            const mm = (dateCol.getMonth() + 1).toString().padStart(2, '0');
            const yyyy = dateCol.getFullYear();

            weekStartDate = `${yyyy}/${mm}/${dd}`;
          }
        } else {
          userDays.push(userCol);
        }
      });

      if (weekStartDate !== null) {
        userWeeks[weekStartDate] = userDays;
      }
    });

    console.log(userWeeks);

    return true;
  }
}
