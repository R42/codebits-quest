define(['userStats'], function(UserStats) {
  var WIDTH = 50;
  var GenericPopup = function(message, choices) {
    this.message = message;
    this.choices = choices;
    this.container = $('#popup-container');
    this.closeCallback = null;
  };

  /**
   * Private drawing functions
   */
  function drawPopupLine(container, left, right, fill, message){
    var remainingChars = WIDTH;
    var line = left + fill + message;
    var padding = left.length + right.length + 2;

    for(var i = line.length; i <= WIDTH - padding; ++i) {
      line += fill;
    }

    line += right;

    container.append($('<span>').html(line.replace(/ /g, '&nbsp'))).append('<br>');
  }

  function drawPopupHeader(container){
    drawPopupLine(container, ' ', ' ', '-', '');
    drawPopupLine(container, '/', '\\', '_', '');
    drawPopupLine(container, '|', '|', ' ', '');
  }

  function drawPopupBottom(container){
    drawPopupLine(container, '|', '|', ' ', '');
    drawPopupLine(container, '|', '|', '_', '');
  }

  GenericPopup.prototype = {

    doAction: function(closeCallback) {
      this.closeCallback = closeCallback;
      this.container.empty();
      drawPopupHeader(this.container, this.message);
      drawPopupLine(this.container, '|', '|', ' ', this.message);
      drawPopupBottom(this.container);
    },

    keyPressed: function(key) {
      this.container.empty();
      this.closeCallback();
    }
  };

  return GenericPopup;
});