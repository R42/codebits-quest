define(['userStats', 'clock', 'configs'], function(UserStats, Clock, Configs) {
  var Stage = function(schedule) {
    this.schedule = schedule;
  };

  Stage.prototype = {
    getType: function() {
      return 'event';
    },

    draw: function(context, position) {
      context.fillStyle = 'rgb(75, 0, 130)';
      context.fillRect(
        position.X * Configs.BLOCK_SIZE,
        position.Y * Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE
      );
    },

    getDescription: function() {
      var talk = this.getActiveEvent();
      return talk ? talk.description : '';
    },

    getActiveEvent: function() {
      var time = Clock.getTime();
      var talk = null;
      for(var i = 0; i < this.schedule.length; ++i) {
        if(time >= this.schedule[i].startDate && time < this.schedule[i].endDate) {
          talk = this.schedule[i];
          break;
        }
      }

      return talk;
    },

    canUse: function() {
      return true;
    },

    doAction: function() {
      if(this.canUse()) {
        var talk = this.getActiveEvent();

        for(var s in talk.actions) {
          if(talk.actions[s] === 0) {
            UserStats.setStat(s, 0);
          }
          else {
            UserStats.increaseStat(s, talk.actions[s]);
          }
        }

        return true;
      }
    }
  };

  return Stage;
});
