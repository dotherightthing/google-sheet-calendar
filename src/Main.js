/**
 * @file Main.gs
 * @summary Initialises the GSC App and creates global variables.
 */
const appConfig = {
  colourKey: new Map([
    [
      'crimson', {
        definition: 'Alternative payment',
        hex: [ '#a64d79' ],
      },
    ],
    [
      'cyan', {
        definition: 'Internal usage',
        hex: [ '#00ffff' ],
      },
    ],
    [
      'green', {
        definition: 'Scheduled',
        hex: [ '#00ff00' ],
      },
    ],
    [
      'magenta', {
        definition: 'COVID',
        hex: [ '#ff00ff' ],
      },
    ],
    [
      'orange', {
        definition: 'Tentative',
        hex: [ '#ff9900' ],
      },
    ],
    [
      'purple', {
        definition: 'Sick',
        hex: [ '#9900ff' ],
      },
    ],
    [
      'red', {
        definition: 'Cannot work',
        hex: [ '#ff0000', '#f22201' ],
      },
    ],
    [
      'white', {
        definition: 'Not working',
        hex: [ '#ffffff' ],
      },
    ],
  ]),
  deploymentIds: {},
  spreadsheetId: '1lhzVSxb-hk8L1FfD7sJlD3daKnyIBaUbghCWf6-P_AA',
  user: {
    name: 'Dan',
    email: 'dan@dotherightthing.co.nz',
  },
  workingDaysInWeek: 5,
};

// share config with other classes
const gscAppInstance = new GscApp(appConfig);

function test() {
  GscCalendar.devApp();
}
