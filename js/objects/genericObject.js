define(['userStats'], function(UserStats) {
  var GenericObject = function(a, p, s, d) {
    this.actions = a;
    this.price = p;
    this.terrainSymbol = s;
    this.description = d;
  };

  GenericObject.prototype = {
    getType: function() {
      return 'object';
    },

    draw: function() {
      return this.terrainSymbol;
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
