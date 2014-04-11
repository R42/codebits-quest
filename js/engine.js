define(['jquery', 'map', 'userStats', 'gameInformation', 'user', 'clock'], function($, Map, UserStats, GameInformation, User, Clock){
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

  function moveUserLeft(){
    if(User.x == 0)
      return;

    User.x -= 1;

    tick(true);
  }

  function moveUserUp(){
    if(User.y == 0)
      return;

    User.y -= 1;

    tick(true);
  }

  function moveUserRight(){
    if(User.x == mapBounds.width - 1)
      return;

    User.x += 1;

    tick(true);
  }

  function moveUserDown(){
    if(User.y == mapBounds.height - 1)
      return;

    User.y += 1;

    tick(true);
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
    UserStats.increaseStat('hunger', 1);
    UserStats.increaseStat('thirst', 1);
    UserStats.decreaseStat('stamina', 1);
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
      User.x = 0;
      User.y = 0;

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

      tick();
    },

    draw: tick
  };

  return Engine;
});
