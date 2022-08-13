/**
 * @file Main.gs
 * @summary Initialises the GSC App and creates global variables.
 */
const appConfig = {
  deploymentIds: {},
  spreadsheetId: '1lhzVSxb-hk8L1FfD7sJlD3daKnyIBaUbghCWf6-P_AA',
  user: {
    name: 'Dan',
    email: 'dan@dotherightthing.co.nz',
  },
};

// share config with other classes
const gscAppInstance = new GscApp(appConfig);

function test() {
  GscCalendar.devApp();
}
