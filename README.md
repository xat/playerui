# playerui

minimalistic mediaplayer commandline ui.

### sample

```javascript
var playerui = require('playerui');

// Initialize UI object
var ui = playerui();

// add some labels
ui.setLabel('source', 'Source', 'Ty Segall - Manipulator (Album)');
ui.setLabel('state', 'Playing', 'Playing...');
ui.setLabel('position', 'Position', '10:00 / 50:00');

// specify which labels to show
ui.showLabels('source', 'state', 'position');

// set progress bar to 20%
ui.setProgress(20);

// output
ui.render();
```
The above code will render this into the commandline

![Example UI](/example.png?raw=true "Example UI")

### Installation

`npm install playerui`

## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.
