define([
    'jquery',
    'map',
    'userStats',
    'gameInformation',
    'user',
    'clock',
    'configs'
  ], function($, Map, UserStats, GameInformation, User, Clock, Configs){
  var mapElem;

  var statsElem;

  var tickCount = 0;

  var gameMode;

  var currentPopup;

  var bufferedInput = [];

  var userTraveled = false;

  // Manages user input
  function initializeInput(){
    $(document).keydown(function(event){
      bufferedInput = event.which;
    });
  }

  function userAction(){
    var userLocation = Map.getUserLocation();

    if(typeof userLocation === 'object'){

      if(userLocation.popup){

        gameMode = Configs.GAME_MODE_POPUP;
        currentPopup = userLocation.popup;
        userLocation.popup.doAction(function(){
          gameMode = Configs.GAME_MODE_PLAYING;
        });
      } else if(typeof userLocation.getType === 'function' &&
        userLocation.getType() === 'event'){

          Clock.setTime(userLocation.getActiveEvent().endDate);

      } else if(typeof userLocation.doAction === 'function'){

        userLocation.doAction();
      }
    }
  }

  function analyseWorld(){
    var userLocation = Map.getUserLocation();

    if(userTraveled){
      if(typeof userLocation         === 'object' &&
         typeof userLocation.getType === 'function' &&
         userLocation.getType()      === 'portal'){
           // navigate
           Map.travelTo(userLocation.linkId, userLocation.destination);
      }
    }
  }

  function updateUserStats(){
    UserStats.increaseStat('hunger', 0.01);
    UserStats.increaseStat('thirst', 0.01);
    UserStats.decreaseStat('stamina', 0.01);
  }

  function updateWorldClock(){
    if(gameMode === Configs.GAME_MODE_PLAYING){
      Clock.addTime(Configs.SECONDS_PER_FRAME);
    }
  }

  function drawWorld(){
    Map.draw();
    UserStats.draw();
    if(gameMode === Configs.GAME_MODE_PLAYING){
      GameInformation.draw();
    }
  }

  function frame(){
    var input;

    if(gameMode == Configs.GAME_MODE_PLAYING){
      // process inputs
      if(bufferedInput){
        switch(bufferedInput){
          case 37:
            User.left();
            break;
          case 38:
            User.up();
            break;
          case 39:
            User.right();
            break;
          case 40:
            User.down();
            break;
          case 13:
            userAction();
          default:
            console.log(bufferedInput);
            break;
        }

        bufferedInput = null;
      }

      analyseWorld();
      updateWorldClock();
      updateUserStats();

    } else if(gameMode == Configs.GAME_MODE_POPUP){

      if(bufferedInput){
        switch(bufferedInput){
          case 37:
            currentPopup.keyPressed('left');
            break;
          case 38:
            currentPopup.keyPressed('up');
            break;
          case 39:
            currentPopup.keyPressed('right');
            break;
          case 40:
            currentPopup.keyPressed('down');
            break;
          case 13:
            currentPopup.keyPressed('action');
          default:
            console.log(bufferedInput);
            break;
        }

        bufferedInput = null;
      }
    }

    drawWorld();

    requestAnimationFrame(frame);
  }

  var Engine = {

    initialize: function(){

      gameMode = Configs.GAME_MODE_PLAYING;

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
