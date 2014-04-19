define(
  [
    'jquery',
    'events',
    'map',
    'userStats',
    'gameInformation',
    'user',
    'clock'
  ],
  function($, EVENTS, Map, UserStats, GameInformation, User, Clock) {
    var mapElem;

    var statsElem;

    var mapBounds;

    var tickCount = 0;

    var SECONDS_PER_TICK = 10; // seconds

    function initializeInput(){
      $(document).keydown(function(event){
        switch(event.which){
          case 37:
            moveUserLeft();
            break;
          case 38:
            moveUserUp();
            break;
          case 39:
            moveUserRight();
            break;
          case 40:
            moveUserDown();
            break;
          case 13:
            userAction();
          default:
            console.log(event.which);
            break;
          }
        });
    }

    function moveUser(x, y){
      // checks map bounds
      if(User.x == 0 || User.x == mapBounds.width - 1
        || User.y == 0 || User.y == mapBounds.height - 1){
          return false;
        }

      //
      var newX = User.x + x;
      var newY = User.y + y;

      var location = Map.getLocation(newX, newY);

      if(location == '#' || location == 'o'){
        return false;
      }

      User.x = newX;
      User.y = newY;

      return true;
    }

    function moveUserLeft(){
      if(moveUser(-1, 0)){
        tick(true);
      }
    }

    function moveUserUp(){
      if(moveUser(0, -1)){
        tick(true);
      }
    }

    function moveUserRight(){
      if(moveUser(1, 0)){
        tick(true);
      }
    }

    function moveUserDown(){
      if(moveUser(0, 1)){
        tick(true);
      }
    }

    function userAction(){
      var userLocation = Map.getUserLocation();

      if(typeof userLocation === 'object'
        && typeof userLocation.doAction === 'function'){

          userLocation.doAction();
        }

      if(typeof userLocation === 'object'
        && typeof userLocation.getType === 'function'){

          if(userLocation.getType() === 'event'){
            Clock.setTime(userLocation.getActiveEvent().endDate);
          }
        }

      tick(false);
    }

    function updateUserStats(){
      UserStats.changeStat('hunger', 1);
      UserStats.changeStat('thirst', 1);
      UserStats.changeStat('stamina', -1);
    }

    function updateWorldClock(){

      Clock.addTime(SECONDS_PER_TICK);
    }

    function updateWorld(updateStats){
      if(updateStats){
        updateUserStats();
      }

      Map.draw();
      UserStats.draw();
      GameInformation.draw();
    }

    function tick(updateStats){

      tickCount += 1;

      updateWorldClock();

      updateWorld(updateStats);
    }

    var Engine = {

      initialize: function(){
        User.x = 1;
        User.y = 1;

        UserStats.initialize({
          money: 1000,
          stamina: 100,
          hunger: 0,
          thirst: 0,
          blader: 0,
          hardware: 0,
          mobile: 0,
          web: 0
        });

        Map.initialize(User);

        GameInformation.initialize();

        mapBounds = Map.getBounds();

        $('#container').append(Map.getContainer());
        $('#container').append(UserStats.getContainer());
        $('#container').append(GameInformation.getContainer());

        initializeInput();

        EVENTS.stats.on('minreached', function(stat) {
          if(stat === 'stamina') {
            alert('Game Over');
          }
        });

        tick();
      },

      draw: tick
    };

    return Engine;
  }
);
