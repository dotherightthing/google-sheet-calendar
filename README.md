# google-sheet-calendar

## About the app

A small company I work for manage staff scheduling via a spreadsheet.

The spreadsheet contains a repeating table-like structure representing a calendar week.

```md
| 18-Apr    | Employee1 | Employee2 | Employee3 | Employee4 |
|-----------|-----------|-----------|-----------|-----------|
| Monday    | RED       | RED       | RED       | RED       |
| Tuesday   | GREEN     | WHITE     | WHITE     | GREEN     |
| Wednesday | GREEN     | WHITE     | GREEN     | ORANGE    |
| Thursday  | WHITE     | GREEN     | GREEN     | WHITE     |
| Friday    | GREEN     | GREEN     | WHITE     | WHITE     |
-
-
| 25-Apr    | Employee1 | Employee2 | Employee3 | Employee4 |
|-----------|-----------|-----------|-----------|-----------|
| Monday    | RED       | RED       | RED       | RED       |
| Tuesday   | GREEN     | WHITE     | WHITE     | GREEN     |
| Wednesday | GREEN     | WHITE     | GREEN     | ORANGE    |
| Thursday  | WHITE     | GREEN     | GREEN     | WHITE     |
| Friday    | GREEN     | GREEN     | WHITE     | WHITE     |
-
-
```

* RED = Public holiday
* ORANGE = tentatively working
* GREEN = working
* WHITE = not working
* PURPLE = internal usage

Colours are applied to cells as background colours rather than text. This provides a quick visual indication of what is planned. Presumably none of the employees are visually impaired or colour blind.

Cells may also contain text notes.

After a rider has done a shift these are replaced with the hours they worked. In this way the sheet also functions to track expenditure.

The company is resistant to moving to Google Calendar as they like being able to quickly visualise their forward planning.

Up until now I have been manually checking the spreadsheet and creating Google Calendar events from it. A more robust solution would be to automate this.

The spreadsheet is readonly ("View only"), meaning that neither a container bound script nor script triggers can be used.
