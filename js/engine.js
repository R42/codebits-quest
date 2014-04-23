define(['jquery', 'map', 'userStats', 'gameInformation', 'user', 'clock', 'popup'], function($, Map, UserStats, GameInformation, User, Clock, Popup){
  var mapElem;

  var statsElem;

  var mapBounds;

  var tickCount = 0;

  var SECONDS_PER_TICK = 10; // seconds

  var GAME_MODE_PLAYING = 0;

  var GAME_MODE_POPUP = 1;

  var gameMode;

  var currentPopup;

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
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('left');
    } else if(gameMode == GAME_MODE_POPUP){
      if(moveUser(-1, 0)){
        tick(true);
      }
    }
  }

  function moveUserUp(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('up');
    } else if(gameMode == GAME_MODE_POPUP){
      if(moveUser(0, -1)){
        tick(true);
      }
    }
  }

  function moveUserRight(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('right');
    } else if(gameMode == GAME_MODE_POPUP){
      if(moveUser(1, 0)){
        tick(true);
      }
    }
  }

  function moveUserDown(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('down');
    } else if(gameMode == GAME_MODE_POPUP){
      if(moveUser(0, 1)){
        tick(true);
      }
    }
  }

  function userAction(){

    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('action');
    }

    else if(typeof userLocation === 'object'
      && userLocation.hasPopup){
        gameMode = GAME_MODE_POPUP;
        currentPopup = userLocation;
        userLocation.popup.doAction(function(){
          gameMode = GAME_MODE_PLAYING;
        });
      }

    else if(typeof userLocation === 'object'
      && typeof userLocation.getType === 'function'){

        if(userLocation.getType() === 'event'){
          Clock.setTime(userLocation.getActiveEvent().endDate);
        }
      }

    else if(typeof userLocation === 'object'
      && typeof userLocation.doAction === 'function'){

        userLocation.doAction();
      }

    tick(false);
  }

  function updateUserStats(){
    UserStats.increaseStat('hunger', 1);
    UserStats.increaseStat('thirst', 1);
    UserStats.decreaseStat('stamina', 1);
  }

  function updateWorldClock(){
    if(gameMode === GAME_MODE_PLAYING){
      Clock.addTime(SECONDS_PER_TICK);
    }
  }

  function updateWorld(updateStats){
    if(updateStats){
      updateUserStats();
    }

    Map.draw();
    UserStats.draw();
    if(gameMode === GAME_MODE_PLAYING){
      GameInformation.draw();
    } else if(gameMode === GAME_MODE_POPUP){
      Popup.draw();
    }
  }

  function tick(updateStats){

    tickCount += 1;

    updateWorldClock();

    updateWorld(updateStats);
  }

  var Engine = {

    initialize: function(){

      gameMode = GAME_MODE_PLAYING;

      Popup.initialize();

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
      $('#container').append(Popup.getContainer());

      initializeInput();

      tick();
    },

    draw: tick
  };

  return Engine;
});
