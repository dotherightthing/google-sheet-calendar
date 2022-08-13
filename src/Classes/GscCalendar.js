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
   * getWeeks
   *
   * @summary Get an array of weeks
   * @static
   * @memberof GscCalendar
   * @param {string} sheetName Sheet name
   * @returns {Array} weeks Array of weeks, each week containing an array of days
   */
  static getWeeks(sheetName) {
    const {
      rowsAfterWeek,
      rowsInWeek,
    } = gscAppInstance.settings;

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
    let values;
    let backgrounds;
    let valuesAndBackgrounds;
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

      valuesAndBackgrounds = [];
      backgrounds = range.getBackgrounds();
      values = range.getValues();

      for (let row = 0; row < values.length; row += 1) {
        valuesAndBackgrounds[row] = [];

        for (let col = 0; col < values[row].length; col += 1) {
          const value = values[row][col].toString();
          const background = backgrounds[row][col];

          valuesAndBackgrounds[row].push({ value, background });
        }
      }

      // console.log('valuesAndBackgrounds', valuesAndBackgrounds);

      // array of weeks, each week contains an array of days, each day contains an object
      weeks.push(valuesAndBackgrounds);
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
    const weeks = GscCalendar.getWeeks(sheetName);
    const userWeeks = [];

    weeks.forEach((week) => {
      let weekStartDate = null;
      const userDays = [];

      week.forEach((day, index) => {
        const dateValue = day[columnIndexDate - 1].value;
        const userValueAndBackground = day[columnIndexUser - 1];

        // omit empty rows
        if (day[0].value === '') {
          return;
        }

        // omit trailing comments
        if (index === 0) {
          if (GscUtils.isDate(dateValue)) {
            const date = new Date(dateValue);
            const dd = date.getDate().toString().padStart(2, '0');
            const mm = (date.getMonth() + 1).toString().padStart(2, '0');
            const yyyy = date.getFullYear();

            weekStartDate = `${yyyy}/${mm}/${dd}`;
          }
        } else {
          userDays.push(userValueAndBackground);
        }
      });

      if (weekStartDate !== null) {
        userWeeks[weekStartDate] = userDays;
      }
    });

    console.log(userWeeks);

    //  [
    //    '2022/01/03': [
    //      { value: '', background: '#f22201' },
    //      { value: '', background: '#f22201' },
    //      { value: '', background: '#ffffff' },
    //      { value: '', background: '#ffffff' },
    //      { value: '', background: '#ffffff' }
    //    ],
    //    '2022/01/10': [
    //      { value: '', background: '#ffffff' },
    //      { value: '8', background: '#00ff00' },
    //      { value: '', background: '#ffffff' },
    //      { value: '8', background: '#00ff00' },
    //      { value: '', background: '#ffffff' }
    //    ],
    //    ...
    //  ]

    // TODO
    // create calendar events
    // update calendar events

    return true;
  }
}
