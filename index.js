var chalk = require('chalk');
var log = require('single-line-log').stdout;
var extend = require('xtend');
var pad = require('pad');

module.exports = function(opts) {
  var options = extend({
    defaultStyle: chalk.grey.inverse,
    progressStyle: chalk.cyan.inverse,
    paddingLeft: 2,
    paddingTop: 1,
    paddingBottom: 1,
    labelPadding: 5
  }, opts || {});

  var visibleLabels = [];
  var labels = {};
  var progress = 0;
  var hidden = false;

  // fetch all labels currently displayed
  var getActiveLabels = function() {
    return visibleLabels.map(function(l) {
      return labels[l];
    }).filter(function(l) {
      return !!l;
    });
  };

  // check which label has the most characters
  var longestLabel = function() {
    return getActiveLabels()
      .reduce(function(memo, l) {
        if (!l || !l.label || l.label.length <= memo) return memo;
        return l.label.length;
      }, 0);
  };

  return {

    showLabels: function() {
      visibleLabels = Array.prototype.slice.call(arguments);
      return this;
    },

    setLabel: function(name, label, value) {
      labels[name] = {
        label: label,
        value: value
      };
      return this;
    },

    setProgress: function(val) {
      progress = val;
      return this;
    },

    show: function() {
      hidden = false;
      this.render();
    },

    hide: function() {
      hidden = true;
      log('');
    },

    render: function() {
      if (hidden) return;
      var cols = process.stdout.columns;
      var labelPadding = longestLabel() + options.labelPadding;
      var pos = cols * (progress / 100);
      var emptyLine = pad('', cols);

      var rows = getActiveLabels()
        .map(function(l) {
          return pad(pad('', options.paddingLeft)
                      + pad(l.label, labelPadding)
                      + ': ' + l.value, cols);
        });

      var addPaddingTop = function(padding) {
        while (padding--) rows.unshift(emptyLine);
      };

      var addPaddingBottom = function(padding) {
        while (padding--) rows.push(emptyLine);
      };

      addPaddingTop(options.paddingTop);
      addPaddingBottom(options.paddingBottom);

      rows = rows.map(function(line) {
        return options.progressStyle(line.substr(0, pos)) +
                options.defaultStyle(line.substr(pos));
      });

      log(rows.join("\n") + "\n");
      return this;
    }

  };
};
