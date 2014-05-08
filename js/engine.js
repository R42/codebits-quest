define(['jquery', 'map', 'userStats', 'gameInformation', 'user', 'clock'], function($, Map, UserStats, GameInformation, User, Clock){
  var mapElem;

  var statsElem;

  var mapBounds;

  var tickCount = 0;

  var SECONDS_PER_TICK = 10; // seconds

  var GAME_MODE_PLAYING = 0;

  var GAME_MODE_POPUP = 1;

  var gameMode;

  var currentPopup;

  // Manages user input
  // up, down, left, right, action, cancel
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
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('left');
    } else if(gameMode == GAME_MODE_PLAYING){
      if(User.left()){
        tick(true);
      }
    }
  }

  function moveUserUp(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('up');
    } else if(gameMode == GAME_MODE_PLAYING){
      if(User.up()){
        tick(true);
      }
    }
  }

  function moveUserRight(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('right');
    } else if(gameMode == GAME_MODE_PLAYING){
      if(User.right()){
        tick(true);
      }
    }
  }

  function moveUserDown(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('down');
    } else if(gameMode == GAME_MODE_PLAYING){
      if(User.down()){
        tick(true);
      }
    }
  }

  function userAction(){
    var updateClock = true;
    var userLocation = Map.getUserLocation();

    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('action');
    }
    else if(typeof userLocation === 'object' &&
      userLocation.popup){
        gameMode = GAME_MODE_POPUP;
        currentPopup = userLocation.popup;
        userLocation.popup.doAction(function(){
          gameMode = GAME_MODE_PLAYING;
          tick(false, false);
        });
        tick(false, true);
      }
    else if(typeof userLocation === 'object'){

      if(typeof userLocation.getType === 'function' &&
        userLocation.getType() === 'event'){
          Clock.setTime(userLocation.getActiveEvent().endDate);
          tick(false, true);
      }
      else if(typeof userLocation.doAction === 'function'){
        userLocation.doAction();
        tick(false, true);
      }
    }
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
    }
  }

  function tick(updateStats, updateClock){

    tickCount += 1;

    if(updateClock){
      updateWorldClock();
    }
    updateWorld(updateStats);
  }

  var Engine = {

    initialize: function(){

      gameMode = GAME_MODE_PLAYING;

      User.initialize({x: 1, y: 1});

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
