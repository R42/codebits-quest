define(['jquery'], function($){

  var time = new Date(2014, 4 - 1, 10, 10, 0, 0);

  var baseDate = new Date(2014, 4 - 1, 10, 10, 0, 0);

  var Clock = {

    getTime: function() {
      return time;
    },

    setTime: function(newTime){
      time = newTime;
    },

    addTime: function(seconds){

      time.setSeconds(time.getSeconds() + seconds);
    },

    getBaseDate: function(){

      return baseDate;
    }
  }

  return Clock;
})
