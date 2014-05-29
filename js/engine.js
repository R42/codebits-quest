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

  var gameState;

  var currentPopup;

  var bufferedInput;

  // Manages user input
  function initializeInput(){
    $(document).keydown(function(event){
      switch(event.which){
        case 37:
          bufferedInput = 'left';
          break;
        case 38:
          bufferedInput = 'up';
          break;
        case 39:
          bufferedInput = 'right';
          break;
        case 40:
          bufferedInput = 'down';
          break;
        case 13:
          bufferedInput = 'action';
          break;
      }
    });
  }

  function userAction(){
    var userLocation = Map.getUserLocation();

    if(typeof userLocation === 'object'){
      if(userLocation.popup){
        gameState = Configs.GAME_MODE_POPUP;
        currentPopup = userLocation.popup;
        userLocation.popup.doAction(function(){
          gameState = Configs.GAME_MODE_PLAYING;
        });
      }
      else if(typeof userLocation.getType === 'function' &&
        userLocation.getType() === 'event'){
          Clock.setTime(userLocation.getActiveEvent().endDate);
      }
      else if(typeof userLocation.doAction === 'function'){
        userLocation.doAction();
      }
    }
  }

  function analyseWorld(){
    var userLocation = Map.getUserLocation();

    if(User.moved()){
      if(typeof userLocation         === 'object' &&
         typeof userLocation.getType === 'function' &&
         userLocation.getType()      === 'portal'){
           // navigate
           Map.travelTo(userLocation.destination, userLocation.linkId);
      }
    }
  }

  function updateUserStats(){
    UserStats.increaseStat('hunger', 0.01);
    UserStats.increaseStat('thirst', 0.01);
    UserStats.decreaseStat('stamina', 0.01);
  }

  function updateWorldClock(){
    if(gameState === Configs.GAME_MODE_PLAYING){
      Clock.addTime(Configs.SECONDS_PER_FRAME);
    }
  }

  function drawWorld(){
    Map.draw();
    UserStats.draw();
    if(gameState === Configs.GAME_MODE_PLAYING){
      GameInformation.draw();
    }
  }

  function frame(){
    var key;

    if(gameState == Configs.GAME_MODE_PLAYING){
      // process inputs
      if(bufferedInput){
        if(bufferedInput === 'action'){
          userAction();
        } else {
          User.keyPressed(bufferedInput);
        }
        bufferedInput = null;
      }

      analyseWorld();
      updateWorldClock();
      updateUserStats();

    } else if(gameState == Configs.GAME_MODE_POPUP){
      if(bufferedInput){
        currentPopup.keyPressed(bufferedInput);
        bufferedInput = null;
      }
    }

    drawWorld();

    //resets
    User.setMoved(false);

    requestAnimationFrame(frame);
  }

  var Engine = {

    initialize: function(){

      gameState = Configs.GAME_MODE_PLAYING;

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
