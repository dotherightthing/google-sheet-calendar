# Google Sheet Calendar

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

This app is built using [Google Apps Script](https://developers.google.com/apps-script/reference) ([report a bug / request a feature](https://developers.google.com/apps-script/support)).

## Integration with data source

The web app reads from a Google Sheet. Google Apps Script offers the choice of a 'container-bound' (spreadsheet linked) or 'standalone' project.

The spreadsheet is readonly ("View only"), this script is a 'standalone' project.

Link to the source spreadsheet via the `spreadsheetId` key in `Main.js`

## Developing the app

### Setup

Application files are stored on the Apps Script platform in the [Google Sheet Calendar project](https://script.google.com/home/projects/1MnVuNrmgh0MQ9MWhFUigUHYlLAT3nuiKT_Md2UWBiCiueVsqskhuu4VQ/edit), and in the [Google Sheet Calendar repository](https://github.com/dotherightthing/google-sheet-calendar).

#### Online development

Application code may be edited and deployed using the [Apps Script Online IDE](https://script.google.com/home/projects/1MnVuNrmgh0MQ9MWhFUigUHYlLAT3nuiKT_Md2UWBiCiueVsqskhuu4VQ/edit), which is similar to VSCode.

#### Local development

Alternatively, application code can be cloned to your local development environment using [clasp](https://github.com/google/clasp). This simplifies some aspects of development and allows the code to be checked into version control (this repo).

This [Medium article about clasp](https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018) explains why this is the recommended approach.

```sh
npm install
npx clasp login
```

### Workflow

#### Sync

Get the latest code from the server, to capture changes from any developers not using the Github repo.

```sh
npx clasp pull
```

#### Develop

Code execution can be tested by directly calling the serverside functions contained in `Main.js`.

This currently requires jumping over to the online development environment.

```sh
npm run editor
# 'Select function to run' from the dropdown:
# doGet - tests the template generation
# Click 'Run'
```

#### Test

##### Linting

A Husky Git Hook triggers the following tasks whenever code is pushed to Github:

1. linting of JavaScript files
1. rebuild of the JavaScript documentation (MANual)

##### Functions

Unit tests to come.

##### Data

Authorised users can verify source data by viewing the spreadsheet.

### Code documentation

The [MAN](MAN.md)ual is generated from JSDoc comments in the sourcecode (*Local development* only).

### Data integrity

The good functioning of the app is dependent on the structure of the source spreadsheet being maintained.

Brittleness is mitigated somewhat by referencing strings/labels rather than ranges/locations.
