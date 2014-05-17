define(['map'], function(Map){

  var userX;

  var userY;

  function move(x, y){
    //
    var newX = userX + x;
    var newY = userY + y;

    var location = Map.getLocation(newX, newY);

    if(location == '#' || location == 'o'){
      return false;
    }

    userX = newX;
    userY = newY;

    return true;
  };

  var User = {

    getX: function(){
      return userX;
    },

    getY: function(){
        return userY;
    },

    initialize: function(options){
      userX = options.x? options.x: 1;
      userY = options.y? options.y: 1;
    },

    left: function(){
      return move(-1, 0);
    },

    right: function(){
      return move(1, 0);
    },

    up: function(){
      return move(0, -1);
    },

    down: function(){
      return move(0, 1);
    }
  };

  return User;

})
