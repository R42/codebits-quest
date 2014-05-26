define(['map'], function(Map){

  var userMoved;

  var userX;

  var userY;

  function move(x, y){
    //
    var newX = userX + x;
    var newY = userY + y;

    var location = Map.getLocation(newX, newY);

    if(location == '#' || location == 'o'){
      userMoved = false;
      return false;
    }

    userX = newX;
    userY = newY;
    userMoved = true;

    return true;
  };

  var User = {

    moved: function(){
      return userMoved;
    },

    setMoved: function(value){
      userMoved = value;
    },
    
    getX: function(){
      return userX;
    },

    getY: function(){
        return userY;
    },

    initialize: function(options){
      userX = options.x? options.x: 1;
      userY = options.y? options.y: 1;
      userMoved = false;
    },

    keyPressed: function(key){
      switch(key){
        case 'left':
          return move(-1, 0);
          break;
        case 'right':
          return move(1, 0);
          break;
        case 'up':
          return move(0, -1);
          break;
        case 'down':
          return move(0, 1);
          break;
      }
    }
  };

  return User;

})
