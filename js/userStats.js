define(['jquery', 'events'], function($, EVENTS) {
  var container = $('<div>').prop('id', 'user-stats');
  var stats = {};
  var statsBoundaries = {
    money: {
      min: 0,
      max: 1000
    },
    stamina: {
      min: 0,
      max: 100
    },
    hunger: {
      min: 0,
      max: 100
    },
    thirst: {
      min: 0,
      max: 100
    }
  };
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
    var line = '| ' + propName + ': ' + value;
    for(var i = line.length; i <= WIDTH - 4; ++i) {
      line += '&nbsp';
    }
    line += '|';
    container.append($('<span>').html(line)).append('<br>');
  }

  function checkStatBoundaries(stat, newVal) {
    var currVal = stats[stat];
    if(newVal > currVal && newVal >= statsBoundaries[stat].max) {
      stats[stat] = statsBoundaries[stat].max;
      EVENTS.stats.trigger('maxreached', [stat, statsBoundaries[stat].max]);
      return false;
    }
    if(newVal < currVal && newVal <= statsBoundaries[stat].min) {
      stats[stat] = statsBoundaries[stat].min;
      EVENTS.stats.trigger('minreached', [stat, statsBoundaries[stat].min]);
      return false;
    }
    return true;
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

    changeStat: function(stat, val) {
      if(checkStatBoundaries(stat, stats[stat] + val)) {
        stats[stat] += val;
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