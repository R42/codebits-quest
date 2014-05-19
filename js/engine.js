define(['jquery', 'map', 'userStats', 'gameInformation', 'user', 'clock', 'configs'], function($, Map, UserStats, GameInformation, User, Clock, Configs){
  var mapElem;

  var statsElem;

  var mapBounds;

  var tickCount = 0;

  var SECONDS_PER_FRAME = 1; // seconds

  var GAME_MODE_PLAYING = 0;

  var GAME_MODE_POPUP = 1;

  var gameMode;

  var currentPopup;

  var bufferedInput = [];

  // Manages user input
  function initializeInput(){
    $(document).keydown(function(event){
      bufferedInput.push(event.which);
    });
  }

  function moveUserLeft(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('left');
    } else if(gameMode == GAME_MODE_PLAYING){
      User.left();
    }
  }

  function moveUserUp(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('up');
    } else if(gameMode == GAME_MODE_PLAYING){
      User.up();
    }
  }

  function moveUserRight(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('right');
    } else if(gameMode == GAME_MODE_PLAYING){
      User.right();
    }
  }

  function moveUserDown(){
    if(gameMode == GAME_MODE_POPUP){
      currentPopup.keyPressed('down');
    } else if(gameMode == GAME_MODE_PLAYING){
      User.down();
    }
  }

  function userAction(){
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
        });
      }
    else if(typeof userLocation === 'object'){

      if(typeof userLocation.getType === 'function' &&
        userLocation.getType() === 'event'){
          Clock.setTime(userLocation.getActiveEvent().endDate);
      }
      else if(typeof userLocation.doAction === 'function'){
        userLocation.doAction();
      }
    }
  }

  function updateUserStats(){
    UserStats.increaseStat('hunger', 0.01);
    UserStats.increaseStat('thirst', 0.01);
    UserStats.decreaseStat('stamina', 0.01);
  }

  function updateWorldClock(){
    if(gameMode === GAME_MODE_PLAYING){
      Clock.addTime(SECONDS_PER_FRAME);
    }
  }

  function drawWorld(){
    Map.draw();
    UserStats.draw();
    if(gameMode === GAME_MODE_PLAYING){
      GameInformation.draw();
    }
  }

  function frame(){
    var input;
    // process inputs
    while(input = bufferedInput.pop()){
      if(input){
        switch(input){
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
            console.log(bufferedInput);
            break;
        }
      }
    }

    if(gameMode == GAME_MODE_PLAYING){
      updateWorldClock();
      updateUserStats();
    }

    drawWorld();

    requestAnimationFrame(frame);
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
    },

    start: function(){
      requestAnimationFrame(frame);
    }
  };

  return Engine;
});
