define(['userStats'], function(UserStats) {
  var GenericObject = function(actions, price, terrainSymbol, description,
    popup) {

    this.actions = actions;
    this.price = price;
    this.terrainSymbol = terrainSymbol;
    this.description = description;
    this.popup = popup;
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
