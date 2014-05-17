define(['jquery'], function($) {
  var container = $('<div>').prop('id', 'user-stats');
  var stats = {};
  var WIDTH = 20;

  /**
   * Private functions
   */
  function drawHeader() {
    var remainingChars = WIDTH;
    var line = '*';
    remainingChars--;
    for(var i = 1; i < remainingChars - 2; ++i) {
      line += '-';
    }
    line += '*';
    container.append($('<span>').text(line)).append('<br>');
  }

  function drawStat(propName, value) {
    var line = '| ' + propName + ': ' + Math.floor(value);
    for(var i = line.length; i <= WIDTH - 4; ++i) {
      line += '&nbsp';
    }
    line += '|';
    container.append($('<span>').html(line)).append('<br>');
  }

  var UserStats = {
    /**
     * Constructor function
     * @param  {Object} s [The initial stats]
     */
    initialize: function(s) {
      stats = s ? s : {};
    },

    /**
     * Model methods
     */
    getStat: function(stat) {
      return stats[stat];
    },

    setStat: function(stat, value) {
      stats[stat] = value;
    },

    increaseStat: function(stat, val) {
      stats[stat] += val;
      if(stats[stat] < 0) {
        stats[stat] = 0;
      }
    },

    decreaseStat: function(stat, val) {
      stats[stat] -= val;
      if(stats[stat] < 0) {
        stats[stat] = 0;
      }
    },

    /**
     * Drawing methods
     */
    getContainer: function() {
      return container;
    },

    draw: function() {
      container.empty();
      drawHeader();
      for(var e in stats) {
        drawStat(e, stats[e]);
      }
      drawHeader();
    }
  };

  return UserStats;
});
