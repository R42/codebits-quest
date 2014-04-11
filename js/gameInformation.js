define(['map', 'clock'], function(Map, Clock){

  var container = $('<div>');

  var WIDTH = 100;

  function drawHeader() {
    var remainingChars = WIDTH;
    var line = '*';
    remainingChars--;
    for(var i = 1; i < remainingChars - 2; ++i) {
      line += '-';
    }
    line += '*';
    container.append($('<span>').text(line)).append('<br>');
  }

  function drawMessage(message) {
    var line = '| ' + message;
    for(var i = line.length; i <= WIDTH - 4; ++i) {
      line += '&nbsp';
    }
    line += '|';
    container.append($('<span>').html(line)).append('<br>');
  }

  function drawClock(){
    var line = '| ' + Clock.getTime().toDateString() + ' ' + Clock.getTime().toTimeString();
    for(var i = line.length; i <= WIDTH - 4; ++i) {
      line += '&nbsp';
    }
    line += '|';
    container.append($('<span>').html(line)).append('<br>');
  }

  var GameInformation = {

    initialize: function(){

    },

    draw: function(){
      container.empty();
      drawHeader();
      drawClock();
      var userLocation = Map.getUserLocation();

      if(typeof userLocation === 'object'
          && typeof userLocation.getDescription === 'function'){
            drawMessage(userLocation.getDescription());
          }
      drawHeader();
    },

    getContainer: function(){
      return container;
    }
  }

  return GameInformation;
})
