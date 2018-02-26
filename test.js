var playerui = require('./index');

// Initialize UI object
var ui = playerui();

// add some labels
ui.setLabel('source', 'Source', 'Chariot - Someday, in the Event That Mankind Actually Figures Out What it is That This World Revolves Around, Thousands of People are Going to Be Shocked and Perplexed to Find Out it Was Not Them. Sometimes, This Includes Me.');
ui.setLabel('state', 'Playing', 'Playing...');
ui.setLabel('position', 'Position', '10:00 / 50:00');

// specify which labels to show
ui.showLabels('source', 'state', 'position');

// set progress bar to 20%
ui.setProgress(20);

// output
ui.render();
