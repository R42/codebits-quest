define(['userStats', 'configs'], function(UserStats, Configs) {
  var GenericObject = function(options) {
    this.actions = options.actions;
    this.price = options.price || 0;
    this.color = options.color;
    this.description = options.description || '';
    this.popup = options.popup || null;
  };

  GenericObject.prototype = {
    getType: function() {
      return 'object';
    },

    draw: function(context, position) {
      context.fillStyle = this.color;
      context.fillRect(
        position.X * Configs.BLOCK_SIZE,
        position.Y * Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE
      );
    },

    getDescription: function() {
      return this.description;
    },

    canUse: function() {
      return UserStats.getStat('money') >= this.price;
    },

    doAction: function() {
      if(this.canUse()) {
        UserStats.decreaseStat('money', this.price);

        for(var s in this.actions) {
          if(this.actions[s] === 0) {
            UserStats.setStat(s, 0);
          }
          else {
            UserStats.increaseStat(s, this.actions[s]);
          }
        }

        return true;
      }
      return false;
    }
  };

  return GenericObject;
});
