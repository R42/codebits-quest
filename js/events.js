define(['EventEmitter'], function(EventEmitter) {
  var statsEvents = new EventEmitter();

  return {
    stats: statsEvents
  };
});