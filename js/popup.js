define(['jquery'], function($){

  var container = $('<div>').prop('id', 'popup');
  var stats = {};
  var WIDTH = 50;

  var currentPopup;

  /*
   _____________________________
  /_____________________________\
  |                             |
  |                             |
  |                             |
  |                             |
  |                             |
  |                             |
  |_____________________________|

 ----------------------------------
/______________________________________________\
|                                              |
| Message                                      |
|                                              |
|______________________________________________|

  */

  function setPopup(title, message, choices){

    currentPopup.title = title;
    currentPopup.message = message;
    currentPopup.choices = choices;

    // two kinds of popup.
    if(choices){
      //  choice
    } else {
      //  information
    }

  }

  function drawPopupLine(left, right, fill, message){

    var remainingChars = WIDTH;

    var line = left + fill + message;

    var padding = left.length + right.length + 2;

    for(var i = line.length; i <= WIDTH - padding; ++i) {
      line += fill;
    }

    line += right;
    console.log(line + ' length(' + line.length + ')');

    container.append($('<span>').html(line.replace(/ /g, '&nbsp'))).append('<br>');
  }

  function drawPopupHeader(title){

    drawPopupLine(' ', ' ', '-', '');
    drawPopupLine('/', '\\', '_', '');
    drawPopupLine('|', '|', ' ', '');

  }

  function drawPopupBottom(){

    drawPopupLine('|', '|', ' ', '');
    drawPopupLine('|', '|', '_', '');

  }

  var Popup = {

    initialize: function(){
      currentPopup = {};
    },

    set: setPopup,

    getContainer: function(){
      return container;
    },

    draw: function(){
      container.empty();
      drawPopupHeader(currentPopup.title);
      drawPopupLine('|', '|', ' ', currentPopup.message);
      drawPopupBottom();
    }
  }

  return Popup;
})
